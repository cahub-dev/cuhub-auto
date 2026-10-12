import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { ContactHero } from "#/components/contact/ContactHero";
import { ContactMap } from "#/components/contact/ContactMap";
import { ContactSection } from "#/components/contact/ContactSection";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/contact")({
	head: () => ({
		meta: buildPageMeta({
			title: "Contact & Quote",
			description:
				"Get a mining equipment rental quote from CA HUB AUTO. Reach our sales team by phone, WhatsApp or email for availability and pricing — based in Maputo, Mozambique.",
			path: "/contact",
		}),
	}),
	component: ContactPage,
});

function ContactPage(): React.JSX.Element {
	return (
		<>
			<ContactHero />
			<ContactSection />
			<ContactMap />
		</>
	);
}
