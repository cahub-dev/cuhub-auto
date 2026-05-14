"use client";

import { Plus, X } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { BookingContactDialog } from "#/components/booking/BookingContactDialog";
import { DateTimeField } from "#/components/booking/DateTimeField";
import { LOCATIONS, LocationField } from "#/components/booking/LocationField";
import { Button } from "#/components/ui/button";

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
		categoryLabel: "car",
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
				<div className="booking-form-locations">
					<LocationField
						id="pickup-location"
						label="Pickup & return"
						value={pickupLocation}
						onChange={setPickupLocation}
					/>
					{hasDifferentReturn && (
						<LocationField
							id="return-location"
							label="Return location"
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
								Same return location
							</>
						) : (
							<>
								<Plus className="size-3.5" aria-hidden="true" />
								Different return location
							</>
						)}
					</button>
				</div>

				<DateTimeField
					label="Pickup date"
					date={pickupDate}
					time={pickupTime}
					onDateChange={handlePickupDate}
					onTimeChange={setPickupTime}
					minDate={startOfToday()}
				/>
				<DateTimeField
					label="Return date"
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
					Start car request
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
