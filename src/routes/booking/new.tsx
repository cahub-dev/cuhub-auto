import { createFileRoute } from "@tanstack/react-router";
import { BookingRequestFlow } from "#/components/booking/BookingRequestFlow";
import { ContactItems } from "#/components/contact/ContactSection";
import { PageHero } from "#/components/equipment/PageHero";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { useI18n } from "#/lib/i18n";
import { Reveal } from "#/lib/motion";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/booking/new")({
	validateSearch: (search: Record<string, unknown>): { equipment?: string } =>
		typeof search.equipment === "string" ? { equipment: search.equipment } : {},
	head: () => ({
		meta: buildPageMeta({
			title: "Request an Equipment Quote",
			description:
				"Request a rental quote for mining machinery in Mozambique: crushers, excavators, wheel loaders, generators, dump trucks and drill rigs. CA HUB AUTO replies within 24 hours.",
			path: "/booking/new",
		}),
	}),
	component: NewBookingPage,
});

function NewBookingPage() {
	const { t } = useI18n();
	const { equipment } = Route.useSearch();

	return (
		<div>
			<PageHero title={t.bookingPage.title} />
			<div className="page-wrap py-20 md:py-28">
				<SectionHeading
					ghost={t.bookingPage.ghost}
					title={t.contact.getInTouch}
				/>
				<p className="mt-8 max-w-2xl text-[15px] leading-7 text-[#202020]">
					{t.bookingPage.description}
				</p>
				<div className="mt-12 mb-14">
					<ContactItems layout="row" />
				</div>
				<Reveal>
					<BookingRequestFlow initialEquipmentId={equipment} />
				</Reveal>
			</div>
		</div>
	);
}
