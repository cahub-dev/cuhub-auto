"use client";

import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { LOCATIONS } from "#/components/booking/locations";
import { WhatsAppIcon } from "#/components/shared/WhatsAppIcon";
import type { Equipment } from "#/data/equipment";
import {
	buildEquipmentQuoteMailtoUrl,
	buildEquipmentQuoteWhatsAppUrl,
} from "#/lib/booking-message";
import { DICTIONARY, useI18n } from "#/lib/i18n";

// Durations are sent to sales in English; the visitor sees their own language.
const DURATIONS_EN = DICTIONARY.en.equipmentDetail.durations;

/** Quick quote form shown in the "Request a quote" tab of a detail page. */
export function QuoteRequestCard({
	item,
}: {
	item: Equipment;
}): React.JSX.Element {
	const { language, t } = useI18n();
	const today = new Date().toISOString().slice(0, 10);
	const [startDate, setStartDate] = useState("");
	const [durationIndex, setDurationIndex] = useState(2);
	const [province, setProvince] = useState(LOCATIONS[0]);
	const [siteLocation, setSiteLocation] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [operatorRequired, setOperatorRequired] = useState(false);

	const request = {
		equipmentName: item.name.en,
		quantity,
		startDate,
		duration: DURATIONS_EN[durationIndex],
		province,
		siteLocation: siteLocation.trim(),
		operatorRequired,
	};

	return (
		<div className="shadow-card max-w-3xl p-6 md:p-10">
			<p className="display-title text-xl font-bold text-[#313131]">
				{item.name[language]}
			</p>
			<p className="mt-1 text-sm text-[#777]">
				{t.equipmentDetail.quoteSubtitle}
			</p>

			<div className="mt-6 grid gap-4 md:grid-cols-2">
				<Field label={t.equipmentDetail.startDate}>
					<input
						type="date"
						className="bh-input"
						aria-label={t.equipmentDetail.startDate}
						value={startDate}
						min={today}
						onChange={(event) => setStartDate(event.target.value)}
					/>
				</Field>
				<Field label={t.equipmentDetail.quantity}>
					<input
						type="number"
						className="bh-input"
						aria-label={t.equipmentDetail.quantity}
						min={1}
						max={50}
						value={quantity}
						onChange={(event) =>
							setQuantity(Math.max(1, Number(event.target.value) || 1))
						}
					/>
				</Field>
				<Field label={t.equipmentDetail.duration}>
					<select
						className="bh-input"
						aria-label={t.equipmentDetail.duration}
						value={durationIndex}
						onChange={(event) => setDurationIndex(Number(event.target.value))}
					>
						{t.equipmentDetail.durations.map((label, index) => (
							<option key={label} value={index}>
								{label}
							</option>
						))}
					</select>
				</Field>
				<Field label={t.equipmentDetail.province}>
					<select
						className="bh-input"
						aria-label={t.equipmentDetail.province}
						value={province}
						onChange={(event) => setProvince(event.target.value)}
					>
						{LOCATIONS.map((location) => (
							<option key={location} value={location}>
								{location}
							</option>
						))}
					</select>
				</Field>
				<div className="md:col-span-2">
					<Field label={t.equipmentDetail.siteLocation}>
						<input
							className="bh-input"
							aria-label={t.equipmentDetail.siteLocation}
							value={siteLocation}
							placeholder={t.equipmentDetail.sitePlaceholder}
							onChange={(event) => setSiteLocation(event.target.value)}
						/>
					</Field>
				</div>
			</div>

			<label className="mt-5 flex cursor-pointer items-center gap-2 text-sm text-[#202020]">
				<input
					type="checkbox"
					checked={operatorRequired}
					onChange={(event) => setOperatorRequired(event.target.checked)}
					className="size-4 accent-primary"
				/>
				{t.equipmentDetail.operator}
			</label>

			<div className="mt-8 flex flex-wrap items-center gap-4">
				<a
					href={buildEquipmentQuoteWhatsAppUrl(request)}
					target="_blank"
					rel="noreferrer"
					className="btn-whatsapp"
				>
					<WhatsAppIcon className="size-5" />
					{t.equipmentDetail.sendWhatsApp}
				</a>
				<a
					href={buildEquipmentQuoteMailtoUrl(request)}
					className="inline-flex h-12 items-center gap-2 border border-[#ddd] px-6 text-xs font-semibold uppercase tracking-widest text-[#202020] no-underline hover:border-primary hover:text-primary"
				>
					<Mail className="size-4" aria-hidden="true" />
					{t.equipmentDetail.sendEmail}
				</a>
				<Link
					to="/booking/new"
					search={{ equipment: item.id }}
					className="text-sm font-semibold text-[#777] underline-offset-4 hover:text-primary hover:underline"
				>
					{t.equipmentDetail.fullForm}
				</Link>
			</div>
		</div>
	);
}

function Field({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}): React.JSX.Element {
	return (
		<div className="grid gap-1.5 text-sm font-medium text-[#313131]">
			<span aria-hidden="true">{label}</span>
			{children}
		</div>
	);
}
