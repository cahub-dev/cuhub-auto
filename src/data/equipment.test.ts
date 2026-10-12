import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
	EQUIPMENT,
	EQUIPMENT_CATEGORIES,
	getEquipmentInPriorityOrder,
} from "#/data/equipment";
import { buildSystemPrompt } from "#/lib/chatbot-data";

const PUBLIC_DIR = join(process.cwd(), "public");

describe("equipment catalogue", () => {
	it("puts Mr. Lam's priority categories first, in order", () => {
		expect(EQUIPMENT_CATEGORIES.slice(0, 4).map((c) => c.id)).toEqual([
			"crushers",
			"excavators",
			"wheel-loaders",
			"generators",
		]);
	});

	it("covers every equipment type named in the brief", () => {
		const ids = EQUIPMENT_CATEGORIES.map((c) => c.id);
		for (const required of [
			"crushers",
			"excavators",
			"wheel-loaders",
			"generators",
			"dump-trucks",
			"drilling-rigs",
			"ball-mills",
		]) {
			expect(ids).toContain(required);
			expect(EQUIPMENT.some((item) => item.categoryId === required)).toBe(true);
		}
	});

	it("orders items by category priority", () => {
		const order = getEquipmentInPriorityOrder().map((item) =>
			EQUIPMENT_CATEGORIES.findIndex((c) => c.id === item.categoryId),
		);
		expect(order).toEqual([...order].sort((a, b) => a - b));
	});

	it("has unique ids, a known category, and both languages", () => {
		const ids = EQUIPMENT.map((item) => item.id);
		expect(new Set(ids).size).toBe(ids.length);
		for (const item of EQUIPMENT) {
			expect(EQUIPMENT_CATEGORIES.some((c) => c.id === item.categoryId)).toBe(
				true,
			);
			for (const text of [item.name, item.summary, item.description]) {
				expect(text.en.length).toBeGreaterThan(0);
				expect(text.pt.length).toBeGreaterThan(0);
			}
		}
	});

	it("references images that exist in public/", () => {
		for (const item of EQUIPMENT) {
			const images = [item.image, ...item.gallery];
			if (item.cutout) images.push(item.cutout);
			for (const image of images) {
				expect(existsSync(join(PUBLIC_DIR, image)), image).toBe(true);
			}
		}
	});

	it("lists every equipment page in the sitemap", () => {
		const sitemap = readFileSync(join(PUBLIC_DIR, "sitemap.xml"), "utf8");
		for (const item of EQUIPMENT) {
			expect(sitemap).toContain(`/fleet/${item.id}</loc>`);
		}
		expect(sitemap).not.toMatch(/land-cruiser|navara/i);
	});
});

describe("chatbot prompt", () => {
	it("lists the catalogue and contains no prices", () => {
		const prompt = buildSystemPrompt("en");
		for (const item of EQUIPMENT) expect(prompt).toContain(item.name.en);
		expect(prompt).not.toMatch(/\$\d|\/day|dailyRate|Land Cruiser|Navara/);
		expect(prompt).toMatch(/Never quote, estimate or invent a price/);
	});
});
