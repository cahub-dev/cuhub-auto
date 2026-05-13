"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";

const CONTACT_EMAIL = "cahubauto@gmail.com";

export function ContactForm(): React.JSX.Element {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		const body = [
			"Website contact inquiry",
			"",
			`Name: ${name}`,
			`Email: ${email}`,
			`Phone: ${phone || "Not provided"}`,
			"",
			"Message:",
			message,
		].join("\n");

		window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website contact inquiry")}&body=${encodeURIComponent(body)}`;
	}

	return (
		<section className="pb-20 md:pb-28">
			<div className="page-wrap">
				<div className="motion-scroll-reveal mb-10 text-center">
					<span className="island-kicker inline-block rounded-full bg-accent px-3 py-1 text-primary">
						Get In Touch
					</span>
					<h2 className="display-title mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
						Send A Message
					</h2>
				</div>

				<form
					onSubmit={handleSubmit}
					className="motion-scroll-reveal mx-auto max-w-3xl space-y-5"
				>
					<div className="grid gap-5 md:grid-cols-2">
						<Input
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Your Name"
							required
							className="h-12 border-border/70 bg-white shadow-none"
						/>
						<Input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder="Your email"
							required
							className="h-12 border-border/70 bg-white shadow-none"
						/>
					</div>
					<Input
						type="tel"
						value={phone}
						onChange={(event) => setPhone(event.target.value)}
						placeholder="Phone number"
						className="h-12 border-border/70 bg-white shadow-none"
					/>
					<Textarea
						value={message}
						onChange={(event) => setMessage(event.target.value)}
						placeholder="Type message"
						required
						className="min-h-44 resize-none border-border/70 bg-white shadow-none"
					/>
					<div className="flex justify-center pt-3">
						<Button
							type="submit"
							className="h-12 rounded-lg px-10 font-semibold"
						>
							Send Message
						</Button>
					</div>
				</form>
			</div>
		</section>
	);
}
