import { createFileRoute } from "@tanstack/react-router";
import { AboutHero } from "#/components/about/AboutHero";
import { AboutIntro } from "#/components/about/AboutIntro";
import { MissionVisionValues } from "#/components/about/MissionVisionValues";
import { RentalProcess } from "#/components/about/RentalProcess";
import { ServiceAreaMap } from "#/components/shared/ServiceAreaMap";
import { TrustedPartners } from "#/components/shared/TrustedPartners";
import { WhyChooseUs } from "#/components/shared/WhyChooseUs";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: buildPageMeta({
			title: "About Us",
			description:
				"CA HUB AUTO is a Mozambique-based vehicle and heavy equipment rental company. We support mining, construction, and infrastructure teams with reliable, well-maintained fleets — based in Maputo and operating nationwide.",
			path: "/about",
		}),
	}),
	component: AboutPage,
});

function AboutPage() {
	return (
		<div>
			<AboutHero />
			<AboutIntro />
			<MissionVisionValues />
			<RentalProcess />
			<WhyChooseUs />
			<ServiceAreaMap />
			<TrustedPartners />
		</div>
	);
}
