import type React from "react";
import type { CarSpec } from "#/components/cars/car-detail-data";

export function CarSpecsGrid({ specs }: { specs: CarSpec[] }): React.JSX.Element {
	return (
		<div className="grid grid-cols-1 gap-5 border-y border-border/60 py-8 sm:grid-cols-2 lg:grid-cols-4">
			{specs.map((spec) => {
				const Icon = spec.icon;

				return (
					<div key={spec.label} className="flex items-center gap-3">
						<span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
							<Icon className="size-5" aria-hidden="true" />
						</span>
						<span className="min-w-0">
							<span className="block text-sm text-muted-foreground">
								{spec.label}
							</span>
							<span className="block font-semibold text-foreground">{spec.value}</span>
						</span>
					</div>
				);
			})}
		</div>
	);
}
