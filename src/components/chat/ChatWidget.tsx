import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart } from "ai";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BookingRequest } from "#/lib/booking-message";

type Language = "en" | "pt";

const QUICK_REPLIES: Record<Language, string[]> = {
	en: ["View fleet", "Get a quote", "Service areas", "Contact us"],
	pt: ["Ver frota", "Obter cotação", "Áreas de serviço", "Contacte-nos"],
};

const WELCOME: Record<Language, string> = {
	en: "Hello! I'm the CA HUB AUTO assistant. How can I help you today?",
	pt: "Olá! Sou o assistente da CA HUB AUTO. Como posso ajudá-lo hoje?",
};

const MAX_INPUT_CHARS = 1000;
const SEND_COOLDOWN_MS = 1200;
const ERROR_MESSAGE: Record<Language, string> = {
	en: "The assistant is temporarily unavailable. Please try again in a moment.",
	pt: "O assistente está temporariamente indisponível. Tente novamente dentro de instantes.",
};
const QUOTE_STATUS: Record<
	Language,
	{
		ready: string;
		send: string;
		sending: string;
		success: string;
		error: string;
	}
> = {
	en: {
		ready: "Ready to send this quote request to CA HUB AUTO?",
		send: "Send quote request",
		sending: "Sending...",
		success: "Quote request sent. Our team will reply by email.",
		error: "Unable to send the quote request. Please try again.",
	},
	pt: {
		ready: "Pronto para enviar este pedido de cotação à CA HUB AUTO?",
		send: "Enviar pedido de cotação",
		sending: "A enviar...",
		success: "Pedido de cotação enviado. A nossa equipa responderá por email.",
		error: "Não foi possível enviar o pedido. Tente novamente.",
	},
};

type QuoteSubmitStatus = "idle" | "sending" | "success" | "error";
type EscalationStatus = "idle" | "sending" | "success" | "error";

const ESCALATION_STATUS: Record<
	Language,
	{
		missing: string;
		sending: string;
		success: string;
		error: string;
	}
> = {
	en: {
		missing:
			"I can forward this to our support team. Please share your name, email, and phone number so they can get back to you.",
		sending: "Forwarding this to our support team...",
		success:
			"I’ve forwarded this to our support team. They will get in touch with you soon.",
		error:
			"I couldn’t forward this automatically. Please try again in a moment.",
	},
	pt: {
		missing:
			"Posso encaminhar isto para a nossa equipa de suporte. Por favor, envie o seu nome, email e telefone para que possam entrar em contacto consigo.",
		sending: "A encaminhar para a nossa equipa de suporte...",
		success:
			"Encaminhei o pedido para a nossa equipa de suporte. Entrarão em contacto consigo em breve.",
		error:
			"Não consegui encaminhar automaticamente. Por favor, tente novamente dentro de instantes.",
	},
};

