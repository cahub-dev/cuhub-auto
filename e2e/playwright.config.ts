import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
	testDir: "./tests",
	outputDir: "./test-results",
	fullyParallel: true,
	retries: 0,
	reporter: [["list"]],
	use: {
		baseURL: BASE_URL,
		// Uses the locally installed Google Chrome — no Playwright browser download.
		channel: "chrome",
		trace: "retain-on-failure",
	},
	projects: [
		{
			name: "desktop",
			testIgnore: /reference\.spec\.ts/,
			use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } },
		},
		{
			name: "mobile",
			testIgnore: /reference\.spec\.ts/,
			use: { ...devices["Pixel 7"], channel: "chrome", viewport: { width: 390, height: 844 } },
		},
		{
			// Layout reference only (`pnpm capture:ref`). Screenshots are not committed.
			name: "reference",
			testMatch: /reference\.spec\.ts/,
			use: { channel: "chrome" },
		},
	],
	webServer: process.env.BASE_URL
		? undefined
		: {
				command: "pnpm --dir .. dev",
				url: BASE_URL,
				reuseExistingServer: true,
				timeout: 120_000,
			},
});
