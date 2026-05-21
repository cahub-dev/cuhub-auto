import { openai } from "@ai-sdk/openai";
import { createFileRoute } from "@tanstack/react-router";
import type { UIMessage } from "ai";
import { convertToModelMessages, streamText } from "ai";
import { buildSystemPrompt } from "#/lib/chatbot-data";

const MAX_BODY_BYTES = 10 * 1024;
const MAX_USER_MESSAGE_CHARS = 1000;
const MAX_HISTORY_MESSAGES = 10;
const MAX_OUTPUT_TOKENS = 500;
const RATE_LIMITS = [
	{ windowMs: 60 * 1000, max: 10 },
	{ windowMs: 60 * 60 * 1000, max: 50 },
];
const RATE_LIMIT_MESSAGE = "Too many requests. Please try again later.";
const GENERIC_ERROR_MESSAGE =
	"The assistant is temporarily unavailable. Please try again in a moment.";

type RateLimitRecord = {
	windowStart: number;
	count: number;
};

const rateLimitStore = new Map<string, RateLimitRecord[]>();

function getClientIp(request: Request) {
	const forwardedFor = request.headers
		.get("x-forwarded-for")
		?.split(",")[0]
		?.trim();
	return (
		forwardedFor ||
		request.headers.get("x-real-ip") ||
		request.headers.get("cf-connecting-ip") ||
		"unknown"
	);
}

function checkRateLimit(ip: string) {
	const now = Date.now();
	const records =
		rateLimitStore.get(ip) ??
		RATE_LIMITS.map(() => ({ windowStart: now, count: 0 }));

	for (const [index, limit] of RATE_LIMITS.entries()) {
		const record = records[index];
		if (now - record.windowStart >= limit.windowMs) {
			record.windowStart = now;
			record.count = 0;
		}

		if (record.count >= limit.max) {
			return false;
		}
	}

	for (const record of records) record.count += 1;
	rateLimitStore.set(ip, records);
	return true;
}

function textFromMessage(message: UIMessage) {
	return message.parts
		.filter((part) => part.type === "text")
		.map((part) => part.text)
		.join("")
		.trim();
}

function logChatEvent(
	request: Request,
	status: number,
	metadata: { messageLength?: number; error?: unknown } = {},
) {
	console.info("Chat API event", {
		timestamp: new Date().toISOString(),
		ip: getClientIp(request),
		messageLength: metadata.messageLength ?? 0,
		status,
		error: metadata.error instanceof Error ? metadata.error.name : undefined,
	});
}

export const Route = createFileRoute("/api/chat")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				if (!process.env.OPENAI_API_KEY) {
					logChatEvent(request, 500);
					return Response.json(
						{ error: GENERIC_ERROR_MESSAGE },
						{ status: 500 },
					);
				}

				const ip = getClientIp(request);
				if (!checkRateLimit(ip)) {
					logChatEvent(request, 429);
					return Response.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });
				}

				const contentLength = Number(
					request.headers.get("content-length") ?? 0,
				);
				if (contentLength > MAX_BODY_BYTES) {
					logChatEvent(request, 400);
					return Response.json(
						{ error: "Message is too long." },
						{ status: 400 },
					);
				}

				let body: unknown;
				try {
					const rawBody = await request.text();
					if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
						logChatEvent(request, 400);
						return Response.json(
							{ error: "Message is too long." },
							{ status: 400 },
						);
					}
					body = JSON.parse(rawBody);
				} catch (error) {
					logChatEvent(request, 400, { error });
					return Response.json({ error: "Invalid request." }, { status: 400 });
				}

				if (
					typeof body !== "object" ||
					body === null ||
					!("messages" in body) ||
					!Array.isArray(body.messages) ||
					!(body.language === "en" || body.language === "pt")
				) {
					logChatEvent(request, 400);
					return Response.json({ error: "Invalid request." }, { status: 400 });
				}

				const messages = body.messages.slice(
					-MAX_HISTORY_MESSAGES,
				) as UIMessage[];
				const latestUserMessage = [...messages]
					.reverse()
					.find((message) => message.role === "user");
				const latestUserText = latestUserMessage
					? textFromMessage(latestUserMessage)
					: "";

				if (!latestUserText) {
					logChatEvent(request, 400);
					return Response.json({ error: "Invalid request." }, { status: 400 });
				}

				if (latestUserText.length > MAX_USER_MESSAGE_CHARS) {
					logChatEvent(request, 400, { messageLength: latestUserText.length });
					return Response.json(
						{ error: "Message is too long." },
						{ status: 400 },
					);
				}

				const result = streamText({
					model: openai("gpt-4o-mini"),
					system: buildSystemPrompt(body.language),
					messages: await convertToModelMessages(messages),
					maxOutputTokens: MAX_OUTPUT_TOKENS,
					onError: (error) => {
						console.error("Chat API error", error);
					},
				});

				return result.toUIMessageStreamResponse({
					onError: () => GENERIC_ERROR_MESSAGE,
				});
			},
		},
	},
});
