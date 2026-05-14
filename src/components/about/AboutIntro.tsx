import type React from "react";

const STATS = [
	{ value: "2023", label: "Founded" },
	{ value: "10", label: "Provinces" },
	{ value: "3+", label: "Industries" },
	{ value: "24/7", label: "Support" },
] as const;

export function AboutIntro(): React.JSX.Element {
	return (
		<section className="py-16 md:py-24">
			<div className="page-wrap">
				<div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20 items-start">
					{/* Left: text */}
					<div className="flex flex-col gap-6">
						<div>
							<span className="island-kicker inline-block mb-3 px-3 py-1 rounded-full text-primary font-semibold text-xs tracking-wider bg-accent">
								WHO WE ARE
							</span>
							<h2 className="display-title text-3xl md:text-4xl font-bold text-foreground tracking-tight mt-2">
								Who is CA HUB AUTO?
							</h2>
						</div>

						<p className="text-base leading-relaxed text-muted-foreground">
							Founded in 2023, CA HUB AUTO specializes in vehicle rental, providing a wide
							range of vehicles and machinery adapted to the needs of various sectors. Our
							fleet includes double-cab vehicles, vehicles for construction and mining,
							excavators, wheel loaders, and other heavy equipment essential for
							infrastructure development and mineral exploration.
						</p>

						<p className="text-base leading-relaxed text-muted-foreground">
							With operations covering major hubs in Mozambique, CA HUB AUTO is committed
							to offering reliable, efficient, and customized transport solutions to support
							projects throughout the country. We cater to sectors in mining, construction,
							and telecommunications.
						</p>

						<p className="text-base leading-relaxed text-muted-foreground">
							Driven by professionalism and customer satisfaction, our goal is to be your
							trusted partner in mobility and machinery services in Mozambique.
						</p>
					</div>

					{/* Right: stats */}
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4">
							{STATS.map(({ value, label }) => (
								<div
									key={label}
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
										{label}
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
								Sectors We Serve
							</p>
							<div className="flex flex-wrap gap-2">
								{["Mining", "Construction", "Infrastructure", "Telecommunications", "Rural Logistics"].map(
									(sector) => (
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
									),
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
