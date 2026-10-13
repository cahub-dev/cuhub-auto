"use client";

import { Mail, MapPin, Smartphone } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { COMPANY_ADDRESS, SALES_CONTACT } from "#/lib/contact-details";
import { useI18n } from "#/lib/i18n";
import { Reveal } from "#/lib/motion";
import { cn } from "#/lib/utils";

/** Contact details with an icon, used on Contact and Request-a-quote pages. */
export function ContactItems({
	layout = "column",
}: {
	layout?: "column" | "row";
}): React.JSX.Element {
	const { t } = useI18n();
	const items = [
		{
			icon: Mail,
			label: t.contact.email,
			value: SALES_CONTACT.email,
			href: `mailto:${SALES_CONTACT.email}`,
		},
		{
			icon: Smartphone,
			label: t.contact.phone,
			value: `${SALES_CONTACT.phoneDisplay} – ${SALES_CONTACT.name}`,
			href: `tel:${SALES_CONTACT.phoneE164}`,
		},
		{
			icon: MapPin,
			label: t.contact.addressLabel,
			value: COMPANY_ADDRESS.lines.join(", "),
		},
	];

	return (
		<ul
			className={cn(
				"grid gap-8",
				layout === "row" ? "md:grid-cols-3" : "max-w-sm",
			)}
		>
			{items.map((item) => {
				const Icon = item.icon;
				return (
					<li key={item.label} className="flex items-start gap-4">
						<span className="relative shrink-0">
							<Icon
								className="size-10 text-[#313131]"
								strokeWidth={1.25}
								aria-hidden="true"
							/>
							<span
								className="absolute -right-1 top-0 size-3 rounded-full bg-primary"
								aria-hidden="true"
							/>
						</span>
						<span className="text-sm leading-6 text-[#202020]">
							<strong className="display-title block text-base font-bold uppercase text-[#313131]">
								{item.label}
							</strong>
							{item.href ? (
								<a
									href={item.href}
									className="text-[#202020] no-underline hover:text-primary"
								>
									{item.value}
								</a>
							) : (
								item.value
							)}
						</span>
					</li>
				);
			})}
		</ul>
	);
}

export function ContactSection(): React.JSX.Element {
	const { t } = useI18n();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [subject, setSubject] = useState("");
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
		const mailSubject = subject.trim() || t.contact.mailSubject;
		window.location.href = `mailto:${SALES_CONTACT.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
	}

	return (
		<section className="py-20 md:py-28">
			<div className="page-wrap grid items-start gap-14 lg:grid-cols-2">
				<Reveal variant="left" className="lg:pl-10">
					<SectionHeading
						ghost={t.contact.ghost}
						title={t.contact.getInTouch}
					/>
					<p className="mt-8 max-w-md text-[15px] leading-7 text-[#202020]">
						{t.contact.intro}
					</p>
					<div className="mt-12">
						<ContactItems />
					</div>
				</Reveal>

				<Reveal variant="right" delay={120}>
					<form
						onSubmit={handleSubmit}
						className="shadow-card grid gap-5 p-6 md:p-10"
					>
						<input
							className="bh-input"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder={t.contact.namePlaceholder}
							aria-label={t.contact.namePlaceholder}
							required
						/>
						<input
							type="email"
							className="bh-input"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder={t.contact.emailPlaceholder}
							aria-label={t.contact.emailPlaceholder}
							required
						/>
						<input
							type="tel"
							className="bh-input"
							value={phone}
							onChange={(event) => setPhone(event.target.value)}
							placeholder={t.contact.phonePlaceholder}
							aria-label={t.contact.phonePlaceholder}
						/>
						<input
							className="bh-input"
							value={subject}
							onChange={(event) => setSubject(event.target.value)}
							placeholder={t.contact.subjectPlaceholder}
							aria-label={t.contact.subjectPlaceholder}
						/>
						<textarea
							className="bh-input"
							value={message}
							onChange={(event) => setMessage(event.target.value)}
							placeholder={t.contact.messagePlaceholder}
							aria-label={t.contact.messagePlaceholder}
							required
						/>
						<button type="submit" className="bh-button-dark mt-2 w-full">
							{t.contact.sendMessage}
						</button>
					</form>
				</Reveal>
			</div>
		</section>
	);
}
