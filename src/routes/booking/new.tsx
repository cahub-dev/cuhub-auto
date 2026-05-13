import { createFileRoute } from "@tanstack/react-router";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/booking/new")({
	head: () => ({
		meta: buildPageMeta({
			title: "Book a Vehicle",
			description:
				"Submit a rental request for vehicles or heavy equipment in Mozambique. CA HUB AUTO will confirm availability and provide a quote within 24 hours.",
		}),
	}),
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
