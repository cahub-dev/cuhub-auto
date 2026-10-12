import { defineConfig } from "vitest/config";

// Unit tests run without the TanStack Start / Nitro plugins in vite.config.ts.
export default defineConfig({
	resolve: { tsconfigPaths: true },
	test: {
		include: ["src/**/*.test.{ts,tsx}"],
		environment: "node",
	},
});
