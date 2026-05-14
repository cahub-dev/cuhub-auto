import type React from "react";
import { BookingField } from "#/components/booking/BookingField";
import {
	BOOKING_SECTORS,
	type UpdateBookingRequest,
} from "#/components/booking/booking-request-options";
import { Input } from "#/components/ui/input";
import type { BookingRequest } from "#/lib/booking-message";

export function BookingClientStep({
	request,
	update,
}: {
	request: BookingRequest;
	update: UpdateBookingRequest;
}): React.JSX.Element {
	return (
		<div className="grid gap-5">
			<div className="grid gap-5 md:grid-cols-2">
				<BookingField label="Company name">
					<Input
						value={request.companyName}
						onChange={(event) => update("companyName", event.target.value)}
						className="h-12 bg-white"
					/>
				</BookingField>
				<BookingField label="NUIT">
					<Input
						value={request.nuit}
						onChange={(event) => update("nuit", event.target.value)}
						placeholder="Optional for initial request"
						className="h-12 bg-white"
					/>
				</BookingField>
			</div>
			<div className="grid gap-5 md:grid-cols-2">
				<BookingField label="Industry sector">
					<select
						value={request.sector}
						onChange={(event) => update("sector", event.target.value)}
						className="h-12 rounded-md border border-input bg-white px-3 text-sm"
					>
						{BOOKING_SECTORS.map((sector) => (
							<option key={sector}>{sector}</option>
						))}
					</select>
				</BookingField>
				<BookingField label="Contact person">
					<Input
						value={request.contactPerson}
						onChange={(event) => update("contactPerson", event.target.value)}
						className="h-12 bg-white"
					/>
				</BookingField>
			</div>
			<div className="grid gap-5 md:grid-cols-2">
				<BookingField label="Phone">
					<Input
						type="tel"
						value={request.phone}
						onChange={(event) => update("phone", event.target.value)}
						className="h-12 bg-white"
					/>
				</BookingField>
				<BookingField label="Email">
					<Input
						type="email"
						value={request.email}
						onChange={(event) => update("email", event.target.value)}
						className="h-12 bg-white"
					/>
				</BookingField>
			</div>
			<BookingField label="Physical address">
				<Input
					value={request.address}
					onChange={(event) => update("address", event.target.value)}
					placeholder="Optional for initial request"
					className="h-12 bg-white"
				/>
			</BookingField>
		</div>
	);
}
