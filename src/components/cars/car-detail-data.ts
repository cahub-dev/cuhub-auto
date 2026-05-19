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
import type { ComponentType, SVGProps } from "react";
import { EQUIPMENT_DETAILS } from "#/components/cars/equipment-detail-data";
import { SALES_CONTACT } from "#/lib/contact-details";

export interface CarSpec {
	label: string;
	value: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface CarExtra {
	id: string;
	label: string;
	pricePerDay: number;
}

export interface CarDetailData {
	id: string;
	name: string;
	category: string;
	location: string;
	rating: number;
	reviewCount: number;
	dailyRate: number;
	gallery: [string, string, string];
	specs: CarSpec[];
	description: string;
	included: string[];
	excluded: string[];
	highlights: string[];
	extras: CarExtra[];
	whatsappNumber: string;
	email: string;
}

const CONTACT = {
	whatsappNumber: SALES_CONTACT.phoneE164,
	email: SALES_CONTACT.email,
};

const STANDARD_INCLUDED = [
	"Scheduled maintenance support during rental period.",
	"Basic comprehensive insurance included.",
	"Roadworthy vehicle inspection before handover.",
	"Flexible pickup coordination in Maputo.",
	"24/7 rental assistance for active bookings.",
];

const STANDARD_EXCLUDED = [
	"Fuel consumption and toll fees.",
	"Traffic fines or penalties during rental.",
	"Cross-border fees unless approved in advance.",
	"Driver accommodation for out-of-town trips.",
];

const STANDARD_EXTRAS: CarExtra[] = [
	{ id: "driver", label: "Professional driver", pricePerDay: 45 },
	{ id: "delivery", label: "Vehicle delivery", pricePerDay: 25 },
	{ id: "premium-insurance", label: "Premium insurance", pricePerDay: 18 },
];

export const CAR_DETAILS: CarDetailData[] = [
	{
		id: "toyota-land-cruiser",
		name: "Toyota Land Cruiser",
		category: "Premium SUV",
		location: "Maputo, Mozambique",
		rating: 4.8,
		reviewCount: 56,
		dailyRate: 120,
		gallery: [
			"/landcruiser/landcruiser_1.webp",
			"/landcruiser/landcruiser_2.webp",
			"/landcruiser/landcruiser_3.webp",
		],
		specs: [
			{ label: "Seat Capacity", value: "7 People", icon: Users },
			{ label: "Total Doors", value: "5 Doors", icon: DoorOpen },
			{ label: "Fuel Tank", value: "93 Liters", icon: Droplets },
			{ label: "Fuel Type", value: "Diesel", icon: Fuel },
			{ label: "Mileage", value: "11 Km/L", icon: Gauge },
			{ label: "Transmission", value: "Automatic", icon: Settings },
			{ label: "Drive Type", value: "4x4", icon: CircleGauge },
			{ label: "Cargo", value: "Large", icon: BriefcaseBusiness },
		],
		description:
			"A dependable premium SUV for executive travel, site visits, and long-distance operations across Mozambique. The Land Cruiser combines strong terrain capability with a comfortable cabin and professional presence.",
		included: STANDARD_INCLUDED,
		excluded: STANDARD_EXCLUDED,
		highlights: [
			"Excellent comfort for executive and operational teams.",
			"Strong 4x4 capability for demanding routes.",
			"Ideal for mining, construction, and rural field operations.",
			"Flexible rental periods for short or long assignments.",
		],
		extras: STANDARD_EXTRAS,
		...CONTACT,
	},
	{
		id: "nissan-navara-single",
		name: "Nissan Navara Single Cab",
		category: "Operational Pickup",
		location: "Maputo, Mozambique",
		rating: 4.7,
		reviewCount: 42,
		dailyRate: 85,
		gallery: [
			"/navara_single/navara_single_1.webp",
			"/navara_single/navara_single_2.webp",
			"/navara_single/navara_single_3.webp",
		],
		specs: [
			{ label: "Seat Capacity", value: "2 People", icon: Users },
			{ label: "Total Doors", value: "2 Doors", icon: DoorOpen },
			{ label: "Fuel Tank", value: "80 Liters", icon: Droplets },
			{ label: "Fuel Type", value: "Diesel", icon: Fuel },
			{ label: "Mileage", value: "12 Km/L", icon: Gauge },
			{ label: "Transmission", value: "Manual", icon: Settings },
			{ label: "Drive Type", value: "4x4", icon: CircleGauge },
			{ label: "Cargo", value: "Open bed", icon: BriefcaseBusiness },
		],
		description:
			"A practical single-cab pickup built for light equipment movement, site mobility, and reliable daily operations in demanding work environments.",
		included: STANDARD_INCLUDED,
		excluded: STANDARD_EXCLUDED,
		highlights: [
			"Efficient cargo movement for tools and light equipment.",
			"Reliable mobility for supervisors and technicians.",
			"Well suited to construction, mining, and rural routes.",
			"Cost-effective daily rental for operational fleets.",
		],
		extras: STANDARD_EXTRAS,
		...CONTACT,
	},
	{
		id: "nissan-navara-double",
		name: "Nissan Navara Double Cab",
		category: "Team Pickup",
		location: "Maputo, Mozambique",
		rating: 4.8,
		reviewCount: 49,
		dailyRate: 95,
		gallery: [
			"/navara_double/navara_double_1.webp",
			"/navara_double/navara_double_2.webp",
			"/navara_double/navara_double_3.webp",
		],
		specs: [
			{ label: "Seat Capacity", value: "5 People", icon: Users },
			{ label: "Total Doors", value: "4 Doors", icon: DoorOpen },
			{ label: "Fuel Tank", value: "80 Liters", icon: Droplets },
			{ label: "Fuel Type", value: "Diesel", icon: Fuel },
			{ label: "Mileage", value: "10 Km/L", icon: Gauge },
			{ label: "Transmission", value: "Automatic", icon: Settings },
			{ label: "Drive Type", value: "4x4", icon: CircleGauge },
			{ label: "Cargo", value: "Open bed", icon: BriefcaseBusiness },
		],
		description:
			"A versatile double-cab pickup for field teams that need passenger comfort and cargo flexibility in one durable vehicle.",
		included: STANDARD_INCLUDED,
		excluded: STANDARD_EXCLUDED,
		highlights: [
			"Comfortable team transport with cargo capacity.",
			"Strong performance on unpaved and rural roads.",
			"Ideal for technical teams and site supervision.",
			"Available with driver support on request.",
		],
		extras: STANDARD_EXTRAS,
		...CONTACT,
	},
];

export function getCarDetail(id: string): CarDetailData | undefined {
	return [...CAR_DETAILS, ...EQUIPMENT_DETAILS].find((car) => car.id === id);
}
