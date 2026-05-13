"use client";

import { Play, XIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";

// CAHUB-TODO: Replace with the actual CA HUB AUTO YouTube video embed URL
const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export function VideoSection(): React.JSX.Element {
	const [open, setOpen] = useState(false);

	return (
		<section className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
			{/* Background image */}
			<img
				src="/video_placeholder.webp"
				alt="Video thumbnail"
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black/30" />

			{/* Play button */}
			<div className="absolute inset-0 flex items-center justify-center">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<button
							type="button"
							className="flex items-center justify-center size-20 md:size-24 rounded-full bg-white shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
							aria-label="Play video"
						>
							<Play className="size-8 md:size-10 text-primary fill-primary ml-1" />
						</button>
					</DialogTrigger>
					<DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl p-0 border-0 bg-black overflow-hidden">
						<DialogTitle className="sr-only">Company Video</DialogTitle>
						<div className="relative aspect-video w-full">
							<iframe
								src={YOUTUBE_EMBED_URL}
								title="CA HUB AUTO Company Video"
								className="absolute inset-0 w-full h-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer"
							aria-label="Close video"
						>
							<XIcon className="size-4" />
						</button>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
