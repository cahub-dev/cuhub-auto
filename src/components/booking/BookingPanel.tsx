"use client";

import { Car } from "lucide-react";
import type React from "react";
import { BookingSearchForm } from "#/components/booking/BookingSearchForm";

export function BookingPanel(): React.JSX.Element {
	return (
		<div className="booking-card">
			<div className="booking-card-header">
				<Car className="booking-card-header-icon" aria-hidden="true" />
				<h2>Book Your Vehicle</h2>
				<span>Fast · Flexible · Reliable</span>
			</div>
			<div className="booking-card-body">
				<BookingSearchForm />
			</div>
		</div>
	);
}
