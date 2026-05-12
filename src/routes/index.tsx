import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { FeaturedFleet } from "#/components/cars/FeaturedFleet";
import { Hero } from "#/components/Hero";
import { TrustedPartners } from "#/components/shared/TrustedPartners";
import { WhyChooseUs } from "#/components/shared/WhyChooseUs";
import { VideoSection } from "#/components/VideoSection";

export const Route = createFileRoute("/")({ component: Home });

function Home(): React.JSX.Element {
	return (
		<div>
			<Hero />
			<FeaturedFleet />
			<WhyChooseUs />
			<VideoSection />
			<TrustedPartners />
		</div>
	);
}
