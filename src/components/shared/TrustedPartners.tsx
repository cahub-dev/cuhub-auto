import type React from "react";
import {
	type Client,
	ClientLogoCard,
} from "#/components/shared/ClientLogoCard";

const PARTNERS: Client[] = [
	{
		id: "first-capital",
		name: "First Capital",
		logo: "/clients/First Capital.webp",
	},
	{ id: "millenium", name: "Millenium", logo: "/clients/millenium.webp" },
	{ id: "motorcare", name: "Motorcare", logo: "/clients/motorcare.webp" },
	{ id: "movitel", name: "Movitel", logo: "/clients/movitel.webp" },
	{ id: "tecnel", name: "Tecnel", logo: "/clients/tecnel.webp" },
	{ id: "thl", name: "THL", logo: "/clients/thl.webp" },
	{ id: "toyota", name: "Toyota", logo: "/clients/toyota.webp" },
];

export function TrustedPartners(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24">
			<div className="page-wrap">
				{/* Header row */}
				<div className=" flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
					<div className="flex flex-col">
						<span className="island-kicker inline-block self-start mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
							PARTNERS
						</span>
						<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight">
							Our Trusted Partners
						</h2>
					</div>
				</div>

				{/* Grid */}
				<div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6">
					{PARTNERS.map((client) => (
						<ClientLogoCard key={client.id} client={client} />
					))}
				</div>
			</div>
		</section>
	);
}
