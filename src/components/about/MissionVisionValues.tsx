"use client";

import { Eye, Heart, Target } from "lucide-react";
import type React from "react";
import { useI18n } from "#/lib/i18n";

const CARDS = [
	{
		icon: <Target className="size-7 text-primary" />,
	},
	{
		icon: <Eye className="size-7 text-primary" />,
	},
	{
		icon: <Heart className="size-7 text-primary" />,
	},
] as const;

export function MissionVisionValues(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section className="py-16 md:py-24" style={{ background: "#f9f8f7" }}>
			<div className="page-wrap">
				{/* Header */}
				<div className="flex flex-col items-center text-center mb-10 md:mb-14">
					<span className="island-kicker inline-block mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
						{t.about.foundationKicker}
					</span>
					<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight">
						{t.about.foundationTitle}
					</h2>
				</div>

				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{CARDS.map((card, idx) => {
						const copy = t.about.cards[idx];
						return (
							<div
								key={copy.title}
								className="flex flex-col gap-5 p-7 bg-white rounded-2xl border hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow"
								style={{ borderColor: "var(--line)" }}
							>
								<div className="flex items-center justify-center size-14 rounded-xl bg-accent">
									{card.icon}
								</div>
								<h3 className="display-title text-xl font-bold text-foreground">
									{copy.title}
								</h3>
								<ul className="flex flex-col gap-3">
									{copy.items.map((item) => (
										<li
											key={item}
											className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
										>
											<span
												className="mt-1.5 size-1.5 rounded-full shrink-0"
												style={{ background: "var(--color-coral-glow-400)" }}
											/>
											{item}
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
