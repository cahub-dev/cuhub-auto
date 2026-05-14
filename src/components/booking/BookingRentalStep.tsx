import type React from "react";
import { BookingField } from "#/components/booking/BookingField";
import {
	BOOKING_EXTRAS,
	type UpdateBookingRequest,
} from "#/components/booking/booking-request-options";
import { LOCATIONS } from "#/components/booking/LocationField";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import type { BookingRequest } from "#/lib/booking-message";

export function BookingRentalStep({
	request,
	update,
	toggleExtra,
}: {
	request: BookingRequest;
	update: UpdateBookingRequest;
	toggleExtra: (extra: string) => void;
}): React.JSX.Element {
	return (
		<div className="grid gap-5">
			<div className="grid gap-5 md:grid-cols-2">
				<BookingField label="Province">
					<select
						value={request.province}
						onChange={(event) => update("province", event.target.value)}
						className="h-12 w-full rounded-md border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
					>
						{LOCATIONS.map((location) => (
							<option key={location}>{location}</option>
						))}
					</select>
				</BookingField>
				<BookingField label="Pickup / delivery location">
					<Input
						value={request.location}
						onChange={(event) => update("location", event.target.value)}
						placeholder="Site, office, or project area"
						className="h-12 bg-white"
					/>
				</BookingField>
			</div>

			<div className="grid gap-5 md:grid-cols-2">
				<BookingField label="Start date">
					<Input
						type="date"
						value={request.startDate}
						onChange={(event) => update("startDate", event.target.value)}
						className="h-12 bg-white"
					/>
				</BookingField>
				<BookingField label="Return date">
					<Input
						type="date"
						value={request.returnDate}
						onChange={(event) => update("returnDate", event.target.value)}
						className="h-12 bg-white"
					/>
				</BookingField>
			</div>

			<BookingField label="Project / intended use">
				<Textarea
					value={request.projectUse}
					onChange={(event) => update("projectUse", event.target.value)}
					placeholder="Tell us what the vehicle or equipment will support."
					className="min-h-28 bg-white resize-none"
				/>
			</BookingField>

			<div>
				<p className="mb-3 text-sm font-semibold text-foreground">
					Add-ons
					<span className="ml-2 text-xs font-normal text-muted-foreground">
						optional
					</span>
				</p>
				<div className="flex flex-wrap gap-2">
					{BOOKING_EXTRAS.map((extra) => {
						const isOn = request.extras.includes(extra);
						return (
							<button
								key={extra}
								type="button"
								onClick={() => toggleExtra(extra)}
								className={`px-4 py-2 rounded-full text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
									isOn
										? "bg-primary border-primary text-white"
										: "bg-white border-border/70 text-muted-foreground hover:border-foreground hover:text-foreground"
								}`}
							>
								{extra}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
