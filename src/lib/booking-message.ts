import { SALES_CONTACT } from "#/lib/contact-details";

export const BOOKING_WHATSAPP_NUMBER = SALES_CONTACT.phoneE164;
export const BOOKING_EMAIL = SALES_CONTACT.email;

export interface BookingRequest {
	fleetRequest: string;
	category: string;
	province: string;
	location: string;
	startDate: string;
	returnDate: string;
	projectUse: string;
	extras: string[];
	companyName: string;
	nuit: string;
	sector: string;
	contactPerson: string;
	phone: string;
	email: string;
	address: string;
}

export interface VehicleBookingRequest {
	vehicleName: string;
	pickupDate: string;
	pickupTime: string;
	pickupLocation: string;
	returnDate: string;
	returnTime: string;
	returnLocation: string;
	rentalDays: number;
	extras: string[];
	estimatedTotal: string;
}

export interface QuickBookingRequest {
	categoryLabel: string;
	pickupLocation: string;
	returnLocation: string;
	pickupDate: string;
	pickupTime: string;
	returnDate: string;
	returnTime: string;
}

export function buildWhatsAppUrl(
	message: string,
	number = BOOKING_WHATSAPP_NUMBER,
): string {
	return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(
	subject: string,
	message: string,
	email = BOOKING_EMAIL,
): string {
	return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

export function buildBookingMessage(request: BookingRequest): string {
	return [
		"Hello CA HUB AUTO,",
		"",
		"I would like to request a rental quote.",
		"",
		"Fleet request:",
		request.fleetRequest,
		`Category: ${request.category}`,
		"",
		"Rental details:",
		`Start date: ${request.startDate}`,
		`Return date: ${request.returnDate}`,
		`Province: ${request.province}`,
		`Location: ${request.location}`,
		`Project/use: ${request.projectUse}`,
		`Extras: ${request.extras.length > 0 ? request.extras.join(", ") : "None"}`,
		"",
		"Client details:",
		`Company: ${request.companyName}`,
		`NUIT: ${request.nuit || "Not provided"}`,
		`Sector: ${request.sector}`,
		`Contact person: ${request.contactPerson}`,
		`Phone: ${request.phone}`,
		`Email: ${request.email}`,
		`Address: ${request.address || "Not provided"}`,
		"",
		"Please confirm availability and send a proposal.",
	].join("\n");
}

export function buildBookingWhatsAppUrl(request: BookingRequest): string {
	return buildWhatsAppUrl(buildBookingMessage(request));
}

export function buildBookingMailtoUrl(request: BookingRequest): string {
	const subject = `Rental quote request: ${request.fleetRequest}`;
	return buildMailtoUrl(subject, buildBookingMessage(request));
}

export function buildVehicleBookingMessage(
	request: VehicleBookingRequest,
): string {
	return [
		`Hello CA HUB AUTO, I would like to book the ${request.vehicleName}.`,
		`Pickup: ${request.pickupDate} at ${request.pickupTime} from ${request.pickupLocation}`,
		`Return: ${request.returnDate} at ${request.returnTime} to ${request.returnLocation}`,
		`Rental period: ${request.rentalDays} day${request.rentalDays === 1 ? "" : "s"}`,
		`Extras: ${request.extras.length > 0 ? request.extras.join(", ") : "None"}`,
		`Estimated total: ${request.estimatedTotal}`,
	].join("\n");
}

export function buildVehicleBookingWhatsAppUrl(
	request: VehicleBookingRequest,
): string {
	return buildWhatsAppUrl(buildVehicleBookingMessage(request));
}

export function buildVehicleBookingMailtoUrl(
	request: VehicleBookingRequest,
): string {
	return buildMailtoUrl(
		`${request.vehicleName} booking inquiry`,
		buildVehicleBookingMessage(request),
	);
}

export function buildQuickBookingMessage(request: QuickBookingRequest): string {
	return [
		"Hello CA HUB AUTO,",
		"",
		`I'd like to rent a ${request.categoryLabel}.`,
		"",
		`Pickup: ${request.pickupLocation}, ${request.pickupDate} at ${request.pickupTime}`,
		`Return: ${request.returnLocation}, ${request.returnDate} at ${request.returnTime}`,
		"",
		"Please confirm availability. Thank you.",
	].join("\n");
}

export function buildQuickBookingWhatsAppUrl(
	request: QuickBookingRequest,
): string {
	return buildWhatsAppUrl(buildQuickBookingMessage(request));
}

export function buildQuickBookingMailtoUrl(
	request: QuickBookingRequest,
): string {
	return buildMailtoUrl(
		`Booking request: ${request.categoryLabel}`,
		buildQuickBookingMessage(request),
	);
}
