import { LOCATIONS } from "#/components/booking/locations";
import { EQUIPMENT_CATEGORIES } from "#/data/equipment";
import type { BookingRequest } from "#/lib/booking-message";

export const BOOKING_STEPS = [
	"Equipment",
	"Project",
	"Client",
	"Review",
] as const;
export const BOOKING_CATEGORIES = EQUIPMENT_CATEGORIES.map(
	(category) => category.name.en,
);
export const BOOKING_SECTORS = [
	"Mining",
	"Quarrying",
	"Mineral processing",
	"Construction",
	"Infrastructure",
	"Other",
];
// Values are sent to sales in English; labels come from t.bookingFlow.extraLabels.
export const BOOKING_EXTRAS = [
	"Certified operator",
	"Delivery & mobilisation",
	"Maintenance & servicing",
	"Fuel supply",
	"Insurance",
];

export type UpdateBookingRequest = <K extends keyof BookingRequest>(
	key: K,
	value: BookingRequest[K],
) => void;

export const DEFAULT_BOOKING_REQUEST: BookingRequest = {
	fleetRequest: "Not sure, advise me",
	category: "Not specified",
	province: LOCATIONS[0],
	location: "",
	startDate: "",
	returnDate: "",
	projectUse: "",
	extras: [],
	companyName: "",
	nuit: "",
	sector: "Mining",
	contactPerson: "",
	phone: "",
	email: "",
	address: "",
};
