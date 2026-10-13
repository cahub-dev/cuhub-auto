"use client";

import { Check } from "lucide-react";
import type React from "react";
import { MachineBox } from "#/components/equipment/MachineBox";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { getEquipment } from "#/data/equipment";
import { useI18n } from "#/lib/i18n";
import { Reveal } from "#/lib/motion";
import { cn } from "#/lib/utils";

function BrowserMock(): React.JSX.Element {
	const { t } = useI18n();
	return (
		<div className="mx-auto w-full max-w-lg rounded-md bg-[#e9e9e9] p-2 shadow-[0_30px_50px_-30px_rgba(0,0,0,0.45)]">
			<div className="flex gap-1.5 pb-2 pl-1">
				<span className="size-2 rounded-full bg-[#ff5f57]" />
				<span className="size-2 rounded-full bg-[#febc2e]" />
				<span className="size-2 rounded-full bg-[#28c840]" />
			</div>
			<div className="relative aspect-[16/9] overflow-hidden">
				<img
					src="/hero/mining-hero.webp"
					alt=""
					loading="lazy"
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-6 text-center">
					<p className="display-title text-lg font-extrabold uppercase text-white">
						{t.hero.title}
					</p>
					<div className="mt-3 grid w-full grid-cols-[1fr_1fr_auto] gap-1.5 bg-black/60 p-1.5">
						<span className="h-4 bg-white" />
						<span className="h-4 bg-white" />
						<span className="h-4 w-10 bg-primary" />
					</div>
				</div>
			</div>
		</div>
	);
}

function QuoteMock(): React.JSX.Element {
	const { language, t } = useI18n();
	const item = getEquipment("mobile-jaw-crusher");
	if (!item) return <div />;
	return (
		<div className="relative mx-auto w-full max-w-md">
			<span
				className="absolute inset-0 translate-x-[-10px] translate-y-[10px] border border-primary/50 bg-white"
				aria-hidden="true"
			/>
			<span
				className="absolute inset-0 translate-x-[-5px] translate-y-[5px] border border-primary/60 bg-white"
				aria-hidden="true"
			/>
			<div className="relative flex gap-4 border border-primary bg-white p-4 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.4)]">
				<MachineBox item={item} className="h-24 w-28 shrink-0 border-0" />
				<div className="min-w-0 text-xs leading-5 text-[#202020]">
					<p className="display-title text-sm font-bold">
						{item.name[language]}
					</p>
					<p className="font-semibold text-primary">
						{t.home.process.quoteStatus}
					</p>
					{t.home.process.quoteLines.map((line) => (
						<p key={line}>{line}</p>
					))}
				</div>
			</div>
			<span className="absolute -top-6 right-0 flex size-14 sm:-right-5 sm:size-16 items-center justify-center rounded-full border-4 border-white bg-[#5cb85c] text-white shadow-lg">
				<Check className="size-8" strokeWidth={3} aria-hidden="true" />
			</span>
		</div>
	);
}

function DeliveryMock(): React.JSX.Element {
	const loader = getEquipment("develon-loader");
	const truck = getEquipment("scania-mining");
	return (
		<div className="relative mx-auto h-60 w-full max-w-lg md:h-80">
			{truck?.cutout && (
				<img
					src={truck.cutout}
					alt=""
					loading="lazy"
					className="absolute right-0 top-0 w-3/4 mix-blend-multiply"
				/>
			)}
			{loader?.cutout && (
				<img
					src={loader.cutout}
					alt=""
					loading="lazy"
					className="absolute bottom-0 left-0 w-3/4 mix-blend-multiply"
				/>
			)}
		</div>
	);
}

function DashedArrow({ flip = false }: { flip?: boolean }): React.JSX.Element {
	return (
		<svg
			viewBox="0 0 600 120"
			className={cn(
				"mx-auto my-6 hidden h-36 w-3/5 text-primary/50 md:block",
				flip && "-scale-x-100",
			)}
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M520 10 C 520 80, 380 90, 300 60 S 80 40, 80 112"
				stroke="currentColor"
				strokeWidth="2"
				strokeDasharray="7 7"
			/>
			<path d="M72 100 L80 116 L88 100" stroke="currentColor" strokeWidth="2" />
		</svg>
	);
}

const VISUALS = [BrowserMock, QuoteMock, DeliveryMock] as const;

export function HowItWorks(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<section className="py-20 md:py-28">
			<div className="page-wrap">
				<SectionHeading
					ghost={t.home.process.ghost}
					title={t.home.process.title}
					className="mb-14 md:mb-20"
				/>

				<ol className="space-y-16 md:space-y-0">
					{t.howItWorks.steps.map((step, index) => {
						const Visual = VISUALS[index] ?? BrowserMock;
						const reverse = index % 2 === 1;
						return (
							<li key={step.title}>
								{index > 0 && <DashedArrow flip={reverse} />}
								<div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
									<Reveal
										variant={reverse ? "right" : "left"}
										className={cn("flex gap-4", reverse && "md:order-2")}
									>
										<span className="display-title text-5xl font-bold leading-none text-primary">
											{index + 1}
										</span>
										<div className="flex-1">
											<h3 className="display-title border-b-2 border-primary pb-2 text-xl font-bold text-[#313131] md:text-2xl">
												{step.title}
											</h3>
											<p className="mt-4 text-[15px] leading-7 text-[#555]">
												{step.description}
											</p>
										</div>
									</Reveal>
									<Reveal
										variant={reverse ? "left" : "right"}
										delay={150}
										className={cn(reverse && "md:order-1")}
									>
										<Visual />
									</Reveal>
								</div>
							</li>
						);
					})}
				</ol>
			</div>
		</section>
	);
}
