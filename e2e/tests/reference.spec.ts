import { test } from "@playwright/test";

const REFERENCE_URL =
	"https://themes.webdevia.com/backhoe-heavy-construction-equipment-rentals-machinery-wordpress-theme/";

for (const viewport of [
	{ name: "desktop", width: 1440, height: 900 },
	{ name: "mobile", width: 390, height: 844 },
]) {
	test(`capture Backhoe reference — ${viewport.name}`, async ({ page }) => {
		test.setTimeout(120_000);
		await page.setViewportSize(viewport);
		await page.goto(REFERENCE_URL, { waitUntil: "networkidle" });
		await page.screenshot({
			path: `reference-shots/backhoe-${viewport.name}.png`,
			fullPage: true,
		});
	});
}
