import type React from "react";

export function ContactHero(): React.JSX.Element {
	return (
		<section className="relative flex min-h-[240px] items-center justify-center overflow-hidden md:min-h-[320px]">
			<img
				src="/sliders/slider_2.webp"
				alt="CA HUB AUTO heavy equipment operations"
				className="motion-image-zoom absolute inset-0 h-full w-full object-cover"
			/>
			<div className="absolute inset-0 bg-black/45" aria-hidden="true" />
			<div className="motion-rise-in relative z-10 px-5 text-center">
				<p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-white/80">
					Where logistics meets performance
				</p>
				<h1 className="display-title text-5xl font-extrabold tracking-tight text-white md:text-6xl">
					Contact Us
				</h1>
			</div>
		</section>
	);
}
