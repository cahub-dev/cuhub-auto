import { Link } from "@tanstack/react-router";
import type React from "react";
import { Button } from "#/components/ui/button";

export interface FleetCardData {
	id: string;
	name: string;
	image: string;
	description: string;
	sectors: string[];
}

export function FleetCard({ car }: { car: FleetCardData }): React.JSX.Element {
	return (
		<Link
			to="/fleet/$carId"
			params={{ carId: car.id }}
			className="flex flex-col bg-white rounded-2xl border border-border/40 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 no-underline"
		>
			{/* Image */}
			<div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
				<img
					src={car.image}
					alt={car.name}
					className="w-full h-full object-contain p-4"
					loading="lazy"
				/>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-3 p-5">
				<h3 className="text-lg font-semibold text-foreground">{car.name}</h3>

				<p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
					{car.description}
				</p>

				{/* Sectors */}
				<div className="flex flex-wrap gap-2">
					{car.sectors.map((sector) => (
						<span
							key={sector}
							className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground"
						>
							{sector}
						</span>
					))}
				</div>

				{/* CTA */}
				<Button
					variant="outline"
					className="w-full h-11 font-semibold text-sm rounded-lg mt-1 pointer-events-none"
					tabIndex={-1}
					aria-hidden="true"
				>
					Request Quote
				</Button>
			</div>
		</Link>
	);
}
