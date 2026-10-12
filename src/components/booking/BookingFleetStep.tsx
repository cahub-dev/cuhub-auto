import { Check, HelpCircle } from "lucide-react";
import type React from "react";
import type { UpdateBookingRequest } from "#/components/booking/booking-request-options";
import {
	type Equipment,
	getCategory,
	getEquipmentInPriorityOrder,
} from "#/data/equipment";
import type { BookingRequest } from "#/lib/booking-message";
import { useI18n } from "#/lib/i18n";

const NOT_SURE = "Not sure, advise me";

export function BookingFleetStep({
	request,
	update,
}: {
	request: BookingRequest;
	update: UpdateBookingRequest;
}): React.JSX.Element {
	const { language, t } = useI18n();

	// Sales receives English names regardless of the visitor's language.
	function handleSelect(item: Equipment): void {
		update("fleetRequest", item.name.en);
		update(
			"category",
			getCategory(item.categoryId)?.name.en ?? "Not specified",
		);
	}

	function handleNotSure(): void {
		update("fleetRequest", NOT_SURE);
		update("category", "Not specified");
	}

	const selected = request.fleetRequest;

	return (
		<div className="grid gap-5">
			<p className="text-sm font-semibold text-foreground">
				{t.bookingFlow.selectFleet}
			</p>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
				{getEquipmentInPriorityOrder().map((item) => {
					const isSelected = selected === item.name.en;
					const category = getCategory(item.categoryId);
					return (
						<button
							key={item.id}
							type="button"
							onClick={() => handleSelect(item)}
							aria-pressed={isSelected}
							className={`relative flex flex-col overflow-hidden rounded-lg border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
								isSelected
									? "border-primary shadow-sm"
									: "border-border bg-white hover:border-primary/40"
							}`}
						>
							<div className="aspect-[4/3] overflow-hidden bg-muted">
								<img
									src={item.image}
									alt={item.name[language]}
									className="h-full w-full object-cover"
									loading="lazy"
								/>
							</div>

							<div
								className={`flex-1 px-3 py-2.5 ${isSelected ? "bg-accent" : "bg-white"}`}
							>
								<p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
									{category?.name[language]}
								</p>
								<p
									className={`mt-0.5 text-xs font-semibold leading-snug ${
										isSelected ? "text-primary" : "text-foreground"
									}`}
								>
									{item.name[language]}
								</p>
							</div>

							{isSelected && (
								<div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary">
									<Check className="size-3 text-white" strokeWidth={3} />
								</div>
							)}
						</button>
					);
				})}

				<button
					type="button"
					onClick={handleNotSure}
					aria-pressed={selected === NOT_SURE}
					className={`flex min-h-[140px] flex-col items-center justify-center gap-2.5 rounded-lg border-2 p-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
						selected === NOT_SURE
							? "border-primary bg-accent text-primary"
							: "border-dashed border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
					}`}
				>
					<HelpCircle className="size-6" />
					<span className="text-xs font-semibold leading-snug">
						{t.bookingFlow.notSureLine1}
						<br />
						{t.bookingFlow.notSureLine2}
					</span>
				</button>
			</div>
		</div>
	);
}
