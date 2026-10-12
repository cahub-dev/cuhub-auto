import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { EquipmentCategories } from "#/components/equipment/EquipmentCategories";
import { FeaturedEquipment } from "#/components/equipment/FeaturedEquipment";
import { BenefitsBlock } from "#/components/home/BenefitsBlock";
import { HERO_IMAGE, Hero } from "#/components/home/Hero";
import { HowItWorks } from "#/components/home/HowItWorks";
import { StatsBand } from "#/components/home/StatsBand";
import { Testimonials } from "#/components/home/Testimonials";
import { Updates } from "#/components/home/Updates";
import { TrustedPartners } from "#/components/shared/TrustedPartners";
import { WhyChooseUs } from "#/components/shared/WhyChooseUs";
import { useI18n } from "#/lib/i18n";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: buildPageMeta({
			title: "Mining Machinery & Equipment Rental in Mozambique",
			description:
				"Rent mining equipment in Mozambique: jaw and cone crushers, excavators, wheel loaders, diesel generators, dump trucks, drill rigs and ball mills. Delivery to site, certified operators, quotes within 24 hours.",
			path: "/",
		}),
		links: [{ rel: "preload", as: "image", href: HERO_IMAGE }],
	}),
	component: Home,
});

// Section order follows the Backhoe reference layout.
function Home(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<div>
			<Hero />
			<EquipmentCategories />
			<BenefitsBlock
				copy={t.home.benefitsA}
				image="/equipment/wheel-loaders/develon-sd300-2.webp"
			/>
			<div className="mt-12 md:mt-16">
				<TrustedPartners />
			</div>
			<WhyChooseUs />
			<BenefitsBlock
				copy={t.home.benefitsB}
				image="/equipment/dump-trucks/scania-tipper-1.webp"
				reverse
			/>
			<FeaturedEquipment />
			<HowItWorks />
			<StatsBand />
			<Testimonials />
			<Updates />
		</div>
	);
}
