import type React from "react";

const PARTNERS = [
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

/** Backhoe-style grey strip of client logos. */
export function TrustedPartners(): React.JSX.Element {
	return (
		<section className="bg-[#f7f7f7] py-8" aria-label="Clients">
			<ul className="page-wrap grid grid-cols-3 items-center gap-6 sm:grid-cols-4 lg:grid-cols-7">
				{PARTNERS.map((client) => (
					<li key={client.id} className="flex h-14 items-center justify-center">
						<img
							src={client.logo}
							alt={client.name}
							loading="lazy"
							className="max-h-12 max-w-[120px] object-contain mix-blend-multiply grayscale transition hover:grayscale-0"
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
