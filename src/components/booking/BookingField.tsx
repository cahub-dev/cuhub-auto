import type React from "react";

export function BookingField({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}): React.JSX.Element {
	return (
		<div className="grid gap-2 text-sm font-semibold text-foreground">
			<span>{label}</span>
			{children}
		</div>
	);
}
