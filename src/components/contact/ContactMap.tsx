import type React from "react";

const MAP_QUERY = encodeURIComponent(
	"Costa do Sol Rua de Micaia Q.56 Maputo Mozambique",
);

export function ContactMap(): React.JSX.Element {
	return (
		<section className="pb-16 md:pb-24">
			<div className="page-wrap">
				<div className="overflow-hidden rounded-2xl border border-border/50 bg-white">
					<iframe
						title="CA HUB AUTO location map"
						src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
						className="h-[340px] w-full border-0 md:h-[520px]"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
			</div>
		</section>
	);
}
