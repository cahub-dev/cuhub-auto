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
import { BOOKING_EMAIL, BOOKING_WHATSAPP_NUMBER } from "#/lib/booking-message";

export interface BookingPayload {
	categoryLabel: string;
	pickupLocation: string;
	returnLocation: string;
	pickupDate: Date;
	pickupTime: string;
	returnDate: Date;
	returnTime: string;
}

function buildMessage(b: BookingPayload): string {
	const pickup = `${b.pickupLocation}, ${format(b.pickupDate, "EEE, MMM d")} at ${b.pickupTime}`;
	const rtn = `${b.returnLocation}, ${format(b.returnDate, "EEE, MMM d")} at ${b.returnTime}`;
	return [
		"Hello CA HUB AUTO,",
		"",
		`I'd like to rent a ${b.categoryLabel}.`,
		"",
		`Pickup: ${pickup}`,
		`Return: ${rtn}`,
		"",
		"Please confirm availability. Thank you.",
	].join("\n");
}

function buildWhatsAppUrl(b: BookingPayload): string {
	const number = BOOKING_WHATSAPP_NUMBER.replace(/\D/g, "");
	return `https://wa.me/${number}?text=${encodeURIComponent(buildMessage(b))}`;
}

function buildMailtoUrl(b: BookingPayload): string {
	const subject = `Booking request: ${b.categoryLabel}`;
	const body = encodeURIComponent(buildMessage(b));
	return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
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
						<a href={buildMailtoUrl(booking)}>
							<Mail className="size-4" aria-hidden="true" />
							Send via Email
						</a>
					</Button>
					<Button asChild>
						<a
							href={buildWhatsAppUrl(booking)}
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
