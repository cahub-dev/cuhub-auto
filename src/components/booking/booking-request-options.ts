import { LOCATIONS } from "#/components/booking/LocationField";
import type { BookingRequest } from "#/lib/booking-message";

export const BOOKING_STEPS = ["Fleet", "Rental", "Client", "Review"] as const;
export const BOOKING_CATEGORIES = [
	"Vehicle",
	"Heavy equipment",
	"Truck",
	"Machinery",
];
export const BOOKING_SECTORS = [
	"Mining",
	"Construction",
	"Telecom",
	"Infrastructure",
	"Logistics",
	"Other",
];
export const BOOKING_EXTRAS = [
	"Driver",
	"Certified operator",
	"Delivery",
	"Premium insurance",
	"Priority support",
];

export type UpdateBookingRequest = <K extends keyof BookingRequest>(
	key: K,
	value: BookingRequest[K],
) => void;

export const DEFAULT_BOOKING_REQUEST: BookingRequest = {
	fleetRequest: "Not sure, advise me",
	category: "Vehicle",
	province: LOCATIONS[0],
	location: "",
	startDate: "",
	returnDate: "",
	projectUse: "",
	extras: [],
	companyName: "",
	nuit: "",
	sector: "Construction",
	contactPerson: "",
	phone: "",
	email: "",
	address: "",
};
