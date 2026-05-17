import { createFileRoute } from "@tanstack/react-router";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import type { UIMessage } from "ai";
import { buildSystemPrompt } from "#/lib/chatbot-data";

export const Route = createFileRoute("/api/chat")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				if (!process.env.OPENAI_API_KEY) {
					return Response.json(
						{ error: "Missing OPENAI_API_KEY" },
						{ status: 500 },
					);
				}

				const body = await request.json();
				const messages: UIMessage[] = body.messages ?? [];
				const language: "en" | "pt" = body.language === "pt" ? "pt" : "en";

				const result = streamText({
					model: openai("gpt-4o-mini"),
					system: buildSystemPrompt(language),
					messages: await convertToModelMessages(messages),
					onError: (error) => {
						console.error("Chat API error", error);
					},
				});

				return result.toUIMessageStreamResponse({
					onError: () =>
						"The assistant is temporarily unavailable. Please try again in a moment.",
				});
			},
		},
	},
});
