import type React from "react";

export interface Client {
	id: string;
	name: string;
	logo: string;
}

export function ClientLogoCard({
	client,
}: {
	client: Client;
}): React.JSX.Element {
	return (
		<div className="motion-card flex items-center justify-center p-6 bg-white rounded-lg border border-border/30">
			<img
				src={client.logo}
				alt={client.name}
				className="w-full h-12 md:h-16 object-contain"
				loading="lazy"
			/>
		</div>
	);
}
