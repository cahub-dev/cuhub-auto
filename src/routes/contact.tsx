import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { ContactForm } from "#/components/contact/ContactForm";
import { ContactHero } from "#/components/contact/ContactHero";
import { ContactInfoCards } from "#/components/contact/ContactInfoCards";
import { ContactMap } from "#/components/contact/ContactMap";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/contact")({
	head: () => ({
		meta: buildPageMeta({
			title: "Contact & Quote",
			description:
				"Get a rental quote from CA HUB AUTO. Reach us by phone, WhatsApp, or email for vehicle and equipment availability, pricing, and booking support — based in Maputo, Mozambique.",
		}),
	}),
	component: ContactPage,
});

function ContactPage(): React.JSX.Element {
	return (
		<>
			<ContactHero />
			<ContactInfoCards />
			<ContactMap />
			<ContactForm />
		</>
	);
}
