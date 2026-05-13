"use client";

import { Plus, X } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import type { BookingCategory } from "#/components/booking/BookingCategoryTabs";
import { BookingContactDialog } from "#/components/booking/BookingContactDialog";
import { DateTimeField } from "#/components/booking/DateTimeField";
import { LOCATIONS, LocationField } from "#/components/booking/LocationField";
import { Button } from "#/components/ui/button";

const CTA_LABEL: Record<BookingCategory, string> = {
	cars: "Show cars",
	trucks: "Show trucks",
	"heavy-equipment": "Show equipment",
	machinery: "Show machinery",
};

const CATEGORY_LABEL: Record<BookingCategory, string> = {
	cars: "car",
	trucks: "truck",
	"heavy-equipment": "heavy equipment",
	machinery: "machinery",
};

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

export function BookingSearchForm({
	category,
}: {
	category: BookingCategory;
}): React.JSX.Element {
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

	const effectiveReturnLocation = hasDifferentReturn
		? returnLocation
		: pickupLocation;

	return (
		<>
			<div key={category} className="booking-form ">
				<div className="booking-form-locations">
					<LocationField
						id="pickup-location"
						label="Pickup & return"
						value={pickupLocation}
						onChange={setPickupLocation}
					/>
					{hasDifferentReturn ? (
						<>
							<LocationField
								id="return-location"
								label="Return location"
								value={returnLocation}
								onChange={setReturnLocation}
							/>
							<button
								type="button"
								className="booking-toggle-link"
								onClick={() => setHasDifferentReturn(false)}
							>
								<X className="size-3.5" aria-hidden="true" />
								Same return location
							</button>
						</>
					) : (
						<button
							type="button"
							className="booking-toggle-link"
							onClick={() => setHasDifferentReturn(true)}
						>
							<Plus className="size-3.5" aria-hidden="true" />
							Different return location
						</button>
					)}
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
					type="button"
					size="lg"
					className="booking-submit"
					onClick={() => setDialogOpen(true)}
				>
					{CTA_LABEL[category]}
				</Button>
			</div>

			<BookingContactDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				booking={{
					categoryLabel: CATEGORY_LABEL[category],
					pickupLocation,
					returnLocation: effectiveReturnLocation,
					pickupDate,
					pickupTime,
					returnDate,
					returnTime,
				}}
			/>
		</>
	);
}
