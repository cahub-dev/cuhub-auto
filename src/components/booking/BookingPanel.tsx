import { Car } from "lucide-react";
import type React from "react";
import { useState } from "react";
import {
	type BookingCategory,
	BookingCategoryTabs,
} from "#/components/booking/BookingCategoryTabs";
import { BookingSearchForm } from "#/components/booking/BookingSearchForm";

export function BookingPanel(): React.JSX.Element {
	const [category, setCategory] = useState<BookingCategory>("cars");

	return (
		<div className="booking-card">
			<div className="booking-card-header">
				<Car className="booking-card-header-icon" aria-hidden="true" />
				<h2>Book Your Vehicle</h2>
				<span>Fast · Flexible · Reliable</span>
			</div>
			<div className="booking-card-body">
				<BookingCategoryTabs value={category} onChange={setCategory} />
				<BookingSearchForm category={category} />
			</div>
		</div>
	);
}
