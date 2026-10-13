"use client";

import { Phone } from "lucide-react";
import type React from "react";
import { SALES_CONTACT } from "#/lib/contact-details";
import { Reveal } from "#/lib/motion";
import { cn } from "#/lib/utils";

interface BenefitsCopy {
	kicker: string;
	title: string;
	paragraphs: readonly string[];
	points: readonly { title: string; text: string }[];
	call?: string;
}

/**
 * Backhoe "benefits" block: a white shadow card overlapping a photo that
 * sits on an offset orange block. `reverse` mirrors it (photo on the left).
 */
export function BenefitsBlock({
	copy,
	image,
	reverse = false,
}: {
	copy: BenefitsCopy;
	image: string;
	reverse?: boolean;
}): React.JSX.Element {
	return (
		<section className="py-12 md:py-20">
			<div
				className={cn(
					"page-wrap relative grid items-center lg:grid-cols-2",
					reverse && "lg:[&>*:first-child]:order-2",
				)}
			>
				<Reveal
					variant={reverse ? "right" : "left"}
					className={cn(
						"shadow-card relative z-10 p-8 md:p-12",
						reverse ? "lg:-ml-16" : "lg:-mr-16",
					)}
				>
					<span className="section-kicker">{copy.kicker}</span>
					<h2 className="block-title mt-2">{copy.title}</h2>
					{copy.paragraphs.map((paragraph) => (
						<p
							key={paragraph}
							className="mt-4 text-[15px] leading-7 text-[#202020]"
						>
							{paragraph}
						</p>
					))}
					<div className="mt-8 grid gap-6 sm:grid-cols-2">
						{copy.points.map((point) => (
							<div key={point.title}>
								<h3 className="display-title text-xl font-bold text-[#313131]">
									{point.title}
								</h3>
								<p className="mt-1.5 text-sm leading-6 text-[#202020]">
									{point.text}
								</p>
							</div>
						))}
					</div>
					{copy.call && (
						<a
							href={`tel:${SALES_CONTACT.phoneE164}`}
							className="mt-8 inline-flex items-center gap-4 text-sm text-[#202020] no-underline"
						>
							<span className="flex size-14 items-center justify-center rounded-full bg-primary/10">
								<span className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
									<Phone className="size-4" aria-hidden="true" />
								</span>
							</span>
							<span className="leading-5">
								{copy.call}
								<br />
								<strong className="text-primary">
									{SALES_CONTACT.phoneDisplay}
								</strong>
							</span>
						</a>
					)}
				</Reveal>

				<Reveal
					variant={reverse ? "left" : "right"}
					delay={150}
					className="relative mt-10 lg:mt-0"
				>
					<span
						className={cn(
							"absolute -bottom-6 hidden h-3/5 w-1/3 bg-primary md:block",
							reverse ? "-left-6" : "-right-6",
						)}
						aria-hidden="true"
					/>
					<img
						src={image}
						alt=""
						loading="lazy"
						className="relative aspect-[4/3.4] w-full object-cover"
					/>
				</Reveal>
			</div>
		</section>
	);
}
