export const BOOKING_WHATSAPP_NUMBER = "+258877541015";
export const BOOKING_EMAIL = "cahubauto@gmail.com";

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
	const number = BOOKING_WHATSAPP_NUMBER.replace(/\D/g, "");
	return `https://wa.me/${number}?text=${encodeURIComponent(buildBookingMessage(request))}`;
}

export function buildBookingMailtoUrl(request: BookingRequest): string {
	const subject = `Rental quote request: ${request.fleetRequest}`;
	const body = encodeURIComponent(buildBookingMessage(request));
	return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
}
