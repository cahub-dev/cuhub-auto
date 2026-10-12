"use client";

import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { BookingClientStep } from "#/components/booking/BookingClientStep";
import { BookingFleetStep } from "#/components/booking/BookingFleetStep";
import { BookingRentalStep } from "#/components/booking/BookingRentalStep";
import { BookingReviewStep } from "#/components/booking/BookingReviewStep";
import { BookingStepIndicator } from "#/components/booking/BookingStepIndicator";
import {
	BOOKING_STEPS,
	DEFAULT_BOOKING_REQUEST,
	type UpdateBookingRequest,
} from "#/components/booking/booking-request-options";
import { WhatsAppIcon } from "#/components/shared/WhatsAppIcon";
import { Button } from "#/components/ui/button";
import { getCategory, getEquipment } from "#/data/equipment";
import {
	BOOKING_EMAIL,
	BOOKING_WHATSAPP_NUMBER,
	type BookingRequest,
	buildBookingWhatsAppUrl,
} from "#/lib/booking-message";
import { SALES_CONTACT } from "#/lib/contact-details";
import { useI18n } from "#/lib/i18n";

function initialRequest(
	equipmentId?: string,
	startDate?: string,
): BookingRequest {
	const base = { ...DEFAULT_BOOKING_REQUEST, startDate: startDate ?? "" };
	const equipment = equipmentId ? getEquipment(equipmentId) : undefined;
	if (!equipment) return base;

	return {
		...base,
		fleetRequest: equipment.name.en,
		category: getCategory(equipment.categoryId)?.name.en ?? "Not specified",
	};
}

export function BookingRequestFlow({
	initialEquipmentId,
	initialStartDate,
}: {
	initialEquipmentId?: string;
	initialStartDate?: string;
}): React.JSX.Element {
	const { t } = useI18n();
	const [step, setStep] = useState(0);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "sending" | "success" | "error"
	>("idle");
	const [submitError, setSubmitError] = useState("");
	const [request, setRequest] = useState<BookingRequest>(() =>
		initialRequest(initialEquipmentId, initialStartDate),
	);

	const canContinue = useMemo(() => {
		if (step === 0) return request.fleetRequest.length > 0;
		if (step === 1) {
			return (
				request.province.length > 0 &&
				request.startDate.length > 0 &&
				request.returnDate.length > 0 &&
				request.projectUse.length > 0
			);
		}
		if (step === 2) {
			return (
				request.companyName.length > 0 &&
				request.sector.length > 0 &&
				request.contactPerson.length > 0 &&
				request.phone.length > 0 &&
				request.email.length > 0
			);
		}
		return true;
	}, [request, step]);

	const update: UpdateBookingRequest = (key, value) => {
		setRequest((current) => ({ ...current, [key]: value }));
	};

	function toggleExtra(extra: string): void {
		setRequest((current) => ({
			...current,
			extras: current.extras.includes(extra)
				? current.extras.filter((item) => item !== extra)
				: [...current.extras, extra],
		}));
	}

	async function submitBookingRequest(): Promise<void> {
		setSubmitStatus("sending");
		setSubmitError("");

		try {
			const response = await fetch("/api/booking", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(request),
			});

			if (!response.ok) {
				const body = await response.json().catch(() => null);
				throw new Error(body?.error ?? t.bookingFlow.error);
			}

			setSubmitStatus("success");
		} catch (error) {
			setSubmitStatus("error");
			setSubmitError(
				error instanceof Error ? error.message : t.bookingFlow.error,
			);
		}
	}

	return (
		<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
			{/* Main form panel */}
			<section className="shadow-card p-6 md:p-10">
				<BookingStepIndicator step={step} />
				<form className="mt-8" onSubmit={(event) => event.preventDefault()}>
					{step === 0 && <BookingFleetStep request={request} update={update} />}
					{step === 1 && (
						<BookingRentalStep
							request={request}
							update={update}
							toggleExtra={toggleExtra}
						/>
					)}
					{step === 2 && (
						<BookingClientStep request={request} update={update} />
					)}
					{step === 3 && <BookingReviewStep request={request} />}

					<BookingActions
						step={step}
						canContinue={canContinue}
						request={request}
						submitStatus={submitStatus}
						submitError={submitError}
						onBack={() => setStep((current) => Math.max(0, current - 1))}
						onNext={() => setStep((current) => current + 1)}
						onSubmitRequest={submitBookingRequest}
					/>
				</form>
			</section>

			{/* Sidebar */}
			<aside
				className="self-start p-6 lg:sticky lg:top-6"
				style={{
					background: "var(--surface-muted)",
					border: "1px solid var(--line)",
				}}
			>
				{/* Quote-only notice */}
				<div className="flex items-start gap-3">
					<div className="flex items-center justify-center size-9 rounded-xl bg-accent shrink-0">
						<ShieldCheck className="size-4 text-primary" />
					</div>
					<div>
						<p className="text-sm font-semibold text-foreground">
							{t.bookingFlow.quoteOnly}
						</p>
						<p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
							{t.bookingFlow.quoteOnlyDescription}
						</p>
					</div>
				</div>

				<div className="my-5 h-px" style={{ background: "var(--line)" }} />

				{/* Trust signals */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2.5">
						<Clock className="size-4 text-primary shrink-0" />
						<span className="text-sm text-foreground">
							{t.bookingFlow.reply24}
						</span>
					</div>
					<div className="flex items-center gap-2.5">
						<MapPin className="size-4 text-primary shrink-0" />
						<span className="text-sm text-foreground">
							{t.bookingFlow.allProvinces}
						</span>
					</div>
				</div>

				<div className="my-5 h-px" style={{ background: "var(--line)" }} />

				{/* Direct contact */}
				<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
					{t.bookingFlow.directContact}
				</p>
				<div className="flex flex-col gap-3">
					<a
						href={`tel:${BOOKING_WHATSAPP_NUMBER}`}
						className="flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors"
					>
						<Phone className="size-4 text-primary shrink-0" />
						{SALES_CONTACT.phoneDisplay}
					</a>
					<a
						href={`mailto:${BOOKING_EMAIL}`}
						className="flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors"
					>
						<Mail className="size-4 text-primary shrink-0" />
						{BOOKING_EMAIL}
					</a>
				</div>

				{/* Live request summary — shown after fleet step */}
				{step > 0 && (
					<>
						<div className="my-5 h-px" style={{ background: "var(--line)" }} />
						<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
							{t.bookingFlow.yourRequest}
						</p>
						<div className="flex flex-col gap-2">
							{[
								[t.bookingFlow.steps[0], request.fleetRequest],
								[t.bookingFlow.province, step >= 1 ? request.province : ""],
								[t.bookingFlow.from, step >= 1 ? request.startDate : ""],
								[t.bookingFlow.until, step >= 1 ? request.returnDate : ""],
								[t.bookingFlow.company, step >= 2 ? request.companyName : ""],
							]
								.filter(([, v]) => v)
								.map(([label, value]) => (
									<div
										key={label}
										className="flex justify-between gap-3 text-sm"
									>
										<span className="text-muted-foreground shrink-0">
											{label}
										</span>
										<span className="text-foreground text-right font-medium truncate">
											{value}
										</span>
									</div>
								))}
						</div>
					</>
				)}
			</aside>
		</div>
	);
}

