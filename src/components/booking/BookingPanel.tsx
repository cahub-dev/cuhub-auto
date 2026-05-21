"use client";

"use client";

import { Car } from "lucide-react";
import type React from "react";
import { BookingSearchForm } from "#/components/booking/BookingSearchForm";
import { useI18n } from "#/lib/i18n";

export function BookingPanel(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<div className="booking-card">
			<div className="booking-card-header">
				<Car className="booking-card-header-icon" aria-hidden="true" />
				<h2>{t.bookingPanel.title}</h2>
				<span>{t.bookingPanel.subtitle}</span>
			</div>
			<div className="booking-card-body">
				<BookingSearchForm />
			</div>
		</div>
	);
}
