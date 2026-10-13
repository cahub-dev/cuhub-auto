import { createFileRoute } from "@tanstack/react-router";
import { Phone, Search } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { EquipmentTile } from "#/components/equipment/EquipmentTile";
import { PageHero } from "#/components/equipment/PageHero";
import {
	EQUIPMENT_CATEGORIES,
	getCategory,
	getEquipmentByCategory,
	getEquipmentInPriorityOrder,
} from "#/data/equipment";
import { SALES_CONTACT } from "#/lib/contact-details";
import { useI18n } from "#/lib/i18n";
import { Reveal } from "#/lib/motion";
import { buildPageMeta } from "#/lib/seo";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/fleet")({
	validateSearch: (search: Record<string, unknown>): { category?: string } =>
		typeof search.category === "string" && getCategory(search.category)
			? { category: search.category }
			: {},
	head: () => ({
		meta: buildPageMeta({
			title: "Mining Equipment for Rent",
			description:
				"Rent mining machinery in Mozambique: jaw and cone crushers, excavators, wheel loaders, diesel generators, dump trucks, drill rigs, ball mills and water bowsers. Quotes within 24 hours.",
			path: "/fleet",
			ogImage: "/og/fleet.jpg",
		}),
	}),
	component: FleetPage,
});

const ALL_EQUIPMENT = getEquipmentInPriorityOrder();

function FleetPage(): React.JSX.Element {
	const { language, t } = useI18n();
	const { category: selectedCategory } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<"default" | "name">("default");

	const filtered = useMemo(() => {
		let result = ALL_EQUIPMENT;
		if (selectedCategory) {
			result = result.filter((item) => item.categoryId === selectedCategory);
		}
		const q = searchQuery.trim().toLowerCase();
		if (q) {
			// Match both languages so a PT visitor can type "excavator" and vice versa.
			result = result.filter((item) =>
				[item.name.en, item.name.pt, item.summary.en, item.summary.pt]
					.join(" ")
					.toLowerCase()
					.includes(q),
			);
		}
		if (sortBy === "name") {
			result = [...result].sort((a, b) =>
				a.name[language].localeCompare(b.name[language]),
			);
		}
		return result;
	}, [searchQuery, selectedCategory, sortBy, language]);

	function selectCategory(category?: string): void {
		navigate({ search: category ? { category } : {}, replace: true });
	}

	return (
		<>
			<PageHero title={t.fleetPage.pageTitle} />
			<div className="page-wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[250px_minmax(0,1fr)]">
				<aside className="order-2 flex flex-col gap-10 lg:order-1">
					<label className="relative block">
						<span className="sr-only">{t.fleetPage.searchFleet}</span>
						<input
							type="search"
							placeholder={t.fleetPage.searchPlaceholder}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-11 w-full border border-[#ddd] bg-white px-4 pr-10 text-sm outline-none placeholder:text-[#999] focus:border-primary"
						/>
						<Search
							className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#777]"
							aria-hidden="true"
						/>
					</label>

					<div>
						<WidgetTitle>{t.fleetPage.categoriesTitle}</WidgetTitle>
						<ul className="space-y-2 text-sm">
							<CategoryLink
								label={t.fleetPage.allCategories}
								count={ALL_EQUIPMENT.length}
								active={!selectedCategory}
								onClick={() => selectCategory(undefined)}
							/>
							{EQUIPMENT_CATEGORIES.map((category) => (
								<CategoryLink
									key={category.id}
									label={category.name[language]}
									count={getEquipmentByCategory(category.id).length}
									active={selectedCategory === category.id}
									onClick={() => selectCategory(category.id)}
								/>
							))}
						</ul>
					</div>

					<div>
						<WidgetTitle>{t.fleetPage.helpTitle}</WidgetTitle>
						<p className="text-sm leading-6 text-[#555]">
							{t.fleetPage.helpDescription}
						</p>
						<a
							href={`tel:${SALES_CONTACT.phoneE164}`}
							className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary no-underline"
						>
							<Phone className="size-4" aria-hidden="true" />
							{SALES_CONTACT.phoneDisplay}
						</a>
					</div>
				</aside>

				<section
					aria-label={t.fleetPage.resultsLabel}
					className="order-1 lg:order-2"
				>
					<h2 className="display-title text-4xl font-extrabold tracking-tight text-[#313131] md:text-5xl">
						{selectedCategory
							? getCategory(selectedCategory)?.name[language]
							: t.fleetPage.pageTitle}
					</h2>
					<div className="mt-4 mb-8 flex flex-wrap items-center justify-between gap-4">
						<p className="text-sm text-[#555]">
							{t.fleetPage.showing} {filtered.length} {t.fleetPage.of}{" "}
							{ALL_EQUIPMENT.length} {t.fleetPage.results}
						</p>
						<select
							aria-label={t.fleetPage.sortBy}
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as "default" | "name")}
							className="h-10 border border-[#ddd] bg-white px-3 text-sm text-[#202020] outline-none focus:border-primary"
						>
							<option value="default">{t.fleetPage.sortDefault}</option>
							<option value="name">{t.fleetPage.sortName}</option>
						</select>
					</div>

					{filtered.length === 0 ? (
						<div className="border border-dashed border-[#ddd] py-20 text-center">
							<p className="text-lg font-semibold text-[#313131]">
								{t.fleetPage.noResults}
							</p>
							<p className="mt-2 text-sm text-[#777]">
								{t.fleetPage.tryAdjusting}
							</p>
							<button
								type="button"
								onClick={() => {
									setSearchQuery("");
									selectCategory(undefined);
								}}
								className="mt-6 h-10 bg-primary px-6 text-xs font-bold uppercase tracking-wide text-white"
							>
								{t.fleetPage.clearFilters}
							</button>
						</div>
					) : (
						<ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
							{filtered.map((item, index) => (
								<Reveal as="li" key={item.id} delay={(index % 3) * 90}>
									<EquipmentTile item={item} />
								</Reveal>
							))}
						</ul>
					)}
				</section>
			</div>
		</>
	);
}

function WidgetTitle({
	children,
}: {
	children: React.ReactNode;
}): React.JSX.Element {
	return (
		<h2 className="display-title mb-5 border-b border-primary pb-2.5 text-lg font-bold text-[#313131]">
			{children}
		</h2>
	);
}

function CategoryLink({
	label,
	count,
	active,
	onClick,
}: {
	label: string;
	count: number;
	active: boolean;
	onClick: () => void;
}): React.JSX.Element {
	return (
		<li>
			<button
				type="button"
				onClick={onClick}
				aria-pressed={active}
				className={cn(
					"text-left transition-colors hover:text-primary",
					active ? "font-semibold text-primary" : "text-[#202020]",
				)}
			>
				· {label} ({count})
			</button>
		</li>
	);
}
