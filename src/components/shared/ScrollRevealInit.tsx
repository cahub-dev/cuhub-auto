import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function ScrollRevealInit(): null {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	useEffect(() => {
		const els = document.querySelectorAll<Element>(
			".motion-scroll-reveal:not(.is-visible)",
		);
		if (!els.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.08, rootMargin: "0px 0px -48px 0px" },
		);

		for (const el of els) observer.observe(el);
		return () => observer.disconnect();
	}, [pathname]);

	return null;
}
