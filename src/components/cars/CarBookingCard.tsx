"use client";

import { Mail, MessageCircle } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { LOCATIONS } from "#/components/booking/LocationField";
import type { CarDetailData } from "#/components/cars/car-detail-data";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import {
	buildVehicleBookingMailtoUrl,
	buildVehicleBookingWhatsAppUrl,
} from "#/lib/booking-message";
import { useI18n } from "#/lib/i18n";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function toDateInput(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
	const next = new Date(date);
	next.setDate(next.getDate() + days);
	return next;
}

function calculateRentalDays(pickupDate: string, returnDate: string): number {
	const pickup = new Date(`${pickupDate}T00:00:00`);
	const dropoff = new Date(`${returnDate}T00:00:00`);
	const diff = Math.ceil((dropoff.getTime() - pickup.getTime()) / MS_PER_DAY);

	return Number.isFinite(diff) ? Math.max(1, diff) : 1;
}

function money(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

export function CarBookingCard({
	car,
}: {
	car: CarDetailData;
}): React.JSX.Element {
	const { t } = useI18n();
	const today = toDateInput(new Date());
	const tomorrow = toDateInput(addDays(new Date(), 1));
	const [pickupDate, setPickupDate] = useState(today);
	const [returnDate, setReturnDate] = useState(tomorrow);
	const [pickupTime, setPickupTime] = useState("09:00");
	const [returnTime, setReturnTime] = useState("17:00");
	const [pickupLocation, setPickupLocation] = useState(LOCATIONS[0]);
	const [returnLocation, setReturnLocation] = useState(LOCATIONS[0]);
	const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

	const rentalDays = calculateRentalDays(pickupDate, returnDate);
	const extrasTotal = car.extras
		.filter((extra) => selectedExtras.includes(extra.id))
		.reduce((total, extra) => total + extra.pricePerDay * rentalDays, 0);
	const baseTotal = car.dailyRate * rentalDays;
	const total = baseTotal + extrasTotal;

	const selectedExtraLabels = car.extras
		.filter((extra) => selectedExtras.includes(extra.id))
		.map((extra) => extra.label);
	const vehicleRequest = {
		vehicleName: car.name,
		pickupDate,
		pickupTime,
		pickupLocation,
		returnDate,
		returnTime,
		returnLocation,
		rentalDays,
		extras: selectedExtraLabels,
		estimatedTotal: money(total),
	};
	const whatsappHref = buildVehicleBookingWhatsAppUrl(vehicleRequest);
	const emailHref = buildVehicleBookingMailtoUrl(vehicleRequest);

	function toggleExtra(extraId: string): void {
		setSelectedExtras((current) =>
			current.includes(extraId)
				? current.filter((id) => id !== extraId)
				: [...current, extraId],
		);
	}

	return (
		<aside className="w-full self-start rounded-2xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.05)] lg:sticky lg:top-24">
			<h2 className="display-title mb-5 text-2xl font-bold text-foreground">
				{t.carDetail.reserve}
			</h2>

			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-3">
					<Field label={t.carDetail.pickupDate}>
						<Input
							aria-label={t.carDetail.pickupDate}
							type="date"
							value={pickupDate}
							min={today}
							onChange={(event) => setPickupDate(event.target.value)}
						/>
					</Field>
					<Field label={t.carDetail.returnDate}>
						<Input
							aria-label={t.carDetail.returnDate}
							type="date"
							value={returnDate}
							min={pickupDate}
							onChange={(event) => setReturnDate(event.target.value)}
						/>
					</Field>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<Field label={t.carDetail.pickupTime}>
						<Input
							aria-label={t.carDetail.pickupTime}
							type="time"
							value={pickupTime}
							onChange={(event) => setPickupTime(event.target.value)}
						/>
					</Field>
					<Field label={t.carDetail.returnTime}>
						<Input
							aria-label={t.carDetail.returnTime}
							type="time"
							value={returnTime}
							onChange={(event) => setReturnTime(event.target.value)}
						/>
					</Field>
				</div>
				<Field label={t.carDetail.pickupLocation}>
					<LocationSelect
						label={t.carDetail.pickupLocation}
						value={pickupLocation}
						onChange={setPickupLocation}
					/>
				</Field>
				<Field label={t.carDetail.returnLocation}>
					<LocationSelect
						label={t.carDetail.returnLocation}
						value={returnLocation}
						onChange={setReturnLocation}
					/>
				</Field>
			</div>

			<div className="my-6 border-t border-border/60 pt-5">
				<h3 className="mb-3 font-semibold text-foreground">
					{t.carDetail.addExtra}
				</h3>
				<div className="space-y-3">
					{car.extras.map((extra) => (
						<label
							key={extra.id}
							className="flex cursor-pointer items-center justify-between gap-3 text-sm"
						>
							<span className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={selectedExtras.includes(extra.id)}
									onChange={() => toggleExtra(extra.id)}
									className="size-4 accent-primary"
								/>
								{extra.label}
							</span>
							<span className="text-muted-foreground">
								{money(extra.pricePerDay)}/{t.carDetail.perDay}
							</span>
						</label>
					))}
				</div>
			</div>

			<div className="space-y-3 border-t border-border/60 pt-5 text-sm">
				<PriceRow
					label={`${rentalDays} ${rentalDays === 1 ? t.carDetail.rentalDay : t.carDetail.rentalDays}`}
					value={money(baseTotal)}
				/>
				<PriceRow
					label={t.carDetail.selectedExtras}
					value={money(extrasTotal)}
				/>
				<PriceRow
					label={t.carDetail.estimatedTotal}
					value={money(total)}
					strong
				/>
			</div>

			<div className="mt-6 grid gap-3">
				<Button asChild className="h-12 rounded-lg font-semibold">
					<a href={whatsappHref} target="_blank" rel="noreferrer">
						<MessageCircle className="size-4" aria-hidden="true" />
						{t.carDetail.bookWhatsApp}
					</a>
				</Button>
				<Button
					asChild
					variant="outline"
					className="h-12 rounded-lg font-semibold"
				>
					<a href={emailHref}>
						<Mail className="size-4" aria-hidden="true" />
						{t.carDetail.sendEmail}
					</a>
				</Button>
			</div>
		</aside>
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
		<div className="grid gap-1.5 text-sm font-medium text-foreground">
			<span>{label}</span>
			{children}
		</div>
	);
}

function LocationSelect({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
}): React.JSX.Element {
	return (
		<select
			aria-label={label}
			value={value}
			onChange={(event) => onChange(event.target.value)}
			className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
		>
			{LOCATIONS.map((location) => (
				<option key={location} value={location}>
					{location}
				</option>
			))}
		</select>
	);
}

function PriceRow({
	label,
	value,
	strong = false,
}: {
	label: string;
	value: string;
	strong?: boolean;
}): React.JSX.Element {
	return (
		<div className="flex items-center justify-between gap-4">
			<span
				className={
					strong ? "font-semibold text-foreground" : "text-muted-foreground"
				}
			>
				{label}
			</span>
			<span
				className={
					strong
						? "text-lg font-bold text-foreground"
						: "font-semibold text-foreground"
				}
			>
				{value}
			</span>
		</div>
	);
}
