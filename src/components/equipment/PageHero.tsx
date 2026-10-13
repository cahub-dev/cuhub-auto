import type React from "react";

/** Backhoe-style inner page banner: plain dark band with a centered title. */
export function PageHero({
	title,
	as: Heading = "h1",
}: {
	title: string;
	/** Use "p" when the page has its own h1 (e.g. equipment detail). */
	as?: "h1" | "p";
}): React.JSX.Element {
	return (
		<section className="bg-[#222] py-14 text-center md:py-20">
			<Heading className="page-hero-title display-title text-4xl font-extrabold tracking-tight text-white md:text-5xl">
				{title}
			</Heading>
		</section>
	);
}
