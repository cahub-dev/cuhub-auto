import { Check } from "lucide-react";
import type React from "react";
import { Fragment } from "react";
import { useI18n } from "#/lib/i18n";

export function BookingStepIndicator({
	step,
}: {
	step: number;
}): React.JSX.Element {
	const { t } = useI18n();
	const steps = t.bookingFlow.steps;

	return (
		<nav aria-label={t.bookingFlow.stepsLabel}>
			<ol className="flex items-center">
				{steps.map((label, index) => {
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
							{index < steps.length - 1 && (
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
