import type React from "react";
import { FleetCard, type FleetCardData } from "#/components/cars/FleetCard";

export const FEATURED_FLEET: FleetCardData[] = [
	{
		id: "toyota-land-cruiser",
		name: "Toyota Land Cruiser",
		image: "/car_types/toyota_landcruiser.webp",
		description:
			"Engineered for high-performance operations, operational reliability, secure, and professional presence. Ideal for supervisory and logistics roles in demanding environments.",
		sectors: ["Mining", "Construction"],
	},
	{
		id: "nissan-navara-single",
		name: "Nissan Navara Single Cab",
		image: "/car_types/nissan_navara.webp",
		description:
			"Strategic operational support vehicle, designed for mobility in challenging terrain. Ideal for transporting supervisors, technicians, and light equipment.",
		sectors: ["Mining", "Construction", "Rural"],
	},
	{
		id: "nissan-navara-double",
		name: "Nissan Navara Double Cab",
		image: "/car_types/nissan-navara_2.webp",
		description:
			"Ideal for operations in difficult terrain, including mining, construction, and rural areas. Offers excellent performance, safety, and reliable mobility for operational teams.",
		sectors: ["Mining", "Construction", "Rural"],
	},
	{
		id: "develon-loader",
		name: "Develon Loader SD300",
		image: "/car_types/develon-loader.webp",
		description:
			"Combining power and versatility, allowing for efficient excavation, loading, and transport of materials across varied terrains. Ideal for construction, infrastructure, and mining projects.",
		sectors: ["Construction", "Mining", "Infrastructure"],
	},
	{
		id: "develon-excavator",
		name: "Develon Excavator Shovel DX220",
		image: "/car_types/develon-excavator.webp",
		description:
			"Offers high productivity, low fuel consumption, and exceptional durability, ensuring continuous and safe operations even on difficult terrain.",
		sectors: ["Mining", "Construction", "Infrastructure"],
	},
	{
		id: "scania-mining",
		name: "Scania Mining Truck",
		image: "/car_types/scania.webp",
		description:
			"Engineered for extreme-duty performance, reducing operating costs and operational efficiency in the toughest mining environments. Delivers superior hauling capacity to support heavy industrial operations.",
		sectors: ["Mining", "Heavy Industry"],
	},
];

export function FeaturedFleet(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24" style={{ backgroundColor: "#f6f6f6" }}>
			<div className="page-wrap">
				{/* Header */}
				<div className="flex flex-col items-center text-center mb-10 md:mb-14">
					<span className="island-kicker inline-block mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
						OUR SERVICES
					</span>
					<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight">
						Featured Fleet
					</h2>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{FEATURED_FLEET.map((car) => (
						<FleetCard key={car.id} car={car} />
					))}
				</div>
			</div>
		</section>
	);
}
