import { DefaultChatTransport, isTextUIPart } from "ai";
import { useChat } from "@ai-sdk/react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Language = "en" | "pt";

const QUICK_REPLIES: Record<Language, string[]> = {
	en: ["View fleet", "Get a quote", "Service areas", "Contact us"],
	pt: ["Ver frota", "Obter cotação", "Áreas de serviço", "Contacte-nos"],
};

const WELCOME: Record<Language, string> = {
	en: "Hello! I'm the CA HUB AUTO assistant. How can I help you today?",
	pt: "Olá! Sou o assistente da CA HUB AUTO. Como posso ajudá-lo hoje?",
};

function MessageContent({ content }: { content: string }) {
	const lines = content.split("\n");
	return (
		<div className="space-y-1.5 break-words">
			{lines.map((line, i) => {
				const trimmed = line.trim();
				if (!trimmed) return <div key={i} className="h-1" />;

				const heading = trimmed.match(/^#{1,3}\s+(.+)$/);
				if (heading) {
					return (
						<div key={i} className="font-semibold mt-2 first:mt-0">
							<InlineMarkdown text={heading[1]} />
						</div>
					);
				}

				const bullet = trimmed.match(/^(?:[-*]|\d+\.)\s+(.+)$/);
				if (bullet) {
					return (
						<div key={i} className="flex gap-2">
							<span aria-hidden="true">•</span>
							<span>
								<InlineMarkdown text={bullet[1]} />
							</span>
						</div>
					);
				}

				return (
					<div key={i}>
						<InlineMarkdown text={trimmed} />
					</div>
				);
			})}
		</div>
	);
}

function InlineMarkdown({ text }: { text: string }) {
	const parts = text.split(/(https?:\/\/[^\s]+|mailto:[^\s]+|\*\*[^*]+\*\*)/g);
	return parts.map((part, i) => {
		if (part.startsWith("http") || part.startsWith("mailto:")) {
			const isWhatsApp = part.includes("wa.me");
			return (
				<a
					key={i}
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
			return <strong key={i}>{part.slice(2, -2)}</strong>;
		}

		return <span key={i}>{part.replaceAll("*", "")}</span>;
	});
}

export function ChatWidget() {
	const [open, setOpen] = useState(false);
	const [language, setLanguage] = useState<Language>("en");
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const languageRef = useRef(language);

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

	const { messages, sendMessage, status, setMessages } = useChat({ transport });

	const isLoading = status === "submitted" || status === "streaming";

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleLanguageChange = (lang: Language) => {
		setLanguage(lang);
		setMessages([]);
	};

	const submitText = (text: string) => {
		if (!text.trim() || isLoading) return;
		sendMessage({ text: text.trim() });
		setInput("");
	};

	const showQuickReplies = messages.length === 0;

	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
			{open && (
				<div
					className="w-[360px] flex flex-col rounded-2xl overflow-hidden island-shell"
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
										onClick={() => submitText(reply)}
										className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
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
											msg.role === "user" ? "rounded-tr-none" : "rounded-tl-none border"
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
							onChange={(e) => setInput(e.target.value)}
							placeholder={language === "en" ? "Type a message…" : "Escreva uma mensagem…"}
							className="flex-1 text-sm rounded-xl px-4 py-2.5 outline-none min-w-0 transition-colors border"
							style={{
								background: "var(--background)",
								color: "var(--foreground)",
								borderColor: "var(--border)",
							}}
							onFocus={(e) => {
								e.currentTarget.style.borderColor = "var(--color-coral-glow-500)";
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
							disabled={!input.trim() || isLoading}
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
				className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
				style={{ background: "var(--color-coral-glow-500)", color: "#fff" }}
				aria-label={open ? "Close chat" : "Open chat"}
			>
				{open ? <X size={22} /> : <MessageCircle size={22} />}
			</button>
		</div>
	);
}
