import { createFileRoute } from "@tanstack/react-router";
import { BookingRequestFlow } from "#/components/booking/BookingRequestFlow";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/booking/new")({
	head: () => ({
		meta: buildPageMeta({
			title: "Book a Vehicle",
			description:
				"Submit a rental request for vehicles or heavy equipment in Mozambique. CA HUB AUTO will confirm availability and provide a quote within 24 hours.",
			path: "/booking/new",
		}),
	}),
	component: NewBookingPage,
});

function NewBookingPage() {
	return (
		<div className="min-h-screen py-12 md:py-20" style={{ background: "#f6f6f6" }}>
			<div className="page-wrap">
				<header className="mb-10 max-w-2xl">
					<span className="island-kicker inline-block rounded-full bg-accent px-3 py-1 text-primary text-xs font-semibold tracking-wider">
						Rental Request
					</span>
					<h1 className="mt-4 display-title text-4xl font-bold tracking-tight text-foreground md:text-5xl">
						Request a Quote
					</h1>
					<p className="mt-3 text-base leading-7 text-muted-foreground">
						Fill in your rental details and send directly via WhatsApp or email —
						no payment online. We confirm availability and prepare a proposal first.
					</p>
				</header>

				<BookingRequestFlow />
			</div>
		</div>
	);
}
