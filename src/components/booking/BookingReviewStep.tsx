import { Info } from "lucide-react";
import type React from "react";
import type { BookingRequest } from "#/lib/booking-message";
import { useI18n } from "#/lib/i18n";

function ReviewSection({
	title,
	rows,
}: {
	title: string;
	rows: readonly (readonly [string, string])[];
}): React.JSX.Element {
	return (
		<div className="rounded-xl border border-border/60 bg-white overflow-hidden">
			<div className="px-4 py-3 border-b border-border/40 bg-muted/10">
				<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					{title}
				</p>
			</div>
			<dl className="divide-y divide-border/40">
				{rows.map(([label, value]) => (
					<div
						key={label}
						className="grid grid-cols-[130px_1fr] gap-3 px-4 py-3 text-sm"
					>
						<dt className="text-muted-foreground shrink-0">{label}</dt>
						<dd className="text-foreground font-medium break-words">{value}</dd>
					</div>
				))}
			</dl>
		</div>
	);
}

export function BookingReviewStep({
	request,
}: {
	request: BookingRequest;
}): React.JSX.Element {
	const { t } = useI18n();
	const fleetRows = [
		[t.bookingFlow.steps[0], request.fleetRequest],
		[t.bookingFlow.category, request.category],
		[t.bookingFlow.startDate, request.startDate || "—"],
		[t.bookingFlow.returnDate, request.returnDate || "—"],
		[t.bookingFlow.province, request.province],
		[t.bookingFlow.location, request.location || "—"],
		[t.bookingFlow.projectUse, request.projectUse],
		[
			t.bookingFlow.addons,
			request.extras.length > 0
				? request.extras.join(", ")
				: t.bookingFlow.none,
		],
	] as const;

	const clientRows = [
		[t.bookingFlow.company, request.companyName],
		[t.bookingFlow.nuit, request.nuit || "—"],
		[t.bookingFlow.sector, request.sector],
		[t.bookingFlow.contact, request.contactPerson],
		[t.bookingFlow.phone, request.phone],
		[t.bookingFlow.email, request.email],
		[t.bookingFlow.address, request.address || "—"],
	] as const;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-start gap-3 rounded-xl border border-primary/25 bg-accent px-4 py-3 text-sm text-accent-foreground">
				<Info
					className="size-4 text-primary shrink-0 mt-0.5"
					aria-hidden="true"
				/>
				<span>{t.bookingFlow.reviewNotice}</span>
			</div>

			<ReviewSection title={t.bookingFlow.fleetRental} rows={fleetRows} />
			<ReviewSection title={t.bookingFlow.contactDetails} rows={clientRows} />
		</div>
	);
}
