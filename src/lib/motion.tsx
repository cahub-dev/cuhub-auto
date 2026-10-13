"use client";

import Lenis from "lenis";
import type React from "react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "#/lib/utils";

/**
 * Runs before first paint (see __root.tsx). Adds `motion-ready` to <html>
 * only when the visitor allows motion, so reveal styles never hide content
 * when JavaScript is off or "reduce motion" is on.
 */
export const MOTION_BOOT_SCRIPT = `try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion-ready")}catch(e){}`;

function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Lenis smooth scrolling for wheel and trackpad; touch keeps native scroll. */
export function SmoothScroll(): null {
	useEffect(() => {
		if (prefersReducedMotion()) return;
		const lenis = new Lenis({ autoRaf: true, duration: 1.1, anchors: true });
		return () => lenis.destroy();
	}, []);
	return null;
}

/** True once the element has scrolled into view (fires once). */
function useInView<T extends Element>(): [React.RefObject<T | null>, boolean] {
	const ref = useRef<T>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
			setInView(true);
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return [ref, inView];
}

type RevealVariant = "up" | "left" | "right" | "zoom";

/** Fades its content in when it scrolls into view. `delay` is in ms. */
export function Reveal({
	children,
	variant = "up",
	delay = 0,
	className,
	as: Tag = "div",
	"data-testid": testId,
}: {
	children: React.ReactNode;
	variant?: RevealVariant;
	delay?: number;
	className?: string;
	as?: "div" | "li";
	"data-testid"?: string;
}): React.JSX.Element {
	const [ref, inView] = useInView<HTMLDivElement & HTMLLIElement>();
	const style: CSSProperties | undefined = delay
		? { transitionDelay: `${delay}ms` }
		: undefined;

	return (
		<Tag
			ref={ref}
			data-reveal={variant}
			data-testid={testId}
			className={cn(inView && "is-revealed", className)}
			style={style}
		>
			{children}
		</Tag>
	);
}

/**
 * Counts up to a numeric value when it scrolls into view. Values that are
 * not plain numbers (e.g. "24/7") are shown as they are.
 */
export function CountUp({
	value,
	className,
}: {
	value: string;
	className?: string;
}): React.JSX.Element {
	const [ref, inView] = useInView<HTMLSpanElement>();
	const target = /^\d+$/.test(value) ? Number(value) : null;
	// Years count from a nearby start so "2023" does not run up from 0.
	const from = target !== null && target > 1900 ? target - 23 : 0;
	// Server render shows the final value (no-JS, SEO); the client rewinds it
	// before it scrolls into view.
	const [current, setCurrent] = useState(target ?? 0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: rewind once on mount
	useEffect(() => {
		if (target !== null && !prefersReducedMotion()) setCurrent(from);
	}, []);

	useEffect(() => {
		if (!inView || target === null || prefersReducedMotion()) return;
		const duration = 1400;
		const start = performance.now();
		let frame = 0;
		const tick = (now: number) => {
			const progress = Math.min(1, (now - start) / duration);
			const eased = 1 - (1 - progress) ** 3;
			setCurrent(Math.round(from + (target - from) * eased));
			if (progress < 1) frame = requestAnimationFrame(tick);
		};
		setCurrent(from);
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [inView, target, from]);

	return (
		<span ref={ref} className={className}>
			{target === null ? value : current}
		</span>
	);
}
