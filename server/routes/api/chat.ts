import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import type { UIMessage } from "ai";
import { buildSystemPrompt } from "../../../src/lib/chatbot-data";

export default async (request: Request): Promise<Response> => {
	const body = await request.json();
	const messages: UIMessage[] = body.messages ?? [];
	const language: "en" | "pt" = body.language === "pt" ? "pt" : "en";

	const result = streamText({
		model: openai("gpt-4o-mini"),
		system: buildSystemPrompt(language),
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
};
