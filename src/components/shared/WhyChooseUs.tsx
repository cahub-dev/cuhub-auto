"use client";

import { Globe, HardHat, ShieldCheck, Timer, Truck } from "lucide-react";
import type React from "react";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { useI18n } from "#/lib/i18n";

const ICONS = [Truck, HardHat, Timer, Globe, ShieldCheck] as const;
// The photo tile sits in the middle of the second row, as in Backhoe.
const PHOTO_SLOT = 4;

export function WhyChooseUs(): React.JSX.Element {
	const { t } = useI18n();
	const items = t.whyChooseUs.items;

	const cards = items.map((item, idx) => {
		const Icon = ICONS[idx] ?? Truck;
		return (
			<div
				key={item.title}
				className="border border-[#ececec] bg-white p-7 transition-shadow hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.3)]"
			>
				<span className="relative inline-flex">
					<Icon
						className="size-10 text-[#313131]"
						strokeWidth={1.25}
						aria-hidden="true"
					/>
					<span
						className="absolute -right-1 -top-1 size-3 rounded-full bg-primary"
						aria-hidden="true"
					/>
				</span>
				<h3 className="display-title mt-5 text-xl font-bold text-[#313131]">
					{item.title}
				</h3>
				<p className="mt-3 text-sm leading-6 text-[#202020]">
					{item.description}
				</p>
			</div>
		);
	});

	cards.splice(
		PHOTO_SLOT,
		0,
		<img
			key="photo"
			src="/equipment/excavators/develon-dx220-3.webp"
			alt=""
			loading="lazy"
			className="hidden h-full min-h-56 w-full object-cover lg:block"
		/>,
	);

	return (
		<section className="py-20 md:py-28">
			<div className="page-wrap">
				<SectionHeading
					ghost={t.home.features.ghost}
					title={t.home.features.title}
					className="mb-12 md:mb-16"
				/>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>
			</div>
		</section>
	);
}
