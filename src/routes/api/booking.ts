import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";
import { z } from "zod";
import { buildBookingMessage } from "#/lib/booking-message";

const bookingRequestSchema = z.object({
	fleetRequest: z.string().trim().min(1),
	category: z.string().trim().min(1),
	province: z.string().trim().min(1),
	location: z.string().trim(),
	startDate: z.string().trim().min(1),
	returnDate: z.string().trim().min(1),
	projectUse: z.string().trim().min(1),
	extras: z.array(z.string().trim()),
	companyName: z.string().trim().min(1),
	nuit: z.string().trim(),
	sector: z.string().trim().min(1),
	contactPerson: z.string().trim().min(1),
	phone: z.string().trim().min(1),
	email: z.email(),
	address: z.string().trim(),
});

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function textToHtml(message: string): string {
	return message
		.split("\n")
		.map((line) => (line ? escapeHtml(line) : "&nbsp;"))
		.join("<br />");
}

function buildClientConfirmationHtml(
	request: z.infer<typeof bookingRequestSchema>,
) {
	return `
		<p>Hello ${escapeHtml(request.contactPerson)},</p>
		<p>Thank you for contacting CA HUB AUTO. We received your rental quote request and our sales team will review availability and prepare a proposal.</p>
		<p><strong>Request summary</strong></p>
		<p>${textToHtml(buildBookingMessage(request))}</p>
		<p>We aim to reply within 24 hours.</p>
		<p>CA HUB AUTO</p>
	`;
}

export const Route = createFileRoute("/api/booking")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const resendApiKey = process.env.RESEND_API_KEY;
				const fromEmail = process.env.BOOKING_FROM_EMAIL;
				const salesEmail = process.env.BOOKING_SALES_EMAIL;

				if (!resendApiKey || !fromEmail || !salesEmail) {
					return Response.json(
						{
							error:
								"Missing RESEND_API_KEY, BOOKING_FROM_EMAIL, or BOOKING_SALES_EMAIL",
						},
						{ status: 500 },
					);
				}

				const body = await request.json().catch(() => null);
				const result = bookingRequestSchema.safeParse(body);

				if (!result.success) {
					return Response.json(
						{ error: "Invalid booking request" },
						{ status: 400 },
					);
				}

				const booking = result.data;
				const resend = new Resend(resendApiKey);
				const subject = `Rental quote request: ${booking.fleetRequest}`;
				const salesMessage = buildBookingMessage(booking);

				try {
					await Promise.all([
						resend.emails.send({
							from: fromEmail,
							to: salesEmail,
							replyTo: booking.email,
							subject,
							text: salesMessage,
							html: textToHtml(salesMessage),
						}),
						resend.emails.send({
							from: fromEmail,
							to: booking.email,
							replyTo: salesEmail,
							subject: "We received your CA HUB AUTO quote request",
							text: [
								`Hello ${booking.contactPerson},`,
								"",
								"Thank you for contacting CA HUB AUTO. We received your rental quote request and our sales team will review availability and prepare a proposal.",
								"",
								"Request summary:",
								salesMessage,
								"",
								"We aim to reply within 24 hours.",
								"",
								"CA HUB AUTO",
							].join("\n"),
							html: buildClientConfirmationHtml(booking),
						}),
					]);

					return Response.json({ ok: true });
				} catch (error) {
					console.error("Booking email error", error);
					return Response.json(
						{ error: "Unable to send booking request" },
						{ status: 502 },
					);
				}
			},
		},
	},
});
