import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";
import { z } from "zod";
import { SALES_CONTACT } from "#/lib/contact-details";

const escalationSchema = z.object({
	name: z.string().trim().min(2).max(80),
	email: z.email(),
	phone: z.string().trim().min(7).max(40),
	language: z.enum(["en", "pt"]),
	reason: z.string().trim().min(1).max(200),
	transcript: z.string().trim().min(1).max(5000),
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

export const Route = createFileRoute("/api/chat-escalation")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const resendApiKey = process.env.RESEND_API_KEY;
				const fromEmail = process.env.BOOKING_FROM_EMAIL;

				if (!resendApiKey || !fromEmail) {
					return Response.json(
						{ error: "The support team is temporarily unavailable." },
						{ status: 500 },
					);
				}

				const body = await request.json().catch(() => null);
				const result = escalationSchema.safeParse(body);

				if (!result.success) {
					return Response.json(
						{ error: "Missing required support contact details." },
						{ status: 400 },
					);
				}

				const escalation = result.data;
				const resend = new Resend(resendApiKey);
				const message = [
					"Chatbot support escalation",
					"",
					`Reason: ${escalation.reason}`,
					`Language: ${escalation.language}`,
					"",
					"Customer details:",
					`Name: ${escalation.name}`,
					`Email: ${escalation.email}`,
					`Phone: ${escalation.phone}`,
					"",
					"Chat transcript:",
					escalation.transcript,
				].join("\n");

				try {
					await resend.emails.send({
						from: fromEmail,
						to: SALES_CONTACT.email,
						replyTo: escalation.email,
						subject: `Chatbot support request: ${escalation.name}`,
						text: message,
						html: textToHtml(message),
					});

					return Response.json({ ok: true });
				} catch (error) {
					console.error("Chat escalation email error", error);
					return Response.json(
						{ error: "Unable to forward support request." },
						{ status: 502 },
					);
				}
			},
		},
	},
});
