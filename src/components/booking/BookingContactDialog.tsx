import { format } from "date-fns";
import { Mail, MessageCircle } from "lucide-react";
import type React from "react";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import {
	buildQuickBookingMailtoUrl,
	buildQuickBookingWhatsAppUrl,
} from "#/lib/booking-message";

export interface BookingPayload {
	categoryLabel: string;
	pickupLocation: string;
	returnLocation: string;
	pickupDate: Date;
	pickupTime: string;
	returnDate: Date;
	returnTime: string;
}

export function BookingContactDialog({
	open,
	onOpenChange,
	booking,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	booking: BookingPayload;
}): React.JSX.Element {
	const quickRequest = {
		categoryLabel: booking.categoryLabel,
		pickupLocation: booking.pickupLocation,
		returnLocation: booking.returnLocation,
		pickupDate: format(booking.pickupDate, "EEE, MMM d"),
		pickupTime: booking.pickupTime,
		returnDate: format(booking.returnDate, "EEE, MMM d"),
		returnTime: booking.returnTime,
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Send your booking request</DialogTitle>
					<DialogDescription>
						Choose how you'd like to send this request. We'll reply to confirm
						availability.
					</DialogDescription>
				</DialogHeader>

				<dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm text-foreground">
					<dt className="text-muted-foreground">Vehicle</dt>
					<dd className="capitalize">{booking.categoryLabel}</dd>
					<dt className="text-muted-foreground">Pickup</dt>
					<dd>
						{booking.pickupLocation} ·{" "}
						{format(booking.pickupDate, "EEE, MMM d")} · {booking.pickupTime}
					</dd>
					<dt className="text-muted-foreground">Return</dt>
					<dd>
						{booking.returnLocation} ·{" "}
						{format(booking.returnDate, "EEE, MMM d")} · {booking.returnTime}
					</dd>
				</dl>

				<DialogFooter className="sm:flex-row sm:justify-end gap-2">
					<Button asChild variant="outline">
						<a href={buildQuickBookingMailtoUrl(quickRequest)}>
							<Mail className="size-4" aria-hidden="true" />
							Send via Email
						</a>
					</Button>
					<Button asChild>
						<a
							href={buildQuickBookingWhatsAppUrl(quickRequest)}
							target="_blank"
							rel="noreferrer"
						>
							<MessageCircle className="size-4" aria-hidden="true" />
							Send via WhatsApp
						</a>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
