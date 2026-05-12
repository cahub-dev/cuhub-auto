import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/booking/new")({
	component: NewBookingPage,
});

function NewBookingPage() {
	return (
		<div className="page-wrap py-16">
			<h1 className="display-title text-3xl font-bold mb-4">
				New Booking
			</h1>
			<p className="text-muted-foreground">
				Start your vehicle rental reservation.
			</p>
		</div>
	);
}
