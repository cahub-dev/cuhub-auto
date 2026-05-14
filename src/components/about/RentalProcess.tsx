import type React from "react";

const STEPS = [
	{ number: "01", title: "Client Request" },
	{ number: "02", title: "Technical Assessment" },
	{ number: "03", title: "Commercial Proposal" },
	{ number: "04", title: "Contract Signing" },
	{ number: "05", title: "Equipment Delivery" },
	{ number: "06", title: "Operational Period" },
	{ number: "07", title: "Return & Closure" },
] as const;

export function RentalProcess(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24 overflow-hidden" style={{ background: "#f9f8f7" }}>
			<div className="page-wrap">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-20">
					<div>
						<span className="island-kicker inline-block mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
							HOW IT WORKS
						</span>
						<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight mt-1">
							Our Rental Process
						</h2>
					</div>
					<p className="text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed">
						Seven steps from first contact<br className="hidden md:block" /> to project completion.
					</p>
				</div>

				{/* Steps grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14">
					{STEPS.map((step, idx) => (
						<div key={step.number} className="relative flex flex-col gap-3">
							{/* Connector line to next step (not last in row) */}
							{idx < STEPS.length - 1 && (
								<div
									className="absolute top-7 left-full hidden lg:block w-full h-px pointer-events-none"
									style={{
										background: "linear-gradient(to right, var(--color-coral-glow-400) 0%, transparent 100%)",
										opacity: 0.2,
										width: "calc(100% - 1rem)",
										left: "calc(100% + 0.5rem)",
									}}
									aria-hidden="true"
								/>
							)}

							{/* Big number */}
							<span
								className="display-title font-extrabold leading-none select-none"
								style={{
									fontSize: "clamp(3rem, 5vw, 4.5rem)",
									color: "var(--color-coral-glow-400)",
									opacity: 0.9,
								}}
							>
								{step.number}
							</span>

							{/* Divider */}
							<div
								className="w-8 h-0.5 rounded-full"
								style={{ background: "var(--color-coral-glow-400)" }}
							/>

							{/* Title */}
							<h3 className="font-semibold text-foreground text-base leading-snug">
								{step.title}
							</h3>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
