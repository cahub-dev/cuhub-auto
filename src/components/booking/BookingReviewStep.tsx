import { Info } from "lucide-react";
import type React from "react";
import type { BookingRequest } from "#/lib/booking-message";

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
	const fleetRows = [
		["Fleet", request.fleetRequest],
		["Category", request.category],
		["Start date", request.startDate || "—"],
		["Return date", request.returnDate || "—"],
		["Province", request.province],
		["Location", request.location || "—"],
		["Project / use", request.projectUse],
		["Add-ons", request.extras.length > 0 ? request.extras.join(", ") : "None"],
	] as const;

	const clientRows = [
		["Company", request.companyName],
		["NUIT", request.nuit || "—"],
		["Sector", request.sector],
		["Contact", request.contactPerson],
		["Phone", request.phone],
		["Email", request.email],
		["Address", request.address || "—"],
	] as const;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-start gap-3 rounded-xl border border-primary/25 bg-accent px-4 py-3 text-sm text-accent-foreground">
				<Info className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
				<span>
					This sends a quote request only — no payment is taken online. CA HUB AUTO
					will confirm availability and send a proposal.
				</span>
			</div>

			<ReviewSection title="Fleet & Rental" rows={fleetRows} />
			<ReviewSection title="Contact Details" rows={clientRows} />
		</div>
	);
}
