import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import type React from "react";
import { FEATURED_FLEET } from "#/components/cars/FeaturedFleet";
import { FleetCard } from "#/components/cars/FleetCard";
import { FleetHero } from "#/components/cars/FleetHero";
import { Button } from "#/components/ui/button";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/fleet")({
	head: () => ({
		meta: buildPageMeta({
			title: "Fleet — Vehicles & Equipment for Hire",
			description:
				"Browse CA HUB AUTO's full rental fleet in Mozambique. SUVs, single and double cab pickups, wheel loaders, excavators, and heavy mining trucks — available for daily or project-based hire.",
			path: "/fleet",
			ogImage: "/car_types/toyota_landcruiser.webp",
		}),
	}),
	component: FleetPage,
});

const CATEGORIES = ["Vehicles", "Heavy Equipment", "Mining", "Construction"];
const SECTORS = ["Mining", "Construction", "Infrastructure", "Rural"];

function FleetPage(): React.JSX.Element {
	return (
		<>
			<FleetHero />
			<div className="bg-[#f6f6f6] py-14 md:py-20">
				<div className="page-wrap">
					<div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
						<aside className="motion-scroll-reveal self-start rounded-2xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.05)] lg:sticky lg:top-24">
							<div className="mb-7">
								<h2 className="mb-4 text-xl font-bold text-foreground">
									Search
								</h2>
								<label className="relative block">
									<span className="sr-only">Search fleet</span>
									<input
										type="search"
										placeholder="Search..."
										className="h-12 w-full rounded-lg border border-border/70 bg-white px-4 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
									/>
									<Search
										className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
										aria-hidden="true"
									/>
								</label>
							</div>

							<FilterGroup title="Select Fleet">
								{CATEGORIES.map((category) => (
									<button
										key={category}
										type="button"
										className="flex h-11 w-full items-center justify-between rounded-lg bg-[#f3f3f3] px-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent"
									>
										{category}
										<SlidersHorizontal
											className="size-4 text-muted-foreground"
											aria-hidden="true"
										/>
									</button>
								))}
							</FilterGroup>

							<FilterGroup title="Filter by Sector">
								{SECTORS.map((sector) => (
									<label
										key={sector}
										className="flex items-center gap-2 text-sm text-muted-foreground"
									>
										<input
											type="checkbox"
											className="size-4 accent-foreground"
										/>
										{sector}
									</label>
								))}
							</FilterGroup>

							<Button className="mt-1 h-11 w-full rounded-lg font-semibold">
								Apply Filters
							</Button>
						</aside>

						<section
							className="motion-scroll-reveal"
							aria-label="Fleet results"
						>
							<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
								<p className="text-sm font-medium text-muted-foreground">
									Showing {FEATURED_FLEET.length} fleet options
								</p>
								<select
									aria-label="Sort fleet"
									className="h-10 rounded-lg border border-border/70 bg-white px-3 text-sm text-foreground outline-none focus:border-primary"
								>
									<option>Recommended</option>
									<option>Vehicles first</option>
									<option>Heavy equipment first</option>
								</select>
							</div>

							<div className="motion-scroll-reveal motion-stagger grid grid-cols-1 gap-6 md:grid-cols-2">
								{FEATURED_FLEET.map((car) => (
									<FleetCard key={car.id} car={car} />
								))}
							</div>
						</section>
					</div>
				</div>
			</div>
		</>
	);
}

function FilterGroup({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}): React.JSX.Element {
	return (
		<div className="border-t border-border/70 py-7 first:border-t-0 first:pt-0">
			<h2 className="mb-4 text-xl font-bold text-foreground">{title}</h2>
			<div className="flex flex-col gap-3">{children}</div>
		</div>
	);
}
