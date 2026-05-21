import { Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { SALES_CONTACT } from "#/lib/contact-details";

const CONTACT_CARDS = [
	{
		title: "Our Location",
		icon: MapPin,
		lines: [
			"Moçambique, Cidade de Maputo",
			"Distrito de Kamavota, Costa do Sol",
			"Rua de Micaia, Q.56, nº115",
		],
	},
	{
		title: "Email Address",
		icon: Mail,
		lines: [SALES_CONTACT.email],
	},
	{
		title: "Phone Number",
		icon: Phone,
		lines: [`${SALES_CONTACT.name} – ${SALES_CONTACT.phoneDisplay}`],
	},
] as const;

export function ContactInfoCards(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24">
			<div className="page-wrap">
				<div className=" mb-14 text-center">
					<span className="island-kicker inline-block rounded-full bg-accent px-3 py-1 text-primary">
						Contact Details
					</span>
					<h2 className="display-title mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
						Contact Information
					</h2>
				</div>

				<div className=" grid gap-6 md:grid-cols-3">
					{CONTACT_CARDS.map((card) => {
						const Icon = card.icon;

						return (
							<div
								key={card.title}
								className=" relative rounded-2xl bg-white px-6 pb-8 pt-16 text-center shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
							>
								<div className="absolute left-1/2 top-0 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-primary text-white">
									<Icon className="size-9" aria-hidden="true" />
								</div>
								<h3 className="display-title mb-4 text-xl font-bold text-foreground">
									{card.title}
								</h3>
								<div className="space-y-1 text-sm leading-6 text-muted-foreground">
									{card.lines.map((line) => (
										<p key={line}>{line}</p>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