function BookingActions({
	step,
	canContinue,
	request,
	submitStatus,
	submitError,
	onBack,
	onNext,
	onSubmitRequest,
}: {
	step: number;
	canContinue: boolean;
	request: BookingRequest;
	submitStatus: "idle" | "sending" | "success" | "error";
	submitError: string;
	onBack: () => void;
	onNext: () => void;
	onSubmitRequest: () => void;
}): React.JSX.Element {
	const { t } = useI18n();

	return (
		<div className="mt-8 flex flex-col gap-3 border-t border-border/50 pt-5">
			{submitStatus === "success" && (
				<p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
					{t.bookingFlow.success}
				</p>
			)}
			{submitStatus === "error" && (
				<p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
					{submitError || t.bookingFlow.error}
				</p>
			)}

			<div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
				<Button
					type="button"
					variant="outline"
					disabled={step === 0 || submitStatus === "sending"}
					onClick={onBack}
					className="sm:w-auto"
				>
					{t.bookingFlow.back}
				</Button>

				{step < BOOKING_STEPS.length - 1 ? (
					<Button
						type="button"
						disabled={!canContinue}
						onClick={onNext}
						className="sm:w-auto"
					>
						{t.bookingFlow.continue}
					</Button>
				) : (
					<div className="flex flex-col gap-2 sm:flex-row">
						<Button
							type="button"
							variant="outline"
							disabled={
								submitStatus === "sending" || submitStatus === "success"
							}
							onClick={onSubmitRequest}
						>
							<Mail className="size-4" aria-hidden="true" />
							{submitStatus === "sending"
								? t.bookingFlow.sending
								: t.bookingFlow.sendEmail}
						</Button>
						<a
							href={buildBookingWhatsAppUrl(request)}
							target="_blank"
							rel="noreferrer"
							className="btn-whatsapp h-9 px-4 text-xs"
						>
							<WhatsAppIcon className="size-4" />
							{t.bookingFlow.sendWhatsApp}
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
