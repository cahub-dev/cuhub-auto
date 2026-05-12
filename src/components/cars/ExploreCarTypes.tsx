import type React from "react";
import { type CarType, CarTypeCard } from "#/components/cars/CarTypeCard";

const CAR_TYPES: CarType[] = [
	{
		id: "toyota-land-cruiser",
		name: "Toyota Land Cruiser",
		image: "/car_types/toyota_landcruiser.png",
	},
	{
		id: "nissan-navara",
		name: "Nissan Navara",
		image: "/car_types/nissan_navara.png",
	},
	{
		id: "nissan-navara-double",
		name: "Nissan Navara Double",
		image: "/car_types/nissan-navara_2.png",
	},
	{
		id: "develon-excavator",
		name: "Develon Excavator",
		image: "/car_types/develon-excavator.png",
	},
	{
		id: "develon-loader",
		name: "Develon Loader",
		image: "/car_types/develon-loader.png",
	},
	{
		id: "scania-mining",
		name: "Scania Mining Truck",
		image: "/car_types/scania.png",
	},
	{
		id: "hatchback",
		name: "Hatchback",
		image: "/car_types/hatchback.png",
	},
	{
		id: "luxury-sedan",
		name: "Luxury Sedan",
		image: "/car_types/luxury-sedan.png",
	},
	{
		id: "sedan",
		name: "Sedan",
		image: "/car_types/sedan.png",
	},
	{
		id: "sports-car",
		name: "Sports Car",
		image: "/car_types/sports-car.png",
	},
	{
		id: "suv",
		name: "SUV",
		image: "/car_types/suv.png",
	},
	{
		id: "truck",
		name: "Truck",
		image: "/car_types/truck.png",
	},
];

export function ExploreCarTypes(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24">
			<div className="page-wrap">
				{/* Header */}
				<div className="flex flex-col items-center text-center mb-10 md:mb-14">
					<span className="island-kicker inline-block mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
						FLEET
					</span>
					<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight">
						Explore Our Fleet
					</h2>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
					{CAR_TYPES.map((type) => (
						<CarTypeCard key={type.id} type={type} />
					))}
				</div>
			</div>
		</section>
	);
}
