import type React from "react";

export interface CarType {
	id: string;
	name: string;
	image: string;
}

export function CarTypeCard({ type }: { type: CarType }): React.JSX.Element {
	return (
		<button
			type="button"
			className="group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
		>
			<div className="relative w-full aspect-[16/9] flex items-center justify-center">
				<img
					src={type.image}
					alt={type.name}
					className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
					loading="lazy"
				/>
			</div>
			<span className="text-sm font-semibold text-foreground">{type.name}</span>
		</button>
	);
}
