"use client";

import { Plus, X } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { BookingContactDialog } from "#/components/booking/BookingContactDialog";
import { BOOKING_CATEGORIES } from "#/components/booking/booking-request-options";
import { DateTimeField } from "#/components/booking/DateTimeField";
import { LOCATIONS, LocationField } from "#/components/booking/LocationField";
import { Button } from "#/components/ui/button";
import { useI18n } from "#/lib/i18n";

function startOfToday(): Date {
	const d = new Date();
	d.setHours(0, 0, 0, 0);
	return d;
}

function addDays(date: Date, days: number): Date {
	const d = new Date(date);
	d.setDate(d.getDate() + days);
	return d;
}

export function BookingSearchForm(): React.JSX.Element {
	const { t } = useI18n();
	const [category, setCategory] = useState<string>(BOOKING_CATEGORIES[0]);
	const [pickupLocation, setPickupLocation] = useState<string>(LOCATIONS[0]);
	const [returnLocation, setReturnLocation] = useState<string>(LOCATIONS[0]);
	const [hasDifferentReturn, setHasDifferentReturn] = useState(false);
	const [pickupDate, setPickupDate] = useState<Date>(() => startOfToday());
	const [pickupTime, setPickupTime] = useState("10:00");
	const [returnDate, setReturnDate] = useState<Date>(() =>
		addDays(startOfToday(), 4),
	);
	const [returnTime, setReturnTime] = useState("10:00");
	const [dialogOpen, setDialogOpen] = useState(false);

	const minReturnDate = useMemo(() => addDays(pickupDate, 1), [pickupDate]);

	function handlePickupDate(d: Date): void {
		setPickupDate(d);
		if (d >= returnDate) setReturnDate(addDays(d, 1));
	}

	const booking = {
		categoryLabel: category.toLowerCase(),
		pickupLocation,
		returnLocation: hasDifferentReturn ? returnLocation : pickupLocation,
		pickupDate,
		pickupTime,
		returnDate,
		returnTime,
	};

	return (
		<>
			<div className="booking-form motion-fade-in">
				<div className="booking-field">
					<label htmlFor="vehicle-category" className="booking-field-label">
						{t.bookingSearch.vehicleType}
					</label>
					<div className="booking-field-control">
						<select
							id="vehicle-category"
							className="booking-select"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							{BOOKING_CATEGORIES.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="booking-form-locations">
					<LocationField
						id="pickup-location"
						label={t.bookingSearch.pickupReturn}
						value={pickupLocation}
						onChange={setPickupLocation}
					/>
					{hasDifferentReturn && (
						<LocationField
							id="return-location"
							label={t.bookingSearch.returnLocation}
							value={returnLocation}
							onChange={setReturnLocation}
						/>
					)}

					<button
						type="button"
						className="booking-toggle-link"
						onClick={() => setHasDifferentReturn(!hasDifferentReturn)}
					>
						{hasDifferentReturn ? (
							<>
								<X className="size-3.5" aria-hidden="true" />
								{t.bookingSearch.sameReturn}
							</>
						) : (
							<>
								<Plus className="size-3.5" aria-hidden="true" />
								{t.bookingSearch.differentReturn}
							</>
						)}
					</button>
				</div>

				<DateTimeField
					label={t.bookingSearch.pickupDate}
					date={pickupDate}
					time={pickupTime}
					onDateChange={handlePickupDate}
					onTimeChange={setPickupTime}
					minDate={startOfToday()}
				/>
				<DateTimeField
					label={t.bookingSearch.returnDate}
					date={returnDate}
					time={returnTime}
					onDateChange={setReturnDate}
					onTimeChange={setReturnTime}
					minDate={minReturnDate}
				/>

				<Button
					size="lg"
					className="booking-submit"
					onClick={() => setDialogOpen(true)}
				>
					{t.bookingSearch.startRequest}
				</Button>
			</div>

			<BookingContactDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				booking={booking}
			/>
		</>
	);
}
