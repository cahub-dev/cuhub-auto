"use client";

import { Link } from "@tanstack/react-router";
import type React from "react";
import { MachineBox } from "#/components/equipment/MachineBox";
import type { Equipment } from "#/data/equipment";
import { useI18n } from "#/lib/i18n";

/** Backhoe shop tile: grey box with the machine, name centered below. */
export function EquipmentTile({
	item,
}: {
	item: Equipment;
}): React.JSX.Element {
	const { language, t } = useI18n();

	return (
		<Link
			to="/fleet/$equipmentId"
			params={{ equipmentId: item.id }}
			className="group block text-center no-underline"
			data-testid="equipment-card"
		>
			<MachineBox item={item} grey className="aspect-square" />
			<span className="display-title mt-4 block text-base font-semibold text-[#202020] transition-colors group-hover:text-primary">
				{item.name[language]}
			</span>
			<span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-primary">
				{t.featuredFleet.requestQuote}
			</span>
		</Link>
	);
}
