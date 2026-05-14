import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
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

const CATEGORIES = ["Vehicles", "Heavy Equipment", "Trucks"];
const SECTORS = [
	"Mining",
	"Construction",
	"Infrastructure",
	"Rural",
	"Heavy Industry",
];

function FleetPage(): React.JSX.Element {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSectors, setSelectedSectors] = useState<Set<string>>(
		new Set(),
	);
	const [sortBy, setSortBy] = useState("recommended");

	const filteredFleet = useMemo(() => {
		let result = FEATURED_FLEET;

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
				(item) =>
					item.name.toLowerCase().includes(q) ||
					item.description.toLowerCase().includes(q),
			);
		}

		if (selectedCategory) {
			result = result.filter((item) => item.category === selectedCategory);
		}

		if (selectedSectors.size > 0) {
			result = result.filter((item) =>
				item.sectors.some((s) => selectedSectors.has(s)),
			);
		}

		if (sortBy === "vehicles-first") {
			result = [...result].sort((a, b) => {
				if (a.category === "Vehicles" && b.category !== "Vehicles") return -1;
				if (a.category !== "Vehicles" && b.category === "Vehicles") return 1;
				return 0;
			});
		} else if (sortBy === "heavy-first") {
			result = [...result].sort((a, b) => {
				if (
					a.category === "Heavy Equipment" &&
					b.category !== "Heavy Equipment"
				)
					return -1;
				if (
					a.category !== "Heavy Equipment" &&
					b.category === "Heavy Equipment"
				)
					return 1;
				return 0;
			});
		}

		return result;
	}, [searchQuery, selectedCategory, selectedSectors, sortBy]);

	function toggleSector(sector: string): void {
		setSelectedSectors((prev) => {
			const next = new Set(prev);
			if (next.has(sector)) {
				next.delete(sector);
			} else {
				next.add(sector);
			}
			return next;
		});
	}

	function clearFilters(): void {
		setSearchQuery("");
		setSelectedCategory(null);
		setSelectedSectors(new Set());
		setSortBy("recommended");
	}

	const hasActiveFilters =
		searchQuery !== "" || selectedCategory !== null || selectedSectors.size > 0;

	return (
		<>
			<FleetHero />
			<div className="bg-[#f6f6f6] py-14 md:py-20">
				<div className="page-wrap">
					<div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
						<aside className="self-start rounded-2xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.05)] lg:sticky lg:top-24">
							<div className="mb-7">
								<h2 className="mb-4 text-xl font-bold text-foreground">
									Search
								</h2>
								<label className="relative block">
									<span className="sr-only">Search fleet</span>
									<input
										type="search"
										placeholder="Search..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="h-12 w-full rounded-lg border border-border/70 bg-white px-4 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
									/>
									<Search
										className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
										aria-hidden="true"
									/>
								</label>
							</div>

							<FilterGroup title="Select Fleet">
								{CATEGORIES.map((category) => {
									const isActive = selectedCategory === category;
									return (
										<button
											key={category}
											type="button"
											onClick={() =>
												setSelectedCategory(isActive ? null : category)
											}
											className={`flex h-11 w-full items-center justify-between rounded-lg px-4 text-left text-sm font-medium transition-colors ${
												isActive
													? "bg-foreground text-background"
													: "bg-[#f3f3f3] text-foreground hover:bg-accent"
											}`}
										>
											{category}
											{isActive ? (
												<X className="size-4" aria-hidden="true" />
											) : (
												<SlidersHorizontal
													className="size-4 text-muted-foreground"
													aria-hidden="true"
												/>
											)}
										</button>
									);
								})}
							</FilterGroup>

							<FilterGroup title="Filter by Sector">
								{SECTORS.map((sector) => (
									<label
										key={sector}
										className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
									>
										<input
											type="checkbox"
											checked={selectedSectors.has(sector)}
											onChange={() => toggleSector(sector)}
											className="size-4 accent-foreground"
										/>
										{sector}
									</label>
								))}
							</FilterGroup>

							<Button
								className="mt-1 h-11 w-full rounded-lg font-semibold"
								variant={hasActiveFilters ? "default" : "outline"}
								disabled={!hasActiveFilters}
								onClick={clearFilters}
							>
								Clear Filters
							</Button>
						</aside>

						<section aria-label="Fleet results">
							<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
								<p className="text-sm font-medium text-muted-foreground">
									Showing {filteredFleet.length}
									{filteredFleet.length !== FEATURED_FLEET.length &&
										` of ${FEATURED_FLEET.length}`}{" "}
									fleet options
								</p>
								<select
									aria-label="Sort fleet"
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="h-10 rounded-lg border border-border/70 bg-white px-3 text-sm text-foreground outline-none focus:border-primary"
								>
									<option value="recommended">Recommended</option>
									<option value="vehicles-first">Vehicles first</option>
									<option value="heavy-first">Heavy equipment first</option>
								</select>
							</div>

							{filteredFleet.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-20 text-center">
									<p className="text-lg font-semibold text-foreground">
										No results found
									</p>
									<p className="mt-2 text-sm text-muted-foreground">
										Try adjusting your filters or search query.
									</p>
									<Button
										className="mt-6"
										variant="outline"
										onClick={clearFilters}
									>
										Clear Filters
									</Button>
								</div>
							) : (
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
									{filteredFleet.map((car) => (
										<FleetCard key={car.id} car={car} />
									))}
								</div>
							)}
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
