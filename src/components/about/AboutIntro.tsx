"use client";

import type React from "react";
import { useI18n } from "#/lib/i18n";

const STATS = ["2023", "10", "3+", "24/7"] as const;

export function AboutIntro(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section className="py-16 md:py-24">
			<div className="page-wrap">
				<div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20 items-start">
					{/* Left: text */}
					<div className="flex flex-col gap-6">
						<div>
							<span className="island-kicker inline-block mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
								{t.about.introKicker}
							</span>
							<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight mt-2">
								{t.about.introTitle}
							</h2>
						</div>

						{t.about.paragraphs.map((paragraph) => (
							<p
								key={paragraph}
								className="text-base leading-relaxed text-muted-foreground"
							>
								{paragraph}
							</p>
						))}
					</div>

					{/* Right: stats */}
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4">
							{STATS.map((value, idx) => (
								<div
									key={value}
									className="flex flex-col items-center justify-center py-8 px-4 rounded-2xl border text-center"
									style={{
										borderColor: "var(--line)",
										background: "#f9f8f7",
									}}
								>
									<span
										className="display-title font-extrabold text-3xl"
										style={{ color: "var(--color-coral-glow-400)" }}
									>
										{value}
									</span>
									<span
										className="text-xs font-semibold tracking-widest uppercase mt-1.5"
										style={{ color: "var(--muted-foreground)" }}
									>
										{t.about.stats[idx]}
									</span>
								</div>
							))}
						</div>

						{/* Sectors served */}
						<div
							className="rounded-2xl border p-5"
							style={{ borderColor: "var(--line)", background: "#f9f8f7" }}
						>
							<p
								className="text-xs font-semibold tracking-widest uppercase mb-3"
								style={{ color: "var(--muted-foreground)" }}
							>
								{t.about.sectorsTitle}
							</p>
							<div className="flex flex-wrap gap-2">
								{t.about.sectors.map((sector) => (
									<span
										key={sector}
										className="px-3 py-1.5 rounded-full text-sm font-medium border"
										style={{
											borderColor: "var(--line)",
											background: "#fff",
										}}
									>
										{sector}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
