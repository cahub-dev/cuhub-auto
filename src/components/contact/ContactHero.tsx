"use client";

import type React from "react";
import { PageHero } from "#/components/equipment/PageHero";
import { useI18n } from "#/lib/i18n";

export function ContactHero(): React.JSX.Element {
	const { t } = useI18n();
	return <PageHero title={t.contact.title} />;
}
