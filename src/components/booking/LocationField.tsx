import { ChevronDown, MapPin } from "lucide-react";
import type React from "react";

export const LOCATIONS: readonly string[] = [
	"Maputo",
	"Beira",
	"Nampula",
	"Quelimane",
	"Tete",
	"Pemba",
	"Chimoio",
	"Inhambane",
	"Lichinga",
	"Xai-Xai",
] as const;

export function LocationField({
	id,
	value,
	onChange,
	label,
}: {
	id: string;
	value: string;
	onChange: (v: string) => void;
	label: string;
}): React.JSX.Element {
	return (
		<div className="booking-field">
			<label htmlFor={id} className="booking-field-label">
				{label}
			</label>
			<div className="booking-field-control">
				<MapPin
					className="size-4 text-muted-foreground shrink-0"
					aria-hidden="true"
				/>
				<select
					id={id}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="booking-select"
				>
					{LOCATIONS.map((loc) => (
						<option key={loc} value={loc}>
							{loc}
						</option>
					))}
				</select>
				<ChevronDown
					className="size-3.5 text-muted-foreground shrink-0"
					aria-hidden="true"
				/>
			</div>
		</div>
	);
}
