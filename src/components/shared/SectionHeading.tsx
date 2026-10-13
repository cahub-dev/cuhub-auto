import type React from "react";
import { Reveal } from "#/lib/motion";
import { cn } from "#/lib/utils";

/** Backhoe-style heading: outlined ghost word behind a heavy uppercase title. */
export function SectionHeading({
	ghost,
	title,
	dark = false,
	id,
	className,
}: {
	ghost: string;
	title: string;
	dark?: boolean;
	id?: string;
	className?: string;
}): React.JSX.Element {
	return (
		<Reveal
			className={cn(
				"section-heading",
				dark && "section-heading-dark",
				className,
			)}
		>
			<span className="section-heading-ghost" aria-hidden="true">
				{ghost}
			</span>
			<h2 id={id} className="section-heading-title">
				{title}
			</h2>
			<span className="section-heading-bar" aria-hidden="true" />
		</Reveal>
	);
}
