"use client";

import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Mail, MapPin, Smartphone } from "lucide-react";
import type React from "react";
import { EQUIPMENT_CATEGORIES } from "#/data/equipment";
import {
	BUSINESS_HOURS,
	COMPANY_ADDRESS,
	SALES_CONTACT,
} from "#/lib/contact-details";
import { useI18n } from "#/lib/i18n";

const FOOTER_LINKS = [
	{ key: "home", to: "/" },
	{ key: "fleet", to: "/fleet" },
	{ key: "about", to: "/about" },
	{ key: "contact", to: "/contact" },
] as const;

export function Footer(): React.JSX.Element {
	const { language, t } = useI18n();

	return (
		<footer className="bg-black text-white">
			<div className="page-wrap grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[1.15fr_0.8fr_1.1fr_1.1fr]">
				<div>
					<FooterHeading>{t.footer.aboutCompany}</FooterHeading>
					<img
						src="/logo-light.webp"
						alt="CA HUB AUTO"
						className="h-11 w-auto"
					/>
					<p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
						{t.footer.description}
					</p>
				</div>

				<nav aria-label={t.footer.information}>
					<FooterHeading>{t.footer.information}</FooterHeading>
					<ul className="space-y-3 text-sm">
						{FOOTER_LINKS.map((link) => (
							<li key={link.to}>
								<Link
									to={link.to}
									className="inline-flex items-center gap-2 text-white/75 no-underline hover:text-primary"
								>
									<ChevronRight className="size-3.5" aria-hidden="true" />
									{t.nav[link.key]}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div>
					<FooterHeading>{t.footer.contactInfo}</FooterHeading>
					<ul className="space-y-4 text-sm leading-6 text-white/75">
						<li className="flex gap-3">
							<MapPin
								className="mt-0.5 size-5 shrink-0 text-primary"
								aria-hidden="true"
							/>
							<span>
								{t.footer.address}: {COMPANY_ADDRESS.lines.join(", ")}
							</span>
						</li>
						<li className="flex gap-3">
							<Smartphone
								className="mt-0.5 size-5 shrink-0 text-primary"
								aria-hidden="true"
							/>
							<a
								href={`tel:${SALES_CONTACT.phoneE164}`}
								className="text-white/75 no-underline hover:text-primary"
							>
								{t.footer.support}: {SALES_CONTACT.name} –{" "}
								{SALES_CONTACT.phoneDisplay}
							</a>
						</li>
						<li className="flex gap-3">
							<Clock
								className="mt-0.5 size-5 shrink-0 text-primary"
								aria-hidden="true"
							/>
							<span>
								{t.footer.workingTime}: {BUSINESS_HOURS[language]}
							</span>
						</li>
						<li className="flex gap-3">
							<Mail
								className="mt-0.5 size-5 shrink-0 text-primary"
								aria-hidden="true"
							/>
							<span>
								{t.footer.emailLabel}:
								<br />
								<a
									href={`mailto:${SALES_CONTACT.email}`}
									className="text-primary no-underline hover:underline"
								>
									{SALES_CONTACT.email}
								</a>
							</span>
						</li>
					</ul>
				</div>

				<nav aria-label={t.footer.equipment}>
					<FooterHeading>{t.footer.equipment}</FooterHeading>
					<ul className="text-sm">
						{EQUIPMENT_CATEGORIES.slice(0, 6).map((category) => (
							<li
								key={category.id}
								className="border-b border-dashed border-white/15 py-2.5 first:pt-0"
							>
								<Link
									to="/fleet"
									search={{ category: category.id }}
									className="font-semibold text-white/80 no-underline hover:text-primary"
								>
									{category.name[language]}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>

			<p className="pb-8 text-center text-sm text-white">
				&copy; {new Date().getFullYear()} CA HUB AUTO. {t.footer.rights}
			</p>
		</footer>
	);
}

function FooterHeading({
	children,
}: {
	children: React.ReactNode;
}): React.JSX.Element {
	return (
		<h2 className="display-title mb-6 text-2xl font-bold text-white">
			{children}
		</h2>
	);
}
