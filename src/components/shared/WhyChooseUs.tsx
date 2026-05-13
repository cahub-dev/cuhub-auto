import { BadgeCheck, Globe, ShieldCheck, Timer, Truck } from "lucide-react";
import type React from "react";

const ADVANTAGES = [
	{
		icon: <Truck className="size-7 text-primary" />,
		title: "Modern Fleet",
		description:
			"Well maintained and high-performance equipment ensuring operational efficiency across all projects.",
	},
	{
		icon: <BadgeCheck className="size-7 text-primary" />,
		title: "Qualified Technical Team",
		description:
			"Experienced professionals committed to safety and excellence in every operation.",
	},
	{
		icon: <Globe className="size-7 text-primary" />,
		title: "Nationwide Coverage",
		description:
			"Operational capacity across multiple regions of Mozambique with bases in all provinces.",
	},
	{
		icon: <Timer className="size-7 text-primary" />,
		title: "Rapid Response",
		description:
			"Efficient service delivery with minimal turnaround time to keep your projects on schedule.",
	},
	{
		icon: <ShieldCheck className="size-7 text-primary" />,
		title: "Competitive Pricing",
		description:
			"Cost-effective solutions without compromising quality or operational standards.",
	},
];

export function WhyChooseUs(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24">
			<div className="page-wrap">
				{/* Header */}
				<div className=" flex flex-col items-center text-center mb-10 md:mb-14">
					<span className="island-kicker inline-block mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
						WHY CHOOSE US
					</span>
					<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight">
						Competitive Advantages
					</h2>
				</div>

				{/* Bento Grid: 3 top, 2 bottom */}
				<div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
					{ADVANTAGES.map((item, idx) => {
						const isTopRow = idx < 3;
						return (
							<div
								key={item.title}
								className={` flex flex-col gap-4 p-6 bg-white rounded-2xl border border-border/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
									isTopRow ? "lg:col-span-2" : "lg:col-span-3"
								}`}
							>
								<div className="flex items-center justify-center size-14 rounded-xl bg-accent">
									{item.icon}
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="text-base font-semibold text-foreground">
										{item.title}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{item.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
