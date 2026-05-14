import type React from "react";

export function AboutHero(): React.JSX.Element {
	return (
		<section className="relative flex min-h-[240px] items-center justify-center overflow-hidden md:min-h-[340px]">
			<img
				src="/sliders/slider_3.webp"
				alt="CA HUB AUTO heavy equipment in operation"
				className="absolute inset-0 h-full w-full object-cover"
			/>
			<div className="absolute inset-0 bg-black/50" aria-hidden="true" />
			<div className="relative z-10 px-5 text-center">
				<p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-white/75">
					Founded in Mozambique · 2023
				</p>
				<h1 className="display-title text-5xl font-extrabold tracking-tight text-white md:text-6xl">
					About Us
				</h1>
				<p className="mt-4 max-w-xl mx-auto text-base text-white/80">
					Where Logistics Meets Performance
				</p>
			</div>
		</section>
	);
}
