import { createFileRoute } from "@tanstack/react-router";
import { AboutHero } from "#/components/about/AboutHero";
import {
	AboutFeatures,
	AboutIndustries,
	AboutIntro,
	AboutSplit,
	AboutStatBox,
} from "#/components/about/AboutSections";
import { StatsBand } from "#/components/home/StatsBand";
import { TrustedPartners } from "#/components/shared/TrustedPartners";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: buildPageMeta({
			title: "About Us",
			description:
				"CA HUB AUTO is a Mozambican company specialising in mining machinery and equipment rental — crushers, excavators, loaders, generators, haul trucks and drill rigs — based in Maputo and operating nationwide.",
			path: "/about",
		}),
	}),
	component: AboutPage,
});

// Section order follows the Backhoe "About us" page.
function AboutPage() {
	return (
		<div>
			<AboutHero />
			<AboutIntro />
			<AboutFeatures />
			<AboutStatBox />
			<TrustedPartners />
			<AboutSplit />
			<AboutIndustries />
			<StatsBand image="/equipment/wheel-loaders/develon-sd300-3.webp" />
		</div>
	);
}
