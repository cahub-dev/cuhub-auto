import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function ScrollRevealInit(): null {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	useEffect(() => {
		const els = Array.from(
			document.querySelectorAll<HTMLElement>(".motion-scroll-reveal"),
		);
		if (!els.length) {
			document.body.classList.add("motion-scroll-ready");
			return;
		}

		// 1. Immediately mark elements already in viewport — no flash
		const vh = window.innerHeight;
		for (const el of els) {
			const { top, bottom } = el.getBoundingClientRect();
			if (top < vh + 60 && bottom > 0) {
				el.classList.add("is-visible");
			}
		}

		// 2. Now enable scroll-reveal CSS (hides only the not-yet-visible ones)
		document.body.classList.add("motion-scroll-ready");

		// 3. Observe remaining off-screen elements
		const pending = els.filter((el) => !el.classList.contains("is-visible"));
		if (!pending.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.07, rootMargin: "0px 0px -40px 0px" },
		);

		for (const el of pending) observer.observe(el);
		return () => observer.disconnect();
	}, [pathname]);

	return null;
}
