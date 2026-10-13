#!/usr/bin/env python3
"""Generate social share (Open Graph) images for WhatsApp, Facebook, LinkedIn.

Writes 1200x630 JPEGs under 300 KB (WhatsApp skips larger preview images):
  public/og/home.jpg         default for Home, About, Contact, Quote
  public/og/fleet.jpg        /fleet
  public/og/<equipment>.jpg  one per item in src/data/equipment.ts

Run from the repo root after changing equipment or photos:
  python3 scripts/generate-share-images.py

Needs Pillow and the Montserrat + Open Sans fonts (Fedora:
julietaula-montserrat-fonts, open-sans-fonts). Override with
OG_FONT_TITLE / OG_FONT_BODY if they live elsewhere.
"""

import io
import os
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = PUBLIC / "og"
W, H = 1200, 630
ORANGE = (231, 97, 38)
MAX_BYTES = 300_000
SITE = "www.cahubauto.com"

FONT_TITLE_CANDIDATES = [
    os.environ.get("OG_FONT_TITLE", ""),
    "/usr/share/fonts/julietaula-montserrat-fonts/Montserrat-ExtraBold.otf",
    "/usr/share/fonts/truetype/montserrat/Montserrat-ExtraBold.ttf",
]
FONT_BODY_CANDIDATES = [
    os.environ.get("OG_FONT_BODY", ""),
    "/usr/share/fonts/open-sans/OpenSans-Semibold.ttf",
    "/usr/share/fonts/truetype/open-sans/OpenSans-Semibold.ttf",
]


def find_font(candidates: list[str]) -> str:
    for path in candidates:
        if path and Path(path).is_file():
            return path
    sys.exit(f"Font not found; tried: {[p for p in candidates if p]}")


TITLE_FONT = find_font(FONT_TITLE_CANDIDATES)
BODY_FONT = find_font(FONT_BODY_CANDIDATES)


def load_equipment() -> list[dict]:
    """Parse id, English name and main photo from src/data/equipment.ts."""
    source = (ROOT / "src/data/equipment.ts").read_text()
    body = source.split("export const EQUIPMENT: Equipment[] = [", 1)[1]
    items = []
    for block in re.split(r"\n\t\{\n", body)[1:]:
        item_id = re.search(r'\tid: "([^"]+)"', block)
        name = re.search(r'name: \{\s*en: "([^"]+)"', block)
        image = re.search(r'\timage: "([^"]+)"', block)
        category = re.search(r'categoryId: "([^"]+)"', block)
        if item_id and name and image and category:
            items.append({
                "id": item_id.group(1),
                "name": name.group(1),
                "image": image.group(1),
                "category": category.group(1),
            })
    if not items:
        sys.exit("No equipment parsed from src/data/equipment.ts")
    return items


def cover(path: Path) -> Image.Image:
    """Crop-to-fill the photo to 1200x630."""
    img = Image.open(path).convert("RGB")
    scale = max(W / img.width, H / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = (img.width - W) // 2
    top = (img.height - H) // 2
    return img.crop((left, top, left + W, top + H))


def darken(img: Image.Image) -> Image.Image:
    """Dark gradient from the left (behind the text) and a bottom vignette."""
    overlay = Image.new("RGBA", (W, H))
    px = overlay.load()
    for x in range(W):
        side = 0.88 - 0.6 * (x / W)
        for y in range(H):
            bottom = 0.35 * max(0.0, (y - H * 0.55) / (H * 0.45))
            alpha = min(0.92, side + bottom)
            px[x, y] = (12, 12, 12, int(alpha * 255))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def wrap(draw: ImageDraw.ImageDraw, text: str, font, max_width: int) -> list[str]:
    lines, current = [], ""
    for word in text.split():
        trial = f"{current} {word}".strip()
        if draw.textlength(trial, font=font) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def render(photo: str, kicker: str, title: str, subtitle: str, out_name: str) -> None:
    img = darken(cover(PUBLIC / photo.lstrip("/")))
    draw = ImageDraw.Draw(img)
    x = 64

    logo = Image.open(PUBLIC / "logo-light.webp").convert("RGBA")
    logo.thumbnail((250, 70))
    img.alpha_composite(logo, (x, 52))

    kicker_font = ImageFont.truetype(BODY_FONT, 22)
    draw.rectangle((x, 236, x + 44, 240), fill=ORANGE)
    draw.text((x + 58, 225), kicker.upper(), font=kicker_font, fill=ORANGE)

    size = 64
    title_font = ImageFont.truetype(TITLE_FONT, size)
    lines = wrap(draw, title.upper(), title_font, 760)
    while len(lines) > 3 and size > 44:
        size -= 4
        title_font = ImageFont.truetype(TITLE_FONT, size)
        lines = wrap(draw, title.upper(), title_font, 760)
    y = 268
    for line in lines:
        draw.text((x, y), line, font=title_font, fill="white")
        y += int(size * 1.08)

    body_font = ImageFont.truetype(BODY_FONT, 27)
    draw.text((x, y + 14), subtitle, font=body_font, fill=(235, 235, 235))

    footer_font = ImageFont.truetype(BODY_FONT, 24)
    draw.rectangle((0, H - 8, W, H), fill=ORANGE)
    draw.text((x, H - 62), SITE, font=footer_font, fill="white")

    save(img.convert("RGB"), OUT / out_name)


def save(img: Image.Image, path: Path) -> None:
    for quality in (86, 80, 74, 68, 62):
        buffer = io.BytesIO()
        img.save(buffer, "JPEG", quality=quality, optimize=True, progressive=True)
        if buffer.tell() <= MAX_BYTES:
            path.write_bytes(buffer.getvalue())
            print(f"{path.relative_to(ROOT)}  {buffer.tell() // 1024} KB  q{quality}")
            return
    sys.exit(f"{path.name} is still over {MAX_BYTES // 1000} KB")


CATEGORY_LABEL = {
    "crushers": "Crushers",
    "excavators": "Excavators",
    "wheel-loaders": "Wheel loaders",
    "generators": "Generators",
    "dump-trucks": "Dump trucks",
    "drilling-rigs": "Drilling rigs",
    "ball-mills": "Ball mills",
    "support": "Site support",
}


def main() -> None:
    OUT.mkdir(exist_ok=True)
    render(
        "/hero/mining-hero.webp",
        "Mining equipment rental · Mozambique",
        "Crushers, excavators, loaders & generators",
        "Delivered to your site · Quote within 24 hours",
        "home.jpg",
    )
    render(
        "/equipment/excavators/develon-dx220-2.webp",
        "Our equipment",
        "Mining equipment for rent",
        "Crushers · Excavators · Loaders · Generators · Drill rigs",
        "fleet.jpg",
    )
    for item in load_equipment():
        render(
            item["image"],
            f"Available for rent · {CATEGORY_LABEL.get(item['category'], 'Equipment')}",
            item["name"],
            "Request a quote · Delivery across Mozambique",
            f"{item['id']}.jpg",
        )


if __name__ == "__main__":
    main()
