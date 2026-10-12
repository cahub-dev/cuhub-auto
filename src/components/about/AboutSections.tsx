"use client";

import {
	Clock,
	Eye,
	HardHat,
	Phone,
	ShieldCheck,
	Target,
	Truck,
	Wrench,
} from "lucide-react";
import type React from "react";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { SALES_CONTACT } from "#/lib/contact-details";
import { useI18n } from "#/lib/i18n";

/** Image on an offset orange block, intro copy on the right. */
export function AboutIntro(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section className="py-20 md:py-28">
			<div className="page-wrap grid items-center gap-14 lg:grid-cols-2">
				<div className="relative ml-6 mb-6">
					<span
						className="absolute -bottom-6 -left-6 h-3/4 w-full bg-primary"
						aria-hidden="true"
					/>
					<img
						src="/equipment/excavators/develon-dx220-1.webp"
						alt=""
						className="relative aspect-[4/3] w-[88%] object-cover"
					/>
				</div>
				<div>
					<h2 className="block-title">{t.about.introTitle}</h2>
					{t.about.paragraphs.map((paragraph) => (
						<p
							key={paragraph}
							className="mt-4 text-[15px] leading-7 text-[#202020]"
						>
							{paragraph}
						</p>
					))}
					<a
						href={`tel:${SALES_CONTACT.phoneE164}`}
						className="mt-8 inline-flex items-center gap-4 text-sm text-[#202020] no-underline"
					>
						<span className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
							<Phone className="size-4" aria-hidden="true" />
						</span>
						<span className="leading-5">
							{t.home.benefitsA.call}
							<br />
							<strong className="text-primary">
								{SALES_CONTACT.phoneDisplay}
							</strong>
						</span>
					</a>
				</div>
			</div>
		</section>
	);
}

const FEATURE_ICONS = [Target, Eye, ShieldCheck] as const;

/** Three icon features (mission, vision, values) without borders. */
export function AboutFeatures(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section className="pb-20 md:pb-24">
			<ul className="page-wrap grid gap-10 md:grid-cols-3">
				{t.about.cards.map((card, index) => {
					const Icon = FEATURE_ICONS[index] ?? Target;
					return (
						<li key={card.title}>
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
							<h3 className="display-title mt-4 text-xl font-bold text-[#313131]">
								{t.about.featuresTitles[index] ?? card.title}
							</h3>
							<p className="mt-2 text-sm leading-6 text-[#202020]">
								{card.items.join(" ")}
							</p>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

/** Orange statement box overlapping a white card of company facts. */
export function AboutStatBox(): React.JSX.Element {
	const { t } = useI18n();
	const icons = [Clock, Truck, Wrench, HardHat] as const;

	return (
		<section className="pb-20 md:pb-28">
			<div className="page-wrap relative">
				<div className="shadow-card grid gap-10 p-8 pt-56 md:p-12 lg:ml-[24%] lg:grid-cols-2 lg:pl-[18%]">
					{t.home.stats.map((stat, index) => {
						const Icon = icons[index] ?? Clock;
						return (
							<div key={stat.label} className="flex gap-4">
								<Icon
									className="size-9 shrink-0 text-primary"
									strokeWidth={1.25}
									aria-hidden="true"
								/>
								<div>
									<p className="display-title text-3xl font-bold text-[#313131]">
										{stat.value}
									</p>
									<p className="mt-1 text-sm text-[#555]">{stat.label}</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className="absolute left-4 right-4 top-[-1.5rem] bg-primary p-8 text-white md:p-10 lg:right-auto lg:top-[-2rem] lg:w-[40%]">
					<h2 className="block-title !text-white">{t.about.statBoxTitle}</h2>
					<p className="mt-4 text-sm leading-6 text-white/90">
						{t.about.statBoxText}
					</p>
				</div>
			</div>
		</section>
	);
}

/** Dark photo with a safety statement beside an orange "why us" block. */
export function AboutSplit(): React.JSX.Element {
	const { t } = useI18n();
	const icons = [Truck, HardHat, Wrench, Clock] as const;

	return (
		<section className="grid lg:grid-cols-2">
			<div className="relative flex min-h-[340px] items-end overflow-hidden bg-black p-8 md:p-12">
				<img
					src="/equipment/drilling-rigs/drill-rig-2.webp"
					alt=""
					loading="lazy"
					className="absolute inset-0 h-full w-full object-cover opacity-40"
				/>
				<div className="relative max-w-md text-white">
					<h3 className="display-title text-2xl font-bold">
						{t.about.safetyTitle}
					</h3>
					<p className="mt-2 text-sm leading-6 text-white/85">
						{t.about.safetyText}
					</p>
				</div>
			</div>
			<div className="bg-primary p-8 text-white md:p-12">
				<h2 className="block-title !text-white">{t.about.bestTitle}</h2>
				<p className="mt-3 text-sm leading-6 text-white/90">
					{t.about.bestText}
				</p>
				<ul className="mt-8 grid gap-6 sm:grid-cols-2">
					{t.whyChooseUs.items.slice(0, 4).map((item, index) => {
						const Icon = icons[index] ?? Truck;
						return (
							<li key={item.title} className="flex items-center gap-3">
								<Icon
									className="size-8 shrink-0 text-[#111]"
									strokeWidth={1.25}
									aria-hidden="true"
								/>
								<span className="display-title text-base font-bold">
									{item.title}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}

/** "Industries we serve": L-bracket list beside a photo. */
export function AboutIndustries(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section className="py-20 md:py-28">
			<div className="page-wrap">
				<SectionHeading
					ghost={t.about.industriesGhost}
					title={t.about.industriesTitle}
					className="mb-14"
				/>
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<ul className="grid gap-5">
						{t.about.sectors.map((sector) => (
							<li key={sector} className="relative pl-7">
								<span
									className="absolute left-0 top-0 h-full w-1.5 bg-primary"
									aria-hidden="true"
								/>
								<span
									className="absolute bottom-0 left-0 h-1.5 w-7 bg-primary"
									aria-hidden="true"
								/>
								<span className="shadow-card display-title block px-6 py-5 text-lg font-semibold text-[#313131]">
									{sector}
								</span>
							</li>
						))}
					</ul>
					<img
						src="/equipment/crushers/jaw-crusher-1.webp"
						alt=""
						loading="lazy"
						className="aspect-[4/3.6] w-full object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
