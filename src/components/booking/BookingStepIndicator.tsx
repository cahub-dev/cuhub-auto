import { Check } from "lucide-react";
import { Fragment } from "react";
import type React from "react";
import { BOOKING_STEPS } from "#/components/booking/booking-request-options";

export function BookingStepIndicator({
	step,
}: {
	step: number;
}): React.JSX.Element {
	return (
		<nav aria-label="Booking steps">
			<ol className="flex items-center">
				{BOOKING_STEPS.map((label, index) => {
					const isCompleted = index < step;
					const isActive = index === step;
					return (
						<Fragment key={label}>
							<li className="flex flex-col items-center gap-2 shrink-0">
								<div
									className={`flex items-center justify-center size-9 rounded-full text-sm font-bold border-2 transition-all ${
										isCompleted
											? "bg-primary border-primary text-white"
											: isActive
												? "border-primary bg-accent text-primary"
												: "border-border bg-white text-muted-foreground"
									}`}
								>
									{isCompleted ? (
										<Check className="size-4" strokeWidth={2.5} />
									) : (
										index + 1
									)}
								</div>
								<span
									className={`text-xs font-semibold hidden sm:block transition-colors ${
										isActive
											? "text-primary"
											: isCompleted
												? "text-foreground"
												: "text-muted-foreground"
									}`}
								>
									{label}
								</span>
							</li>
							{index < BOOKING_STEPS.length - 1 && (
								<div
									aria-hidden="true"
									className={`flex-1 h-0.5 mx-2 mb-5 sm:mb-0 rounded-full transition-colors ${
										index < step ? "bg-primary" : "bg-border"
									}`}
								/>
							)}
						</Fragment>
					);
				})}
			</ol>
		</nav>
	);
}
