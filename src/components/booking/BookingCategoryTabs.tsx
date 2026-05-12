import { Car, Cog, Construction, Truck } from "lucide-react";
import type React from "react";

export type BookingCategory =
	| "cars"
	| "trucks"
	| "heavy-equipment"
	| "machinery";

interface CategoryDef {
	readonly id: BookingCategory;
	readonly label: string;
	readonly icon: typeof Car;
}

const CATEGORIES: readonly CategoryDef[] = [
	{ id: "cars", label: "Cars", icon: Car },
	{ id: "trucks", label: "Trucks", icon: Truck },
	{ id: "heavy-equipment", label: "Heavy Equipment", icon: Construction },
	{ id: "machinery", label: "Machinery", icon: Cog },
];

export function BookingCategoryTabs({
	value,
	onChange,
}: {
	value: BookingCategory;
	onChange: (id: BookingCategory) => void;
}): React.JSX.Element {
	return (
		<div className="booking-tabs-row">
			<div
				role="tablist"
				aria-label="Vehicle category"
				className="booking-tabs"
			>
				{CATEGORIES.map((cat) => {
					const Icon = cat.icon;
					const isActive = cat.id === value;
					return (
						<button
							key={cat.id}
							type="button"
							role="tab"
							aria-selected={isActive}
							className={`booking-tab${isActive ? " is-active" : ""}`}
							onClick={() => onChange(cat.id)}
						>
							<Icon className="size-4" aria-hidden="true" />
							<span>{cat.label}</span>
						</button>
					);
				})}
			</div>
			<button
				type="button"
				className="booking-view-link"
				// CAHUB-TODO: wire up to reservation lookup/edit flow once designed
				onClick={() => {}}
			>
				View / edit my booking
			</button>
		</div>
	);
}
