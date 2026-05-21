"use client";

import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "#/components/ui/button";
import { useI18n } from "#/lib/i18n";

const AUTOPLAY_MS = 6000;

function usePrefersReducedMotion(): boolean {
	const [reduced, setReduced] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = (): void => setReduced(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return reduced;
}

export function Hero(): React.JSX.Element {
	const [activeSlide, setActiveSlide] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = usePrefersReducedMotion();
	const { t } = useI18n();
	const slides = t.hero.slides;

	const goTo = useCallback(
		(idx: number) => {
			setActiveSlide(((idx % slides.length) + slides.length) % slides.length);
		},
		[slides.length],
	);

	const next = useCallback(() => goTo(activeSlide + 1), [activeSlide, goTo]);
	const prev = useCallback(() => goTo(activeSlide - 1), [activeSlide, goTo]);

	// Autoplay — paused on hover/focus or when the user prefers reduced motion
	useEffect(() => {
		if (isPaused || prefersReducedMotion) return;
		const id = setInterval(() => {
			setActiveSlide((p) => (p + 1) % slides.length);
		}, AUTOPLAY_MS);
		return () => clearInterval(id);
	}, [isPaused, prefersReducedMotion, slides.length]);

	// Keyboard navigation when the hero (or any descendant) has focus
	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;
		const onKey = (e: KeyboardEvent): void => {
			if (e.key === "ArrowRight") {
				e.preventDefault();
				next();
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				prev();
			}
		};
		el.addEventListener("keydown", onKey);
		return () => el.removeEventListener("keydown", onKey);
	}, [next, prev]);

	const slide = slides[activeSlide] ?? slides[0];

	return (
		<section
			ref={sectionRef}
			className="hero-section"
			aria-roledescription="carousel"
			aria-label={t.hero.aria}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onFocus={() => setIsPaused(true)}
			onBlur={() => setIsPaused(false)}
		>
			<div className="hero-slides-container" aria-hidden="true">
				{slides.map((s, idx) => (
					<div
						key={s.image}
						className={`hero-slide${idx === activeSlide ? " is-active" : ""}`}
					>
						<img
							src={s.image}
							alt=""
							draggable={false}
							loading="eager"
							fetchPriority={idx === 0 ? "high" : "low"}
						/>
					</div>
				))}
				<div className="hero-overlay" />
			</div>

			<button
				type="button"
				className="hero-arrow hero-arrow-left"
				aria-label={t.hero.previous}
				onClick={prev}
			>
				<ChevronLeft className="size-5" aria-hidden="true" />
			</button>
			<button
				type="button"
				className="hero-arrow hero-arrow-right"
				aria-label={t.hero.next}
				onClick={next}
			>
				<ChevronRight className="size-5" aria-hidden="true" />
			</button>

			<div className="hero-dots" role="tablist" aria-label={t.hero.select}>
				{slides.map((s, idx) => (
					<button
						key={s.image}
						type="button"
						role="tab"
						aria-selected={idx === activeSlide}
						aria-label={`${t.hero.slide} ${idx + 1} ${t.hero.of} ${slides.length}`}
						className={`hero-dot${idx === activeSlide ? " is-active" : ""}`}
						onClick={() => goTo(idx)}
					/>
				))}
			</div>

			<div className="hero-content">
				<div className="page-wrap">
					<div key={activeSlide} className="hero-text-enter">
						<span className="hero-kicker">{slide.kicker}</span>
						<h1 className="hero-title display-title">
							{slide.titleLine1}
							<br />
							<span className="hero-title-accent">{slide.titleLine2}</span>
						</h1>
						<p className="hero-description">{slide.description}</p>
						<Link to="/contact" className="inline-block no-underline">
							<Button size="lg" className="hero-cta">
								{t.hero.cta}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
