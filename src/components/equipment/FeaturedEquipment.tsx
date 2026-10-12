"use client";

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { EquipmentTile } from "#/components/equipment/EquipmentTile";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { getEquipmentInPriorityOrder } from "#/data/equipment";
import { useI18n } from "#/lib/i18n";

const FEATURED_COUNT = 8;

export function FeaturedEquipment(): React.JSX.Element {
	const { t } = useI18n();
	const items = getEquipmentInPriorityOrder().slice(0, FEATURED_COUNT);

	return (
		<section className="py-20 md:py-28">
			<div className="page-wrap">
				<div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
					<SectionHeading
						ghost={t.home.featured.ghost}
						title={t.home.featured.title}
					/>
					<Link
						to="/fleet"
						className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#313131] no-underline hover:text-primary"
					>
						{t.home.featured.viewAll}
						<ArrowRight className="size-4" aria-hidden="true" />
					</Link>
				</div>

				<ul className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
					{items.map((item) => (
						<li key={item.id}>
							<EquipmentTile item={item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
