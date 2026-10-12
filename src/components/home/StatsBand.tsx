"use client";

import { CalendarCheck, Clock, MapPinned, Tractor } from "lucide-react";
import type React from "react";
import { useI18n } from "#/lib/i18n";

const ICONS = [CalendarCheck, MapPinned, Tractor, Clock] as const;

/**
 * Black band with outlined numbers; `image` puts a dark photo behind it
 * (About page). Values are verifiable company facts.
 */
export function StatsBand({ image }: { image?: string }): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section className="relative overflow-hidden bg-[#0d0d0d] bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:6px_6px] py-16 md:py-20">
			{image && (
				<img
					src={image}
					alt=""
					loading="lazy"
					className="absolute inset-0 h-full w-full object-cover opacity-35"
				/>
			)}
			<ul className="page-wrap relative grid grid-cols-2 gap-10 text-center text-white lg:grid-cols-4">
				{t.home.stats.map((stat, index) => {
					const Icon = ICONS[index] ?? Clock;
					return (
						<li key={stat.label} className="flex flex-col items-center">
							<Icon
								className="size-11 text-primary"
								strokeWidth={1.25}
								aria-hidden="true"
							/>
							<span className="display-title mt-4 text-6xl font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]">
								{stat.value}
							</span>
							<span className="display-title mt-1 text-xl">{stat.label}</span>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
