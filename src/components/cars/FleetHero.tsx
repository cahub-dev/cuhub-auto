import type React from "react";

export function FleetHero(): React.JSX.Element {
	return (
		<section className="relative flex min-h-[240px] items-center justify-center overflow-hidden md:min-h-[320px]">
			<img
				src="/sliders/slider_3.png"
				alt="CA HUB AUTO vehicle and equipment fleet"
				className="absolute inset-0 h-full w-full object-cover"
			/>
			<div className="absolute inset-0 bg-black/45" aria-hidden="true" />
			<div className="relative z-10 px-5 text-center">
				<p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-white/80">
					Reliable fleet for demanding operations
				</p>
				<h1 className="display-title text-5xl font-extrabold tracking-tight text-white md:text-6xl">
					Our Fleet
				</h1>
			</div>
		</section>
	);
}
