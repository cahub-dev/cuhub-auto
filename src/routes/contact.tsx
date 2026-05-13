import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { ContactForm } from "#/components/contact/ContactForm";
import { ContactHero } from "#/components/contact/ContactHero";
import { ContactInfoCards } from "#/components/contact/ContactInfoCards";
import { ContactMap } from "#/components/contact/ContactMap";

export const Route = createFileRoute("/contact")({ component: ContactPage });

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
