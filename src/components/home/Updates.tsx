"use client";

import type React from "react";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { UPDATES } from "#/data/site-content";
import { useI18n } from "#/lib/i18n";

/** Hidden until real posts are added in src/data/site-content.ts. */
export function Updates(): React.JSX.Element | null {
	const { t } = useI18n();
	if (UPDATES.length === 0) return null;

	return (
		<section className="py-20 md:py-28">
			<div className="page-wrap">
				<SectionHeading
					ghost={t.home.updates.ghost}
					title={t.home.updates.title}
					className="mb-14"
				/>
				<ul className="grid gap-6 md:grid-cols-3">
					{UPDATES.map((post) => (
						<li key={post.title} className="shadow-card">
							<div className="relative border-b-2 border-primary">
								<img
									src={post.image}
									alt=""
									className="aspect-[16/9] w-full object-cover"
									loading="lazy"
								/>
								<span className="absolute -bottom-3 right-4 bg-primary px-2 py-0.5 text-xs font-bold uppercase text-white">
									{post.tag}
								</span>
							</div>
							<div className="p-6">
								<p className="text-xs uppercase text-[#999]">{post.date}</p>
								<h3 className="display-title mt-3 text-lg font-bold text-[#313131]">
									{post.title}
								</h3>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
