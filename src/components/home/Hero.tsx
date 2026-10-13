"use client";

import { Link } from "@tanstack/react-router";
import type React from "react";
import { useI18n } from "#/lib/i18n";

export const HERO_IMAGE = "/hero/mining-hero.webp";

export function Hero(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section className="hero-section" aria-labelledby="hero-title">
			<img
				src={HERO_IMAGE}
				alt=""
				className="hero-bg"
				fetchPriority="high"
				draggable={false}
			/>
			<div className="page-wrap hero-inner">
				<div className="hero-intro flex flex-col items-center">
					<h1 id="hero-title" className="hero-title">
						{t.hero.title}
					</h1>
					<p className="hero-subtitle">{t.hero.subtitle}</p>

					<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
						<Link
							to="/fleet"
							className="inline-flex h-12 items-center justify-center bg-primary px-8 text-xs font-bold uppercase tracking-wider text-white no-underline transition-colors hover:bg-primary-hover"
						>
							{t.hero.viewEquipment}
						</Link>
						<Link
							to="/booking/new"
							className="inline-flex h-12 items-center justify-center border-2 border-white px-8 text-xs font-bold uppercase tracking-wider text-white no-underline transition-colors hover:bg-white hover:text-[#202020]"
						>
							{t.hero.requestQuote}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
