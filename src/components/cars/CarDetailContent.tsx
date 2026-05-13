import { Check, X } from "lucide-react";
import type React from "react";
import type { CarDetailData } from "#/components/cars/car-detail-data";

export function CarDetailContent({ car }: { car: CarDetailData }): React.JSX.Element {
	return (
		<div className="space-y-10">
			<section>
				<h2 className="display-title mb-4 text-2xl font-bold text-foreground">
					About this Vehicle
				</h2>
				<p className="max-w-3xl text-base leading-7 text-muted-foreground">
					{car.description}
				</p>
			</section>

			<section>
				<h2 className="display-title mb-5 text-2xl font-bold text-foreground">
					Included and Excluded
				</h2>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-4">
						{car.included.map((item) => (
							<ListItem key={item} icon="check" text={item} />
						))}
					</div>
					<div className="space-y-4">
						{car.excluded.map((item) => (
							<ListItem key={item} icon="x" text={item} />
						))}
					</div>
				</div>
			</section>

			<section>
				<h2 className="display-title mb-4 text-2xl font-bold text-foreground">
					Top Highlights
				</h2>
				<ul className="space-y-4">
					{car.highlights.map((item) => (
						<li key={item} className="flex items-start gap-3">
							<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
								<Check className="size-3.5" aria-hidden="true" />
							</span>
							<span className="text-foreground">{item}</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

function ListItem({
	icon,
	text,
}: {
	icon: "check" | "x";
	text: string;
}): React.JSX.Element {
	const isIncluded = icon === "check";

	return (
		<div className="flex items-start gap-3">
			{isIncluded ? (
				<Check className="mt-0.5 size-5 shrink-0 text-green-500" aria-hidden="true" />
			) : (
				<X className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
			)}
			<span className="text-sm leading-6 text-foreground">{text}</span>
		</div>
	);
}
