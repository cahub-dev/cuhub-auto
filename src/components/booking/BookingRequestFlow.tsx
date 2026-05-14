"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
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
import { Button } from "#/components/ui/button";
import {
	type BookingRequest,
	BOOKING_EMAIL,
	BOOKING_WHATSAPP_NUMBER,
	buildBookingMailtoUrl,
	buildBookingWhatsAppUrl,
} from "#/lib/booking-message";

export function BookingRequestFlow(): React.JSX.Element {
	const [step, setStep] = useState(0);
	const [request, setRequest] = useState<BookingRequest>(
		DEFAULT_BOOKING_REQUEST,
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

	return (
		<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
			{/* Main form panel */}
			<section className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] md:p-8">
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
					{step === 2 && <BookingClientStep request={request} update={update} />}
					{step === 3 && <BookingReviewStep request={request} />}

					<BookingActions
						step={step}
						canContinue={canContinue}
						request={request}
						onBack={() => setStep((current) => Math.max(0, current - 1))}
						onNext={() => setStep((current) => current + 1)}
					/>
				</form>
			</section>

			{/* Sidebar */}
			<aside
				className="self-start rounded-2xl p-6 lg:sticky lg:top-24"
				style={{ background: "#f9f8f7", border: "1px solid var(--line)" }}
			>
				{/* Quote-only notice */}
				<div className="flex items-start gap-3">
					<div className="flex items-center justify-center size-9 rounded-xl bg-accent shrink-0">
						<ShieldCheck className="size-4 text-primary" />
					</div>
					<div>
						<p className="text-sm font-semibold text-foreground">
							Quote request only
						</p>
						<p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
							No payment online. We confirm availability and send a proposal first.
						</p>
					</div>
				</div>

				<div className="my-5 h-px" style={{ background: "var(--line)" }} />

				{/* Trust signals */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2.5">
						<Clock className="size-4 text-primary shrink-0" />
						<span className="text-sm text-foreground">Reply within 24 hours</span>
					</div>
					<div className="flex items-center gap-2.5">
						<MapPin className="size-4 text-primary shrink-0" />
						<span className="text-sm text-foreground">
							All 10 provinces covered
						</span>
					</div>
				</div>

				<div className="my-5 h-px" style={{ background: "var(--line)" }} />

				{/* Direct contact */}
				<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
					Direct contact
				</p>
				<div className="flex flex-col gap-3">
					<a
						href={`tel:${BOOKING_WHATSAPP_NUMBER}`}
						className="flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors"
					>
						<Phone className="size-4 text-primary shrink-0" />
						{BOOKING_WHATSAPP_NUMBER}
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
							Your request
						</p>
						<div className="flex flex-col gap-2">
							{[
								["Fleet", request.fleetRequest],
								["Province", step >= 1 ? request.province : ""],
								["From", step >= 1 ? request.startDate : ""],
								["Until", step >= 1 ? request.returnDate : ""],
								["Company", step >= 2 ? request.companyName : ""],
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
	onBack,
	onNext,
}: {
	step: number;
	canContinue: boolean;
	request: BookingRequest;
	onBack: () => void;
	onNext: () => void;
}): React.JSX.Element {
	return (
		<div className="mt-8 flex flex-col gap-3 border-t border-border/50 pt-5 sm:flex-row sm:justify-between">
			<Button
				type="button"
				variant="outline"
				disabled={step === 0}
				onClick={onBack}
				className="sm:w-auto"
			>
				Back
			</Button>

			{step < BOOKING_STEPS.length - 1 ? (
				<Button
					type="button"
					disabled={!canContinue}
					onClick={onNext}
					className="sm:w-auto"
				>
					Continue
				</Button>
			) : (
				<div className="flex flex-col gap-2 sm:flex-row">
					<Button asChild variant="outline">
						<a href={buildBookingMailtoUrl(request)}>
							<Mail className="size-4" aria-hidden="true" />
							Send via Email
						</a>
					</Button>
					<Button asChild>
						<a
							href={buildBookingWhatsAppUrl(request)}
							target="_blank"
							rel="noreferrer"
						>
							<MessageCircle className="size-4" aria-hidden="true" />
							Send via WhatsApp
						</a>
					</Button>
				</div>
			)}
		</div>
	);
}
