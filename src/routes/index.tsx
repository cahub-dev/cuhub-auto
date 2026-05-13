import { createFileRoute } from "@tanstack/react-router";
import { buildPageMeta } from "#/lib/seo";
import type React from "react";
import { BookingPanel } from "#/components/booking/BookingPanel";
import { FeaturedFleet } from "#/components/cars/FeaturedFleet";
import { Hero } from "#/components/Hero";
import { TrustedPartners } from "#/components/shared/TrustedPartners";
import { ServiceAreaMap } from "#/components/shared/ServiceAreaMap";
import { WhyChooseUs } from "#/components/shared/WhyChooseUs";
import { VideoSection } from "#/components/VideoSection";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: buildPageMeta({
			title: "Vehicle & Equipment Rental in Mozambique",
			description:
				"Rent vehicles and heavy equipment in Mozambique. Toyota Land Cruiser, Nissan Navara pickups, Develon loaders, excavators, and Scania mining trucks — daily and project rates from Maputo.",
		}),
	}),
	component: Home,
});

function Home(): React.JSX.Element {
	return (
		<div>
			<Hero />
			<div className="booking-card-wrapper">
				<div className="page-wrap">
					<BookingPanel />
				</div>
			</div>
			<FeaturedFleet />
			<WhyChooseUs />
			<ServiceAreaMap />
			<VideoSection />
			<TrustedPartners />
		</div>
	);
}
