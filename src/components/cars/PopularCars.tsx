import type React from "react";
import { CarCard, type CarCardData } from "#/components/cars/CarCard";

const POPULAR_CARS: CarCardData[] = [
	{
		id: "toyota-land-cruiser",
		name: "Toyota Land Cruiser",
		image:
			"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=450&fit=crop",
		pricePerDay: 49,
		rating: 4.8,
		description:
			"Affordable electric sedans with impressive range, technology & minimalist design",
		doors: 2,
		suitcase: "1 Large, 2 Small",
		passengers: 6,
	},
	{
		id: "nissan-gtr-turbo",
		name: "Nissan GTR Turbo",
		image:
			"https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=450&fit=crop",
		pricePerDay: 49,
		rating: 4.8,
		description:
			"Compact car available as sedan hatchback, renowned for its all-wheel-drive",
		doors: 2,
		suitcase: "1 Large, 2 Small",
		passengers: 6,
	},
	{
		id: "mitsubishi-portan",
		name: "Mitsubishi Portan",
		image:
			"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=450&fit=crop",
		pricePerDay: 49,
		rating: 4.8,
		description:
			"Luxury compact SUV featuring as a premium interior, advanced technology",
		doors: 2,
		suitcase: "1 Large, 2 Small",
		passengers: 6,
	},
];

export function PopularCars(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24" style={{ backgroundColor: "#f6f6f6" }}>
			<div className="page-wrap">
				{/* Header */}
				<div className="flex flex-col items-center text-center mb-10 md:mb-14">
					<span className="island-kicker inline-block mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
						POPULAR CARS
					</span>
					<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight">
						Most Popular Cars
					</h2>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{POPULAR_CARS.map((car) => (
						<CarCard key={car.id} car={car} />
					))}
				</div>
			</div>
		</section>
	);
}
