import { Check, HelpCircle } from "lucide-react";
import type React from "react";
import {
	type UpdateBookingRequest,
} from "#/components/booking/booking-request-options";
import { FEATURED_FLEET } from "#/components/cars/FeaturedFleet";
import type { FleetCardData } from "#/components/cars/FleetCard";
import type { BookingRequest } from "#/lib/booking-message";

const CATEGORY_MAP: Record<string, string> = {
	"toyota-land-cruiser": "Vehicle",
	"nissan-navara-single": "Vehicle",
	"nissan-navara-double": "Vehicle",
	"develon-loader": "Heavy equipment",
	"develon-excavator": "Heavy equipment",
	"scania-mining": "Truck",
};

const NOT_SURE = "Not sure, advise me";

export function BookingFleetStep({
	request,
	update,
}: {
	request: BookingRequest;
	update: UpdateBookingRequest;
}): React.JSX.Element {
	function handleSelect(item: FleetCardData): void {
		update("fleetRequest", item.name);
		update("category", CATEGORY_MAP[item.id] ?? "Vehicle");
	}

	function handleNotSure(): void {
		update("fleetRequest", NOT_SURE);
	}

	const selected = request.fleetRequest;

	return (
		<div className="grid gap-5">
			<p className="text-sm font-semibold text-foreground">
				Select a vehicle or equipment
			</p>

			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{FEATURED_FLEET.map((item) => {
					const isSelected = selected === item.name;
					return (
						<button
							key={item.id}
							type="button"
							onClick={() => handleSelect(item)}
							className={`relative flex flex-col rounded-xl border-2 overflow-hidden text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
								isSelected
									? "border-primary shadow-sm"
									: "border-border/50 bg-white hover:border-primary/40"
							}`}
						>
							{/* Image */}
							<div className="aspect-[4/3] overflow-hidden bg-muted/20">
								<img
									src={item.image}
									alt={item.name}
									className="w-full h-full object-contain p-3"
									loading="lazy"
								/>
							</div>

							{/* Label */}
							<div
								className={`px-3 py-2.5 flex-1 ${
									isSelected ? "bg-accent" : "bg-white"
								}`}
							>
								<p
									className={`text-xs font-semibold leading-snug ${
										isSelected ? "text-primary" : "text-foreground"
									}`}
								>
									{item.name}
								</p>
								<div className="flex flex-wrap gap-x-2 mt-1">
									{item.sectors.slice(0, 2).map((s) => (
										<span
											key={s}
											className="text-[10px] text-muted-foreground"
										>
											{s}
										</span>
									))}
								</div>
							</div>

							{/* Selected badge */}
							{isSelected && (
								<div className="absolute top-2 right-2 size-5 rounded-full bg-primary flex items-center justify-center">
									<Check className="size-3 text-white" strokeWidth={3} />
								</div>
							)}
						</button>
					);
				})}

				{/* Not sure card */}
				<button
					type="button"
					onClick={handleNotSure}
					className={`flex flex-col items-center justify-center gap-2.5 rounded-xl border-2 p-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[140px] ${
						selected === NOT_SURE
							? "border-primary bg-accent text-primary"
							: "border-border/50 border-dashed bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
					}`}
				>
					<HelpCircle className="size-6" />
					<span className="text-xs font-semibold leading-snug">
						Not sure,
						<br />
						advise me
					</span>
				</button>
			</div>
		</div>
	);
}
