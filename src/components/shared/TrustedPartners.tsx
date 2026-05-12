import { Link } from "@tanstack/react-router";
import type React from "react";
import {
	type Client,
	ClientLogoCard,
} from "#/components/shared/ClientLogoCard";
import { Button } from "#/components/ui/button";

const PARTNERS: Client[] = [
	{
		id: "first-capital",
		name: "First Capital",
		logo: "/clients/First Capital.png",
	},
	{ id: "millenium", name: "Millenium", logo: "/clients/millenium.png" },
	{ id: "motorcare", name: "Motorcare", logo: "/clients/motorcare.png" },
	{ id: "movitel", name: "Movitel", logo: "/clients/movitel.png" },
	{ id: "tecnel", name: "Tecnel", logo: "/clients/tecnel.png" },
	{ id: "thl", name: "THL", logo: "/clients/thl.png" },
	{ id: "toyota", name: "Toyota", logo: "/clients/toyota.png" },
];

export function TrustedPartners(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24">
			<div className="page-wrap">
				{/* Header row */}
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
					<div className="flex flex-col">
						<span className="island-kicker inline-block self-start mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
							PARTNERS
						</span>
						<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight">
							Our Trusted Partners
						</h2>
					</div>
					<Link to="/partners" className="no-underline">
						<Button
							variant="outline"
							className="h-10 px-6 font-medium text-sm rounded-lg cursor-pointer self-start"
						>
							Show all Partners
						</Button>
					</Link>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6">
					{PARTNERS.map((client) => (
						<ClientLogoCard key={client.id} client={client} />
					))}
				</div>
			</div>
		</section>
	);
}
