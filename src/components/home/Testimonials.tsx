"use client";

import type React from "react";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { TESTIMONIALS } from "#/data/site-content";
import { useI18n } from "#/lib/i18n";

/** Hidden until real testimonials are added in src/data/site-content.ts. */
export function Testimonials(): React.JSX.Element | null {
	const { t } = useI18n();
	const [first] = TESTIMONIALS;
	if (!first) return null;

	return (
		<section className="bg-black py-20 text-white md:py-28">
			<div className="page-wrap">
				<SectionHeading
					ghost={t.home.testimonials.ghost}
					title={t.home.testimonials.title}
					dark
					className="mb-14"
				/>
				<figure className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
					{first.photo && (
						<img
							src={first.photo}
							alt=""
							className="aspect-[16/10] w-full object-cover"
							loading="lazy"
						/>
					)}
					<div className="bg-black/80 p-8 md:-ml-24">
						<blockquote className="text-lg leading-8">{first.quote}</blockquote>
						<figcaption className="mt-6 text-sm font-semibold">
							{first.name} —{" "}
							<span className="text-white/70">{first.company}</span>
						</figcaption>
					</div>
				</figure>
			</div>
		</section>
	);
}
