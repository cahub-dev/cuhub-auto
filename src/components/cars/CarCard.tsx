import { Link } from "@tanstack/react-router";
import { Briefcase, DoorOpen, Star, Users } from "lucide-react";
import type React from "react";
import { Button } from "#/components/ui/button";

export interface CarCardData {
	id: string;
	name: string;
	image: string;
	pricePerDay: number;
	rating: number;
	description: string;
	doors: number;
	suitcase: string;
	passengers: number;
}

export function CarCard({ car }: { car: CarCardData }): React.JSX.Element {
	return (
		<Link
			to="/fleet/$carId"
			params={{ carId: car.id }}
			className=" group flex flex-col bg-white rounded-2xl border border-border/40 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] no-underline"
		>
			{/* Image */}
			<div className="relative aspect-[4/3] overflow-hidden">
				<img
					src={car.image}
					alt={car.name}
					className=" w-full h-full object-cover"
					loading="lazy"
				/>
				{/* Price badge */}
				<div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1.5 shadow-sm">
					<span className="text-lg font-bold text-primary">
						${car.pricePerDay}
					</span>
					<span className="text-xs text-muted-foreground">/ Day</span>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-3 p-5">
				{/* Title + rating */}
				<div className="flex items-center justify-between gap-2">
					<h3 className="text-lg font-semibold text-foreground truncate">
						{car.name}
					</h3>
					<div className="flex items-center gap-1 bg-accent rounded-full px-2 py-0.5 shrink-0">
						<Star className="size-3.5 fill-yellow-400 text-yellow-400" />
						<span className="text-xs font-medium text-foreground">
							{car.rating}
						</span>
					</div>
				</div>

				{/* Description */}
				<p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
					{car.description}
				</p>

				{/* Divider */}
				<div className="h-px bg-border" />

				{/* Specs */}
				<div className="flex flex-col gap-2">
					<SpecItem
						icon={<DoorOpen className="size-4 text-primary" />}
						label={`Doors: ${car.doors} Doors`}
					/>
					<SpecItem
						icon={<Briefcase className="size-4 text-primary" />}
						label={`Suitcase: ${car.suitcase}`}
					/>
					<SpecItem
						icon={<Users className="size-4 text-primary" />}
						label={`Passengers: ${car.passengers.toString().padStart(2, "0")}`}
					/>
				</div>

				{/* CTA */}
				<Button
					variant="outline"
					className="w-full h-11 font-semibold text-sm rounded-lg mt-1 pointer-events-none"
					tabIndex={-1}
					aria-hidden="true"
				>
					Rent now
				</Button>
			</div>
		</Link>
	);
}

function SpecItem({
	icon,
	label,
}: {
	icon: React.ReactNode;
	label: string;
}): React.JSX.Element {
	return (
		<div className="flex items-center gap-2.5">
			{icon}
			<span className="text-sm text-foreground">{label}</span>
		</div>
	);
}
