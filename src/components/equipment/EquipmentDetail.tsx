"use client";

import { Link } from "@tanstack/react-router";
import { Check, MapPin, ZoomIn } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { EquipmentTile } from "#/components/equipment/EquipmentTile";
import { PageHero } from "#/components/equipment/PageHero";
import { QuoteRequestCard } from "#/components/equipment/QuoteRequestCard";
import {
	type Equipment,
	getCategory,
	getEquipmentByCategory,
	getEquipmentInPriorityOrder,
	localize,
} from "#/data/equipment";
import { useI18n } from "#/lib/i18n";
import { cn } from "#/lib/utils";

type Tab = "description" | "specs" | "quote";
const RELATED_COUNT = 4;

export function EquipmentDetail({
	item,
}: {
	item: Equipment;
}): React.JSX.Element {
	const { language, t } = useI18n();
	const category = getCategory(item.categoryId);
	const images = item.gallery.length > 0 ? item.gallery : [item.image];
	const [activeImage, setActiveImage] = useState(images[0]);
	const [tab, setTab] = useState<Tab>("description");
	const tabsRef = useRef<HTMLDivElement>(null);
	const name = item.name[language];

	// Same category first, then the rest of the catalogue in priority order.
	const related = [
		...getEquipmentByCategory(item.categoryId),
		...getEquipmentInPriorityOrder(),
	]
		.filter(
			(other, index, list) =>
				other.id !== item.id && list.indexOf(other) === index,
		)
		.slice(0, RELATED_COUNT);

	function openQuote(): void {
		setTab("quote");
		tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	const tabs: { id: Tab; label: string }[] = [
		{ id: "description", label: t.equipmentDetail.tabDescription },
		{ id: "specs", label: t.equipmentDetail.tabSpecs },
		{ id: "quote", label: t.equipmentDetail.tabQuote },
	];

	return (
		<>
			<PageHero title={t.equipmentDetail.bannerTitle} as="p" />
			<div className="page-wrap py-14 md:py-20">
				<div className="grid gap-10 md:grid-cols-2 lg:gap-14">
					<div>
						<div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#f7f7f7]">
							<img
								src={activeImage}
								alt={name}
								className="h-full w-full object-cover"
							/>
							<a
								href={activeImage}
								target="_blank"
								rel="noreferrer"
								aria-label={name}
								className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white text-[#202020] shadow"
							>
								<ZoomIn className="size-4" aria-hidden="true" />
							</a>
						</div>
						{images.length > 1 && (
							<div className="mt-3 grid grid-cols-4 gap-3">
								{images.map((image, index) => (
									<button
										key={image}
										type="button"
										onClick={() => setActiveImage(image)}
										aria-label={`${name} — ${index + 1}`}
										aria-pressed={image === activeImage}
										className={cn(
											"aspect-[4/3] overflow-hidden border-2",
											image === activeImage
												? "border-primary"
												: "border-transparent",
										)}
									>
										<img
											src={image}
											alt=""
											className="h-full w-full object-cover"
											loading="lazy"
										/>
									</button>
								))}
							</div>
						)}
					</div>

					<div>
						<h1 className="display-title text-3xl font-bold text-[#313131] md:text-4xl">
							{name}
						</h1>
						<div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
							<button
								type="button"
								onClick={openQuote}
								className="h-10 bg-primary px-6 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover"
							>
								{t.equipmentDetail.tabQuote}
							</button>
							<span className="inline-flex items-center gap-1.5 text-sm text-[#202020]">
								<MapPin className="size-4" aria-hidden="true" />
								{t.equipmentDetail.delivered}
							</span>
						</div>
						<p className="mt-6 text-[15px] leading-7 text-[#202020]">
							{item.summary[language]}
						</p>
						<ul className="mt-5 space-y-1 text-sm text-[#202020]">
							{item.specs.slice(0, 3).map((spec) => (
								<li key={spec.label.en}>
									{spec.label[language]}:{" "}
									<strong>{localize(spec.value, language)}</strong>
								</li>
							))}
						</ul>
						{category && (
							<p className="mt-5 text-sm text-[#202020]">
								{t.equipmentDetail.categoryLabel}:{" "}
								<Link
									to="/fleet"
									search={{ category: category.id }}
									className="text-primary no-underline hover:underline"
								>
									{category.name[language]}
								</Link>
							</p>
						)}
					</div>
				</div>

				<div ref={tabsRef} className="mt-16 scroll-mt-6">
					<div
						role="tablist"
						className="flex gap-5 overflow-x-auto border-b border-[#e5e5e5] sm:gap-8"
					>
						{tabs.map((entry) => (
							<button
								key={entry.id}
								type="button"
								role="tab"
								aria-selected={tab === entry.id}
								onClick={() => setTab(entry.id)}
								className={cn(
									"-mb-px shrink-0 whitespace-nowrap border-b-2 pb-3 text-sm font-semibold transition-colors sm:text-[15px]",
									tab === entry.id
										? "border-primary text-[#202020]"
										: "border-transparent text-[#999] hover:text-[#202020]",
								)}
							>
								{entry.label}
							</button>
						))}
					</div>

					<div role="tabpanel" className="pt-8">
						{tab === "description" && (
							<div className="max-w-4xl text-[15px] leading-7 text-[#202020]">
								<p>{item.description[language]}</p>
								<div className="mt-8 grid gap-8 md:grid-cols-2">
									<CheckList
										title={t.equipmentDetail.applications}
										items={item.applications.map((a) => a[language])}
									/>
									<CheckList
										title={t.equipmentDetail.services}
										items={[...t.equipmentDetail.serviceItems]}
									/>
								</div>
							</div>
						)}
						{tab === "specs" && (
							<div className="max-w-3xl">
								<table className="w-full border-collapse text-sm">
									<tbody>
										{item.specs.map((spec) => (
											<tr
												key={spec.label.en}
												className="border-b border-[#eee]"
											>
												<th className="w-1/3 py-3 pr-4 text-left font-semibold text-[#313131]">
													{spec.label[language]}
												</th>
												<td className="py-3 text-[#202020]">
													{localize(spec.value, language)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<p className="mt-4 text-xs text-[#777]">
									{t.equipmentDetail.specNote}
								</p>
							</div>
						)}
						{tab === "quote" && <QuoteRequestCard item={item} />}
					</div>
				</div>

				<section className="mt-20">
					<h2 className="display-title text-2xl font-bold text-[#313131]">
						{t.equipmentDetail.relatedTitle}
					</h2>
					<span
						className="mt-2 block h-0.5 w-12 bg-primary"
						aria-hidden="true"
					/>
					<ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
						{related.map((other) => (
							<li key={other.id}>
								<EquipmentTile item={other} />
							</li>
						))}
					</ul>
				</section>
			</div>
		</>
	);
}

function CheckList({
	title,
	items,
}: {
	title: string;
	items: string[];
}): React.JSX.Element {
	return (
		<div>
			<h3 className="display-title mb-4 text-lg font-bold text-[#313131]">
				{title}
			</h3>
			<ul className="space-y-2.5">
				{items.map((text) => (
					<li key={text} className="flex items-start gap-3 text-sm">
						<Check
							className="mt-0.5 size-4 shrink-0 text-primary"
							strokeWidth={3}
							aria-hidden="true"
						/>
						{text}
					</li>
				))}
			</ul>
		</div>
	);
}
