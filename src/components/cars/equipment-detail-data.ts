import {
	BriefcaseBusiness,
	CircleGauge,
	DoorOpen,
	Droplets,
	Fuel,
	Gauge,
	Settings,
	Users,
} from "lucide-react";
import type { CarDetailData, CarExtra } from "#/components/cars/car-detail-data";

const CONTACT = {
	whatsappNumber: "+258840000000",
	email: "info@cahub.co.mz",
};

const INCLUDED = [
	"Preventive inspection before dispatch.",
	"Operator handover briefing included.",
	"Maintenance coordination during active rental.",
	"Flexible deployment scheduling in Maputo.",
];

const EXCLUDED = [
	"Fuel and lubricants during operation.",
	"Site permits, fines, or access charges.",
	"Damage caused by misuse or unsafe operation.",
	"Out-of-city transport unless quoted in advance.",
];

const EXTRAS: CarExtra[] = [
	{ id: "operator", label: "Certified operator", pricePerDay: 80 },
	{ id: "transport", label: "Site transport", pricePerDay: 65 },
	{ id: "priority-support", label: "Priority support", pricePerDay: 35 },
];

export const EQUIPMENT_DETAILS: CarDetailData[] = [
	{
		id: "develon-loader",
		name: "Develon Loader SD300",
		category: "Heavy Equipment",
		location: "Maputo, Mozambique",
		rating: 4.7,
		reviewCount: 31,
		dailyRate: 280,
		gallery: [
			"/loader/loaderr_1.png",
			"/loader/loader_2.png",
			"/loader/loader_3.png",
		],
		specs: [
			{ label: "Operator", value: "Optional", icon: Users },
			{ label: "Access", value: "Cabin", icon: DoorOpen },
			{ label: "Fuel Tank", value: "Large", icon: Droplets },
			{ label: "Fuel Type", value: "Diesel", icon: Fuel },
			{ label: "Usage", value: "Site work", icon: Gauge },
			{ label: "Control", value: "Hydraulic", icon: Settings },
			{ label: "Drive", value: "Wheel", icon: CircleGauge },
			{ label: "Bucket", value: "SD300", icon: BriefcaseBusiness },
		],
		description:
			"A powerful wheel loader for material handling, loading, and site preparation across construction, infrastructure, and mining operations.",
		included: INCLUDED,
		excluded: EXCLUDED,
		highlights: [
			"High productivity for earthmoving and loading work.",
			"Available with operator support on request.",
			"Suitable for construction, mining, and infrastructure projects.",
			"Flexible deployment windows for active job sites.",
		],
		extras: EXTRAS,
		...CONTACT,
	},
	{
		id: "develon-excavator",
		name: "Develon Excavator Shovel DX220",
		category: "Heavy Equipment",
		location: "Maputo, Mozambique",
		rating: 4.8,
		reviewCount: 28,
		dailyRate: 340,
		gallery: [
			"/excavator/excavator_1.png",
			"/excavator/excavator_2.png",
			"/excavator/excavator_3.png",
		],
		specs: [
			{ label: "Operator", value: "Optional", icon: Users },
			{ label: "Access", value: "Cabin", icon: DoorOpen },
			{ label: "Fuel Tank", value: "Large", icon: Droplets },
			{ label: "Fuel Type", value: "Diesel", icon: Fuel },
			{ label: "Usage", value: "Excavation", icon: Gauge },
			{ label: "Control", value: "Hydraulic", icon: Settings },
			{ label: "Drive", value: "Tracked", icon: CircleGauge },
			{ label: "Bucket", value: "DX220", icon: BriefcaseBusiness },
		],
		description:
			"A durable tracked excavator for excavation, trenching, and heavy site preparation where reliability and continuous productivity are critical.",
		included: INCLUDED,
		excluded: EXCLUDED,
		highlights: [
			"Built for demanding excavation and trenching tasks.",
			"Strong hydraulic performance for continuous operation.",
			"Good fit for mining, construction, and infrastructure sites.",
			"Operator and transport support available as extras.",
		],
		extras: EXTRAS,
		...CONTACT,
	},
	{
		id: "scania-mining",
		name: "Scania Mining Truck",
		category: "Mining Truck",
		location: "Maputo, Mozambique",
		rating: 4.9,
		reviewCount: 24,
		dailyRate: 420,
		gallery: [
			"/scania/scania_1.png",
			"/scania/scania_2.png",
			"/scania/scania_3.png",
		],
		specs: [
			{ label: "Seat Capacity", value: "2 People", icon: Users },
			{ label: "Total Doors", value: "2 Doors", icon: DoorOpen },
			{ label: "Fuel Tank", value: "Large", icon: Droplets },
			{ label: "Fuel Type", value: "Diesel", icon: Fuel },
			{ label: "Usage", value: "Hauling", icon: Gauge },
			{ label: "Transmission", value: "Automatic", icon: Settings },
			{ label: "Duty", value: "Heavy", icon: CircleGauge },
			{ label: "Load", value: "Mining", icon: BriefcaseBusiness },
		],
		description:
			"An extreme-duty truck configured for mining and industrial hauling where durability, uptime, and operating efficiency matter most.",
		included: INCLUDED,
		excluded: EXCLUDED,
		highlights: [
			"Reliable hauling capacity for heavy industrial operations.",
			"Designed for high-demand mining environments.",
			"Available for short-term and project-based rental.",
			"Driver support and deployment planning available.",
		],
		extras: EXTRAS,
		...CONTACT,
	},
];
