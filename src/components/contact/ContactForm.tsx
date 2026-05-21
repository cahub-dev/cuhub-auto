"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { SALES_CONTACT } from "#/lib/contact-details";
import { useI18n } from "#/lib/i18n";

const CONTACT_EMAIL = SALES_CONTACT.email;

export function ContactForm(): React.JSX.Element {
	const { t } = useI18n();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		const body = [
			t.contact.mailIntro,
			"",
			`Name: ${name}`,
			`Email: ${email}`,
			`Phone: ${phone || t.contact.notProvided}`,
			"",
			t.contact.messageLabel,
			message,
		].join("\n");

		window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(body)}`;
	}

	return (
		<section className="pb-20 md:pb-28">
			<div className="page-wrap">
				<div className=" mb-10 text-center">
					<span className="island-kicker inline-block rounded-full bg-accent px-3 py-1 text-primary">
						{t.contact.formKicker}
					</span>
					<h2 className="display-title mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
						{t.contact.formTitle}
					</h2>
				</div>

				<form onSubmit={handleSubmit} className=" mx-auto max-w-3xl space-y-5">
					<div className="grid gap-5 md:grid-cols-2">
						<Input
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder={t.contact.namePlaceholder}
							required
							className="h-12 border-border/70 bg-white shadow-none"
						/>
						<Input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder={t.contact.emailPlaceholder}
							required
							className="h-12 border-border/70 bg-white shadow-none"
						/>
					</div>
					<Input
						type="tel"
						value={phone}
						onChange={(event) => setPhone(event.target.value)}
						placeholder={t.contact.phonePlaceholder}
						className="h-12 border-border/70 bg-white shadow-none"
					/>
					<Textarea
						value={message}
						onChange={(event) => setMessage(event.target.value)}
						placeholder={t.contact.messagePlaceholder}
						required
						className="min-h-44 resize-none border-border/70 bg-white shadow-none"
					/>
					<div className="flex justify-center pt-3">
						<Button
							type="submit"
							className="h-12 rounded-lg px-10 font-semibold"
						>
							{t.contact.sendMessage}
						</Button>
					</div>
				</form>
			</div>
		</section>
	);
}
