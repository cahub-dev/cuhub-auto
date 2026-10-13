import { expect, type Page, test } from "@playwright/test";

const PRICE_OR_CAR = /\$\s?\d|\/\s?day|\/dia|MZN|USD|Land Cruiser|Navara/i;

async function setLanguage(page: Page, language: "en" | "pt"): Promise<void> {
	await page.addInitScript((lang) => {
		window.localStorage.setItem("cahub-language", lang);
	}, language);
}

// Wait for hydration so clicks reach React handlers, not the SSR markup.
async function open(page: Page, path: string): Promise<void> {
	await page.goto(path);
	await page.waitForLoadState("networkidle");
}

function field(page: Page, label: string) {
	return page
		.locator("div.grid", {
			has: page.locator(":scope > span", { hasText: new RegExp(`^${label}$`) }),
		})
		.locator("input, select, textarea")
		.first();
}

test.beforeEach(async ({ page }) => {
	await setLanguage(page, "en");
});

test("home shows mining categories in priority order", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		/rent mining equipment/i,
	);
	const cards = page.getByTestId("category-card");
	await expect(cards).toHaveCount(8);
	const names = await cards.allInnerTexts();
	const order = ["Crushers", "Excavators", "Wheel Loaders", "Generators"].map(
		(name) => names.findIndex((text) => text.includes(name)),
	);
	expect(order).toEqual([0, 1, 2, 3]);
	for (const extra of ["Dump Trucks", "Drilling Rigs", "Ball Mills"]) {
		expect(names.some((text) => text.includes(extra))).toBe(true);
	}
});

for (const path of [
	"/",
	"/fleet",
	"/fleet/mobile-jaw-crusher",
	"/fleet/diesel-generator",
	"/about",
	"/contact",
	"/booking/new",
]) {
	test(`no prices or car names on ${path}`, async ({ page }) => {
		await page.goto(path);
		await expect(page.locator("main")).toBeVisible();
		const text = await page.locator("body").innerText();
		expect(text).not.toMatch(PRICE_OR_CAR);
	});
}

test("all phone links use the single sales contact", async ({ page }) => {
	await page.goto("/");
	const hrefs = await page
		.locator('a[href^="tel:"]')
		.evaluateAll((links) => links.map((link) => link.getAttribute("href")));
	expect(hrefs.length).toBeGreaterThan(0);
	expect([...new Set(hrefs)]).toEqual(["tel:+258846634635"]);
});

test("WhatsApp quote links go to Simão's number", async ({ page }) => {
	await open(page, "/fleet/mobile-jaw-crusher");
	await page.getByRole("button", { name: "Request a quote" }).click();
	await expect(
		page.getByRole("link", { name: "Send via WhatsApp" }),
	).toHaveAttribute("href", /^https:\/\/wa\.me\/258846634635\?text=/);
});

test("hero buttons lead to the catalogue and the quote form", async ({
	page,
}) => {
	await open(page, "/");
	const hero = page.locator(".hero-section");
	await expect(hero.getByRole("combobox")).toHaveCount(0);
	await hero.getByRole("link", { name: "View equipment" }).click();
	await expect(page).toHaveURL(/\/fleet$/);
	await open(page, "/");
	await page
		.locator(".hero-section")
		.getByRole("link", { name: "Request a quote" })
		.click();
	await expect(page).toHaveURL(/\/booking\/new$/);
});

test("language switch translates the site to Portuguese", async ({ page }) => {
	await setLanguage(page, "pt");
	await page.goto("/");
	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		/alugue equipamento/i,
	);
	await expect(page.getByTestId("category-card").first()).toContainText(
		"Britadores",
	);
});