function MessageContent({ content }: { content: string }) {
	const lines = content.split("\n");
	return (
		<div className="space-y-1.5 break-words">
			{lines.map((line) => {
				const trimmed = line.trim();
				if (!trimmed) return <div key={line} className="h-1" />;

				const heading = trimmed.match(/^#{1,3}\s+(.+)$/);
				if (heading) {
					return (
						<div key={line} className="font-semibold mt-2 first:mt-0">
							<InlineMarkdown text={heading[1]} />
						</div>
					);
				}

				const bullet = trimmed.match(/^(?:[-*]|\d+\.)\s+(.+)$/);
				if (bullet) {
					return (
						<div key={line} className="flex gap-2">
							<span aria-hidden="true">•</span>
							<span>
								<InlineMarkdown text={bullet[1]} />
							</span>
						</div>
					);
				}

				return (
					<div key={line}>
						<InlineMarkdown text={trimmed} />
					</div>
				);
			})}
		</div>
	);
}

function InlineMarkdown({ text }: { text: string }) {
	const parts = text.split(/(https?:\/\/[^\s]+|mailto:[^\s]+|\*\*[^*]+\*\*)/g);
	return parts.map((part) => {
		if (part.startsWith("http") || part.startsWith("mailto:")) {
			const isWhatsApp = part.includes("wa.me");
			return (
				<a
					key={part}
					href={part}
					target="_blank"
					rel="noopener noreferrer"
					className="underline font-medium"
					style={{ color: "var(--color-coral-glow-400)" }}
				>
					{isWhatsApp ? "Open WhatsApp" : "Send Email"}
				</a>
			);
		}

		if (part.startsWith("**") && part.endsWith("**")) {
			return <strong key={part}>{part.slice(2, -2)}</strong>;
		}

		return <span key={part}>{part.replaceAll("*", "")}</span>;
	});
}

function getMessageText(message: { parts: unknown[] }) {
	return message.parts
		.filter(isTextUIPart)
		.map((part) => part.text)
		.join("")
		.trim();
}

function cleanQuoteText(value: string) {
	return value.replace(/[.,;:]+$/g, "").trim();
}

function extractFirstMatch(transcript: string, patterns: RegExp[]) {
	for (const pattern of patterns) {
		const match = transcript.match(pattern)?.[1]?.trim();
		if (match) return cleanQuoteText(match);
	}

	return "";
}

function extractContactName(userTexts: string[], transcript: string) {
	const labelledName = extractFirstMatch(transcript, [
		/(?:name|nome)\s*(?:is|é|:)?\s*([A-Za-zÀ-ÿ' -]{2,60})/i,
	]);
	if (labelledName) return labelledName;

	const standaloneName = userTexts.find((text) =>
		/^[A-Za-zÀ-ÿ' -]{2,60}$/.test(text),
	);
	if (standaloneName) return standaloneName;

	return "";
}

function extractRentalDates(transcript: string) {
	const dateRange = transcript.match(
		/(?:dia\s*)?(\d{1,2})\s*(?:-|to|até|a)\s*(\d{1,2})\s*([A-Za-zÀ-ÿ]+)/i,
	);
	const pickupTime = transcript.match(/(\d{1,2}\s*(?:am|pm))\s*pickup/i)?.[1];
	const returnTime = transcript.match(/(\d{1,2}\s*(?:am|pm))\s*return/i)?.[1];

	if (!dateRange) {
		return {
			startDate: extractFirstMatch(transcript, [
				/(?:start|pickup|início|inicio)\s*(?:date|dia|:)?\s*([^\n,]+)/i,
			]),
			returnDate: extractFirstMatch(transcript, [
				/(?:return|end|fim|devolução|devolucao)\s*(?:date|dia|:)?\s*([^\n,]+)/i,
			]),
		};
	}

	const [, startDay, returnDay, month] = dateRange;
	return {
		startDate: cleanQuoteText(
			`${startDay} ${month}${pickupTime ? `, ${pickupTime}` : ""}`,
		),
		returnDate: cleanQuoteText(
			`${returnDay} ${month}${returnTime ? `, ${returnTime}` : ""}`,
		),
	};
}

function buildChatQuoteRequest(messages: { role: string; parts: unknown[] }[]) {
	const userTexts = messages
		.filter((message) => message.role === "user")
		.map(getMessageText)
		.filter(Boolean);
	const transcript = userTexts.join("\n");
	const email = transcript.match(/[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/)?.[0] ?? "";
	const phone =
		transcript.match(/(?:\+?\d[\d\s().-]{6,}\d)/)?.[0]?.trim() ?? "";

	if (!userTexts.length) return null;

	const vehicle =
		transcript.match(
			/Toyota Land Cruiser|Nissan Navara Single Cab|Nissan Navara Double Cab|Develon Loader SD300|Develon Excavator DX220|Scania Mining Truck/i,
		)?.[0] ??
		transcript.match(
			/\b(loader|excavator|truck|pickup|machinery|equipment)\b/i,
		)?.[0] ??
		"";
	const name = extractContactName(userTexts, transcript);
	const rentalDates = extractRentalDates(transcript);
	const projectUse =
		extractFirstMatch(transcript, [
			/(?:for|para)\s+([^\n,.]+?)(?:\s+from|\s+dia|\s+\d{1,2}\s*-|$)/i,
		]) || "";
	const location = extractFirstMatch(transcript, [
		/(?:delivery|pickup|local|location|entrega)\s*(?:in|at|em|:)?\s*([^\n,]+?)(?:\s+\d{1,2}\s*(?:am|pm)|$)/i,
	]);
	const hasRequiredQuoteDetails = Boolean(
		name &&
			email &&
			phone &&
			vehicle &&
			rentalDates.startDate &&
			rentalDates.returnDate &&
			location &&
			projectUse,
	);

	if (!hasRequiredQuoteDetails) return null;

	return {
		fleetRequest: vehicle,
		category: /loader|excavator|equipment|máquina|maquina/i.test(transcript)
			? "Heavy equipment"
			: "Vehicle",
		province: location,
		location,
		startDate: rentalDates.startDate,
		returnDate: rentalDates.returnDate,
		projectUse: `${projectUse}\n\nChatbot quote request details:\n${transcript}`,
		extras: [],
		companyName: "Provided via chatbot",
		nuit: "",
		sector: "Other",
		contactPerson: name,
		phone,
		email,
		address: "",
	} satisfies BookingRequest;
}

function buildTranscript(messages: { role: string; parts: unknown[] }[]) {
	return messages
		.map((message) => {
			const text = getMessageText(message);
			return text ? `${message.role}: ${text}` : "";
		})
		.filter(Boolean)
		.join("\n\n");
}

function hasEscalationIntent(messages: { role: string; parts: unknown[] }[]) {
	const transcript = buildTranscript(messages);
	return /\b(complaint|urgent|breakdown|broken|frustrated|angry|agent|human|support|can't help|cannot help|unable to help|can't answer|cannot answer|não consigo|nao consigo|reclamação|reclamacao|urgente|avaria|avariado|humano|suporte|atendimento)\b/i.test(
		transcript,
	);
}

function buildEscalationRequest(
	messages: { role: string; parts: unknown[] }[],
	language: Language,
) {
	if (!hasEscalationIntent(messages)) return null;

	const userTexts = messages
		.filter((message) => message.role === "user")
		.map(getMessageText)
		.filter(Boolean);
	const transcript = buildTranscript(messages);
	const userTranscript = userTexts.join("\n");
	const email =
		userTranscript.match(/[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/)?.[0] ?? "";
	const phone =
		userTranscript.match(/(?:\+?\d[\d\s().-]{6,}\d)/)?.[0]?.trim() ?? "";
	const name = extractContactName(userTexts, userTranscript);

	if (!name || !email || !phone) return null;

	return {
		name,
		email,
		phone,
		language,
		reason: "Chatbot support escalation",
		transcript,
	};
}

export function ChatWidget() {
	const [open, setOpen] = useState(false);
	const [language, setLanguage] = useState<Language>("en");
	const [input, setInput] = useState("");
	const [coolingDown, setCoolingDown] = useState(false);
	const [quoteStatus, setQuoteStatus] = useState<QuoteSubmitStatus>("idle");
	const [escalationStatus, setEscalationStatus] =
		useState<EscalationStatus>("idle");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const languageRef = useRef(language);
	const cooldownRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		languageRef.current = language;
	}, [language]);

	const transport = useMemo(
		() =>
			new DefaultChatTransport({
				api: "/api/chat",
				body: () => ({ language: languageRef.current }),
			}),
		[],
	);

	const { messages, sendMessage, status, setMessages, error } = useChat({
		transport,
	});

	const isLoading = status === "submitted" || status === "streaming";
	const sendDisabled = !input.trim() || isLoading || coolingDown;
	const quoteRequest = useMemo(
		() => buildChatQuoteRequest(messages),
		[messages],
	);
	const escalationNeeded = useMemo(
		() => hasEscalationIntent(messages),
		[messages],
	);
	const escalationRequest = useMemo(
		() => buildEscalationRequest(messages, language),
		[messages, language],
	);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	});

	useEffect(() => {
		return () => {
			if (cooldownRef.current) window.clearTimeout(cooldownRef.current);
		};
	}, []);

	const handleLanguageChange = (lang: Language) => {
		setLanguage(lang);
		setMessages([]);
		setQuoteStatus("idle");
		setEscalationStatus("idle");
	};

	const submitText = (text: string) => {
		const trimmed = text.trim().slice(0, MAX_INPUT_CHARS);
		if (!trimmed || isLoading || coolingDown) return;
		sendMessage({ text: trimmed });
		setInput("");
		if (quoteStatus === "error") setQuoteStatus("idle");
		if (escalationStatus === "error") setEscalationStatus("idle");
		setCoolingDown(true);
		cooldownRef.current = window.setTimeout(() => {
			setCoolingDown(false);
		}, SEND_COOLDOWN_MS);
	};

	const submitQuoteRequest = async () => {
		if (!quoteRequest || quoteStatus === "sending") return;
		setQuoteStatus("sending");

		try {
			const response = await fetch("/api/booking", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(quoteRequest),
			});

			if (!response.ok) throw new Error("Unable to send booking request");
			setQuoteStatus("success");
		} catch {
			setQuoteStatus("error");
		}
	};

	useEffect(() => {
		if (!escalationRequest || escalationStatus !== "idle") return;

		let cancelled = false;
		setEscalationStatus("sending");

		async function submitEscalation() {
			try {
				const response = await fetch("/api/chat-escalation", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(escalationRequest),
				});

				if (!response.ok) throw new Error("Unable to send support request");
				if (!cancelled) setEscalationStatus("success");
			} catch {
				if (!cancelled) setEscalationStatus("error");
			}
		}

		submitEscalation();

		return () => {
			cancelled = true;
		};
	}, [escalationRequest, escalationStatus]);

	const showQuickReplies = messages.length === 0;
	const showQuoteSubmit = quoteRequest && quoteStatus !== "success";
	const showEscalationMissing =
		escalationNeeded && !escalationRequest && escalationStatus !== "success";

	return (
		<div className="fixed inset-x-3 bottom-3 z-50 flex flex-col items-stretch gap-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end">
			{open && (
				<div
					className="w-full flex flex-col rounded-2xl overflow-hidden island-shell sm:w-[360px]"
					style={{ height: "min(520px, calc(100dvh - 100px))" }}
				>
					{/* Header */}
					<div
						className="flex items-center gap-3 px-4 py-3 flex-shrink-0 border-b"
						style={{ borderColor: "var(--line)" }}
					>
						<img src="/logo.webp" alt="CA HUB AUTO" className="h-7 w-auto" />
						<span className="flex-1" />

						{/* Language toggle */}
						<div
							className="flex rounded-lg overflow-hidden border text-xs"
							style={{ borderColor: "var(--border)" }}
						>
							{(["en", "pt"] as Language[]).map((lang) => (
								<button
									key={lang}
									type="button"
									onClick={() => handleLanguageChange(lang)}
									className="px-2.5 py-1 uppercase font-semibold transition-colors"
									style={
										language === lang
											? {
													background: "var(--color-coral-glow-500)",
													color: "#fff",
												}
											: {
													background: "transparent",
													color: "var(--muted-foreground)",
												}
									}
								>
									{lang}
								</button>
							))}
						</div>

						<button
							type="button"
							onClick={() => setOpen(false)}
							className="transition-colors ml-1"
							style={{ color: "var(--muted-foreground)" }}
							aria-label="Close chat"
						>
							<X size={16} />
						</button>
					</div>

					{/* Messages */}
					<div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
						{/* Welcome bubble */}
						<div className="flex justify-start">
							<div
								className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 text-sm border"
								style={{
									background: "var(--surface)",
									borderColor: "var(--line)",
									color: "var(--foreground)",
								}}
							>
								{WELCOME[language]}
							</div>
						</div>

						{/* Quick reply chips */}
						{showQuickReplies && (
							<div className="flex flex-wrap gap-2">
								{QUICK_REPLIES[language].map((reply) => (
									<button
										key={reply}
										type="button"
										disabled={isLoading || coolingDown}
										onClick={() => submitText(reply)}
										className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
										style={{
											borderColor: "var(--color-coral-glow-500)",
											color: "var(--color-coral-glow-500)",
											background: "transparent",
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background =
												"var(--color-coral-glow-900)";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = "transparent";
										}}
									>
										{reply}
									</button>
								))}
							</div>
						)}

						{/* Messages */}
						{messages.map((msg) => {
							const text = msg.parts
								.filter(isTextUIPart)
								.map((p) => p.text)
								.join("");
							if (!text) return null;
							return (
								<div
									key={msg.id}
									className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
											msg.role === "user"
												? "rounded-tr-none"
												: "rounded-tl-none border"
										}`}
										style={
											msg.role === "user"
												? {
														background: "var(--color-coral-glow-500)",
														color: "#fff",
													}
												: {
														background: "var(--surface)",
														borderColor: "var(--line)",
														color: "var(--foreground)",
													}
										}
									>
										<MessageContent content={text} />
									</div>
								</div>
							);
						})}

						{/* Loading indicator */}
						{isLoading && (
							<div className="flex justify-start">
								<div
									className="rounded-2xl rounded-tl-none px-4 py-3 border"
									style={{
										background: "var(--surface)",
										borderColor: "var(--line)",
									}}
								>
									<Loader2
										size={14}
										className="animate-spin"
										style={{ color: "var(--muted-foreground)" }}
									/>
								</div>
							</div>
						)}

						{error && (
							<div className="flex justify-start">
								<div
									className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 text-sm border"
									style={{
										background: "var(--surface)",
										borderColor: "var(--color-coral-glow-500)",
										color: "var(--foreground)",
									}}
								>
									{ERROR_MESSAGE[language]}
								</div>
							</div>
						)}

						{showEscalationMissing && (
							<div className="flex justify-start">
								<div
									className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 text-sm border"
									style={{
										background: "var(--surface)",
										borderColor: "var(--line)",
										color: "var(--foreground)",
									}}
								>
									{ESCALATION_STATUS[language].missing}
								</div>
							</div>
						)}

						{escalationStatus === "sending" && (
							<div className="flex justify-start">
								<div
									className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 text-sm border"
									style={{
										background: "var(--surface)",
										borderColor: "var(--line)",
										color: "var(--foreground)",
									}}
								>
									{ESCALATION_STATUS[language].sending}
								</div>
							</div>
						)}

						{(escalationStatus === "success" ||
							escalationStatus === "error") && (
							<div className="flex justify-start">
								<div
									className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 text-sm border"
									style={{
										background: "var(--surface)",
										borderColor: "var(--color-coral-glow-500)",
										color: "var(--foreground)",
									}}
								>
									{escalationStatus === "success"
										? ESCALATION_STATUS[language].success
										: ESCALATION_STATUS[language].error}
								</div>
							</div>
						)}

						{showQuoteSubmit && (
							<div className="flex justify-start">
								<div
									className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 text-sm border space-y-2"
									style={{
										background: "var(--surface)",
										borderColor: "var(--line)",
										color: "var(--foreground)",
									}}
								>
									<p>{QUOTE_STATUS[language].ready}</p>
									<button
										type="button"
										disabled={quoteStatus === "sending"}
										onClick={submitQuoteRequest}
										className="rounded-full px-3 py-1.5 text-xs font-semibold transition-opacity disabled:opacity-60"
										style={{
											background: "var(--color-coral-glow-500)",
											color: "#fff",
										}}
									>
										{quoteStatus === "sending"
											? QUOTE_STATUS[language].sending
											: QUOTE_STATUS[language].send}
									</button>
									{quoteStatus === "error" && (
										<p style={{ color: "var(--color-coral-glow-500)" }}>
											{QUOTE_STATUS[language].error}
										</p>
									)}
								</div>
							</div>
						)}

						{quoteStatus === "success" && (
							<div className="flex justify-start">
								<div
									className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 text-sm border"
									style={{
										background: "var(--surface)",
										borderColor: "var(--color-coral-glow-500)",
										color: "var(--foreground)",
									}}
								>
									{QUOTE_STATUS[language].success}
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							submitText(input);
						}}
						className="flex items-center gap-2 px-4 py-3 flex-shrink-0 border-t"
						style={{ borderColor: "var(--line)" }}
					>
						<input
							value={input}
							onChange={(e) =>
								setInput(e.target.value.slice(0, MAX_INPUT_CHARS))
							}
							maxLength={MAX_INPUT_CHARS}
							placeholder={
								language === "en" ? "Type a message…" : "Escreva uma mensagem…"
							}
							className="flex-1 text-sm rounded-xl px-4 py-2.5 outline-none min-w-0 transition-colors border"
							style={{
								background: "var(--background)",
								color: "var(--foreground)",
								borderColor: "var(--border)",
							}}
							onFocus={(e) => {
								e.currentTarget.style.borderColor =
									"var(--color-coral-glow-500)";
								e.currentTarget.style.boxShadow =
									"0 0 0 3px color-mix(in oklab, var(--color-coral-glow-500) 20%, transparent)";
							}}
							onBlur={(e) => {
								e.currentTarget.style.borderColor = "var(--border)";
								e.currentTarget.style.boxShadow = "none";
							}}
						/>
						<button
							type="submit"
							disabled={sendDisabled}
							className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
							style={{
								background: "var(--color-coral-glow-500)",
								color: "#fff",
							}}
							aria-label="Send"
						>
							<Send size={14} />
						</button>
					</form>
				</div>
			)}

			{/* FAB */}
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center self-end transition-all hover:scale-105 active:scale-95"
				style={{ background: "var(--color-coral-glow-500)", color: "#fff" }}
				aria-label={open ? "Close chat" : "Open chat"}
			>
				{open ? <X size={22} /> : <MessageCircle size={22} />}
			</button>
		</div>
	);
}
