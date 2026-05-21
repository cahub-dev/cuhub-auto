"use client";

import { Play } from "lucide-react";
import type React from "react";

export function VideoSection(): React.JSX.Element {
	return (
		<section className=" relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
			{/* Background image */}
			<img
				src="/video_placeholder.webp"
				alt="Video thumbnail"
				className=" absolute inset-0 w-full h-full object-cover"
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black/30" />

			{/* Placeholder until the marketing team provides the official video. */}
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
				<div className="flex size-20 items-center justify-center rounded-full bg-white/90 shadow-lg md:size-24">
					<Play className="ml-1 size-8 fill-primary text-primary md:size-10" />
				</div>
				<p className="max-w-xs px-4 text-sm font-semibold md:text-base">
					Company video coming soon
				</p>
			</div>
		</section>
	);
}