test("equipment detail page offers a quote, not a price", async ({ page }) => {
	await open(page, "/fleet/mobile-jaw-crusher");
	await expect(page.getByRole("heading", { level: 1 })).toHaveText(
		"Mobile Jaw Crusher",
	);
	await page.getByRole("tab", { name: "Specifications" }).click();
	await expect(page.getByText(/Indicative specifications/)).toBeVisible();
	await page.getByRole("button", { name: "Request a quote" }).click();
	const whatsapp = page.getByRole("link", { name: "Send via WhatsApp" });
	await expect(whatsapp).toHaveAttribute("href", /Mobile%20Jaw%20Crusher/);
	await expect(page.getByText("Related Equipment")).toBeVisible();
});

test("retired vehicle URLs show not found", async ({ page }) => {
	await page.goto("/fleet/toyota-land-cruiser");
	await expect(page.getByRole("heading", { name: "Equipment not found" })).toBeVisible();
});

test("quote request flow submits with the equipment preselected", async ({
	page,
}) => {
	let payload: Record<string, unknown> | null = null;
	await page.route("**/api/booking", async (route) => {
		payload = route.request().postDataJSON();
		await route.fulfill({ status: 200, json: { ok: true } });
	});

	await open(page, "/booking/new?equipment=mobile-jaw-crusher");
	await expect(
		page.getByRole("button", { name: /Mobile Jaw Crusher/, pressed: true }),
	).toBeVisible();
	// Retry until hydration attaches the click handler and step 2 renders.
	await expect(async () => {
		await page.getByRole("button", { name: "Continue" }).click();
		await expect(field(page, "Site location")).toBeVisible({ timeout: 1000 });
	}).toPass({ timeout: 15_000 });

	await field(page, "Site location").fill("Moatize pit 3");
	await field(page, "Start date").fill("2026-11-01");
	await field(page, "End date").fill("2027-02-01");
	await field(page, "Project / scope of work").fill("Primary crushing of coal overburden");
	await page.getByRole("button", { name: "Certified operator" }).click();
	await page.getByRole("button", { name: "Continue" }).click();

	await field(page, "Company name").fill("Test Mining Lda");
	await field(page, "Contact person").fill("Test Person");
	await field(page, "Phone").fill("+258 84 000 0000");
	await field(page, "Email").fill("test@example.com");
	await page.getByRole("button", { name: "Continue" }).click();

	await page.getByRole("button", { name: "Send via Email" }).click();
	await expect(page.getByText(/Request sent/)).toBeVisible();
	expect(payload).toMatchObject({
		fleetRequest: "Mobile Jaw Crusher",
		category: "Crushers",
		location: "Moatize pit 3",
		extras: ["Certified operator"],
	});
});

for (const width of [360, 390]) {
	test(`no element is wider than a ${width}px phone`, async ({ page }) => {
		await page.setViewportSize({ width, height: 800 });
		for (const path of [
			"/",
			"/fleet",
			"/fleet/develon-excavator",
			"/about",
			"/contact",
			"/booking/new",
		]) {
			await open(page, path);
			// body hides sideways overflow on desktop browsers but not reliably on
			// iOS Safari, so measure with that mask switched off.
			const overflow = await page.evaluate(() => {
				document.body.style.overflowX = "visible";
				return document.documentElement.scrollWidth - window.innerWidth;
			});
			expect(overflow, path).toBeLessThanOrEqual(0);
		}
	});
}

test("capture review screenshots", async ({ page }, testInfo) => {
	for (const [name, path] of [
		["home", "/"],
		["fleet", "/fleet"],
		["detail", "/fleet/mobile-jaw-crusher"],
		["quote", "/booking/new"],
		["about", "/about"],
		["contact", "/contact"],
	] as const) {
		await open(page, path);
		// Scroll through so lazy images load before the full-page capture.
		await page.evaluate(async () => {
			for (let y = 0; y < document.body.scrollHeight; y += 600) {
				window.scrollTo(0, y);
				await new Promise((resolve) => setTimeout(resolve, 60));
			}
			window.scrollTo(0, 0);
		});
		await page.waitForLoadState("networkidle");
		await page.screenshot({
			path: `screenshots/${testInfo.project.name}-${name}.png`,
			fullPage: true,
		});
	}
});
