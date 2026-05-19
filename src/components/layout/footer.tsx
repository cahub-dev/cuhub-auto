import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { SALES_CONTACT } from "#/lib/contact-details";

const FOOTER_LINKS = [
	{ label: "Home", to: "/" },
	{ label: "Fleet", to: "/fleet" },
	{ label: "About", to: "/about" },
	{ label: "Contact", to: "/contact" },
] as const;

export function Footer(): React.JSX.Element {
	return (
		<footer className="bg-[#171717] px-5 py-14 text-white md:py-18">
			<div className="page-wrap">
				<div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1.4fr] lg:gap-16">
					<div>
						<img
							src="/logo.webp"
							alt="CA HUB AUTO"
							className="mb-6 h-12 w-auto rounded-sm bg-white"
						/>
						<p className="max-w-sm text-sm leading-6 text-white/70">
							Vehicle and heavy equipment rental support for professional
							operations across Mozambique.
						</p>
					</div>

					<nav aria-label="Footer navigation">
						<h2 className="mb-5 text-sm font-semibold text-white/65">
							Quick Links
						</h2>
						<div className="flex flex-col gap-3 text-sm font-semibold">
							{FOOTER_LINKS.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className="!text-white no-underline hover:!text-primary"
								>
									{link.label}
								</Link>
							))}
						</div>
					</nav>

					<div>
						<h2 className="mb-5 text-sm font-semibold text-white/65">
							Contact
						</h2>
						<div className="flex flex-col gap-4 text-sm font-semibold text-white">
							<p className="flex items-start gap-3 leading-6">
								<MapPin
									className="mt-1 size-4 shrink-0 text-primary"
									aria-hidden="true"
								/>
								<span>
									Moçambique, Cidade de Maputo, Distrito de Kamavota, Costa do
									Sol, Rua de Micaia, Q.56, nº115
								</span>
							</p>
							<a
								href={`tel:${SALES_CONTACT.phoneE164}`}
								className="flex items-center gap-3 !text-white no-underline hover:!text-primary"
							>
								<Phone className="size-4 text-primary" aria-hidden="true" />
								{SALES_CONTACT.name} – {SALES_CONTACT.phoneDisplay}
							</a>
							<a
								href={`mailto:${SALES_CONTACT.email}`}
								className="flex items-center gap-3 !text-white no-underline hover:!text-primary"
							>
								<Mail className="size-4 text-primary" aria-hidden="true" />
								{SALES_CONTACT.email}
							</a>
						</div>
						<div className="mt-8 flex items-center gap-4">
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Follow CA HUB AUTO on Instagram"
								className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 !text-white transition-colors hover:border-primary hover:!text-primary"
							>
								<Instagram className="size-5" aria-hidden="true" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Follow CA HUB AUTO on LinkedIn"
								className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 !text-white transition-colors hover:border-primary hover:!text-primary"
							>
								<Linkedin className="size-5" aria-hidden="true" />
							</a>
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/55">
					&copy; {new Date().getFullYear()} CA HUB AUTO. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
