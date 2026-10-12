"use client";

import type React from "react";
import { COMPANY_ADDRESS } from "#/lib/contact-details";
import { useI18n } from "#/lib/i18n";

const MAP_QUERY = encodeURIComponent(COMPANY_ADDRESS.mapQuery);

/** Full-width greyscale map, as on the Backhoe contact page. */
export function ContactMap(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section aria-label={t.contact.mapTitle}>
			<iframe
				title={t.contact.mapTitle}
				src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
				className="block h-[360px] w-full border-0 grayscale md:h-[420px]"
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			/>
		</section>
	);
}
