"use client";

import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookingPanel } from "#/components/booking/BookingPanel";
import { Button } from "#/components/ui/button";

const SLIDES = [
	{
		kicker: "VEHICLE & MACHINERY RENTAL",
		titleLine1: "Where Logistics",
		titleLine2: "Meets Performance",
		description:
			"Founded in 2023, CA HUB AUTO provides reliable vehicle and heavy equipment rental solutions across Mozambique.",
		image: "/sliders/sldier_1.png",
	},
	{
		kicker: "HEAVY EQUIPMENT",
		titleLine1: "Power Your",
		titleLine2: "Project Forward",
		description:
			"From mining to construction, our heavy equipment fleet is built for the most demanding job sites.",
		image: "/sliders/slider_2.png",
	},
	{
		kicker: "RELIABLE FLEET",
		titleLine1: "Built for the",
		titleLine2: "Toughest Terrain",
		description:
			"Our maintained fleet of 4x4s, trucks, and machinery keeps your operations running without interruption.",
		image: "/sliders/slider_3.png",
	},
	{
		kicker: "ACROSS MOZAMBIQUE",
		titleLine1: "Covering Every Mile,",
		titleLine2: "Every Job",
		description:
			"Telecommunications, infrastructure, logistics — we deliver dependable vehicles wherever your project takes you.",
		image: "/sliders/slider_4.png",
	},
] as const;

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

	const goTo = useCallback((idx: number) => {
		setActiveSlide(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length);
	}, []);

	const next = useCallback(() => goTo(activeSlide + 1), [activeSlide, goTo]);
	const prev = useCallback(() => goTo(activeSlide - 1), [activeSlide, goTo]);

	// Autoplay — paused on hover/focus or when the user prefers reduced motion
	useEffect(() => {
		if (isPaused || prefersReducedMotion) return;
		const id = setInterval(() => {
			setActiveSlide((p) => (p + 1) % SLIDES.length);
		}, AUTOPLAY_MS);
		return () => clearInterval(id);
	}, [isPaused, prefersReducedMotion]);

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

	const slide = SLIDES[activeSlide];

	return (
		<>
			<section
				ref={sectionRef}
				className="hero-section"
				aria-roledescription="carousel"
				aria-label="CA HUB AUTO highlights"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				onFocus={() => setIsPaused(true)}
				onBlur={() => setIsPaused(false)}
			>
				<div className="hero-slides-container" aria-hidden="true">
					{SLIDES.map((s, idx) => (
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
					aria-label="Previous slide"
					onClick={prev}
				>
					<ChevronLeft className="size-5" aria-hidden="true" />
				</button>
				<button
					type="button"
					className="hero-arrow hero-arrow-right"
					aria-label="Next slide"
					onClick={next}
				>
					<ChevronRight className="size-5" aria-hidden="true" />
				</button>

				<div className="hero-dots" role="tablist" aria-label="Select slide">
					{SLIDES.map((s, idx) => (
						<button
							key={s.image}
							type="button"
							role="tab"
							aria-selected={idx === activeSlide}
							aria-label={`Slide ${idx + 1} of ${SLIDES.length}`}
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
							<Link to="/contact" className="no-underline inline-block">
								<Button size="lg" className="hero-cta">
									Request a Quote
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* ── Elevated Booking Card ── */}
			<div className="booking-card-wrapper">
				<div className="page-wrap">
					<BookingPanel />
				</div>
			</div>
		</>
	);
}
