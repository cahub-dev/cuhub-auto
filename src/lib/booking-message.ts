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

export interface EquipmentQuoteRequest {
	equipmentName: string;
	quantity: number;
	startDate: string;
	duration: string;
	province: string;
	siteLocation: string;
	operatorRequired: boolean;
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

export function buildEquipmentQuoteMessage(
	request: EquipmentQuoteRequest,
): string {
	return [
		"Hello CA HUB AUTO,",
		"",
		`I would like a rental quote for: ${request.quantity} x ${request.equipmentName}`,
		`Start date: ${request.startDate || "To be confirmed"}`,
		`Duration: ${request.duration}`,
		`Site: ${request.siteLocation ? `${request.siteLocation}, ` : ""}${request.province}`,
		`Certified operator: ${request.operatorRequired ? "Yes" : "No"}`,
		"",
		"Please confirm availability and send a proposal.",
	].join("\n");
}

export function buildEquipmentQuoteWhatsAppUrl(
	request: EquipmentQuoteRequest,
): string {
	return buildWhatsAppUrl(buildEquipmentQuoteMessage(request));
}

export function buildEquipmentQuoteMailtoUrl(
	request: EquipmentQuoteRequest,
): string {
	return buildMailtoUrl(
		`Quote request: ${request.equipmentName}`,
		buildEquipmentQuoteMessage(request),
	);
}
