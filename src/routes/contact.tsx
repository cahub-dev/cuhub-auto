import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
	return (
		<div className="page-wrap py-16">
			<h1 className="display-title text-3xl font-bold mb-4">Contact Us</h1>
			<p className="text-muted-foreground">
				Get in touch with CA HUB AUTO for bookings and enquiries.
			</p>
		</div>
	);
}
