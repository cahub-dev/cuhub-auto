"use client";

import { useEffect, useRef, useState } from "react";
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
} from "react-simple-maps";
import { MapPin } from "lucide-react";
import type React from "react";

const GEO_URL = "/mozambique-provinces.json";

interface CityPin {
	city: string;
	province: string;
	coordinates: [number, number];
}

const CITY_PINS: readonly CityPin[] = [
	{ city: "Lichinga", province: "Niassa", coordinates: [35.2427, -13.3136] },
	{ city: "Pemba", province: "Cabo Delgado", coordinates: [40.5169, -12.9737] },
	{ city: "Nampula", province: "Nampula", coordinates: [39.2816, -15.1165] },
	{ city: "Quelimane", province: "Zambezia", coordinates: [36.8876, -17.8774] },
	{ city: "Tete", province: "Tete", coordinates: [33.5867, -16.1565] },
	{ city: "Chimoio", province: "Manica", coordinates: [33.4669, -19.1164] },
	{ city: "Beira", province: "Sofala", coordinates: [34.8389, -19.8436] },
	{ city: "Inhambane", province: "Inhambane", coordinates: [35.3833, -23.865] },
	{ city: "Xai-Xai", province: "Gaza", coordinates: [33.6439, -25.0519] },
	{ city: "Maputo", province: "Maputo", coordinates: [32.5898, -25.9692] },
] as const;

function provinceMatches(geoName: string, target: string): boolean {
	const a = geoName.toLowerCase().trim();
	const b = target.toLowerCase().trim();
	return a === b || a.startsWith(b) || b.startsWith(a);
}

interface HoverTooltip {
	province: string;
	city: string;
	x: number;
	y: number;
}

const STATS = [
	{ value: "10", label: "Cities" },
	{ value: "10", label: "Provinces" },
	{ value: "24/7", label: "Available" },
] as const;

const CYCLE_INTERVAL = 2600;

export function ServiceAreaMap(): React.JSX.Element {
	const [mounted, setMounted] = useState(false);
	const [activeCityPin, setActiveCityPin] = useState<CityPin | null>(null);
	const [hoverTooltip, setHoverTooltip] = useState<HoverTooltip | null>(null);
	const isHoveringRef = useRef(false);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => setMounted(true), []);

	// Auto-cycle: picks a random entry from CITY_PINS every CYCLE_INTERVAL ms.
	// Skips the tick while the user is hovering a province.
	useEffect(() => {
		if (!mounted) return;

		const pick = () => {
			if (isHoveringRef.current) return;
			const idx = Math.floor(Math.random() * CITY_PINS.length);
			setActiveCityPin(CITY_PINS[idx] as CityPin);
		};

		pick();
		intervalRef.current = setInterval(pick, CYCLE_INTERVAL);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [mounted]);

	const handleProvinceEnter = (
		rawName: string,
		city: string,
		evt: React.MouseEvent,
	) => {
		isHoveringRef.current = true;
		setActiveCityPin(null);
		setHoverTooltip({ province: rawName, city, x: evt.clientX, y: evt.clientY });
	};

	const handleProvinceMove = (evt: React.MouseEvent) => {
		setHoverTooltip((t) => (t ? { ...t, x: evt.clientX, y: evt.clientY } : null));
	};

	const handleProvinceLeave = () => {
		isHoveringRef.current = false;
		setHoverTooltip(null);
		// Resume auto-cycle with a short delay so the de-highlight fades first
		setTimeout(() => {
			if (!isHoveringRef.current) {
				const idx = Math.floor(Math.random() * CITY_PINS.length);
				setActiveCityPin(CITY_PINS[idx] as CityPin);
			}
		}, 350);
	};

	return (
		<section className="py-20" style={{ background: "#f9f8f7" }}>
			<div className="page-wrap">
				<div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16 items-start">

					{/* ── Left column ── */}
					<div className="flex flex-col gap-8">
						<div>
							<p className="island-kicker mb-3">Our Service Areas</p>
							<h2
								className="display-title font-extrabold tracking-tight mb-4"
								style={{
									fontSize: "clamp(1.75rem, 1.3rem + 2vw, 2.6rem)",
									lineHeight: 1.1,
								}}
							>
								10 Cities Across All of Mozambique
							</h2>
							<p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
								Wherever your project takes you — from Maputo to Pemba — our
								fleet is ready to serve every province in the country.
							</p>
						</div>

						{/* Stats */}
						<div className="flex gap-4">
							{STATS.map(({ value, label }) => (
								<div
									key={label}
									className="flex flex-col items-center flex-1 py-4 rounded-2xl border"
									style={{
										borderColor: "var(--line)",
										background: "rgba(255,255,255,0.9)",
									}}
								>
									<span
										className="display-title font-extrabold text-2xl"
										style={{ color: "var(--color-coral-glow-400)" }}
									>
										{value}
									</span>
									<span
										className="text-xs font-semibold tracking-widest uppercase mt-1"
										style={{ color: "var(--muted-foreground)" }}
									>
										{label}
									</span>
								</div>
							))}
						</div>

						{/* City chips */}
						<div>
							<p
								className="text-xs font-semibold tracking-widest uppercase mb-3"
								style={{ color: "var(--muted-foreground)" }}
							>
								Cities we serve
							</p>
							<div className="flex flex-wrap gap-2">
								{CITY_PINS.map(({ city, province }) => (
									<div
										key={city}
										className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm"
										style={{
											borderColor: "var(--line)",
											background: "#fff",
										}}
									>
										<span
											className="size-2 rounded-full shrink-0"
											style={{ background: "#ff8549" }}
										/>
										<span className="font-medium">{city}</span>
										<span style={{ color: "var(--muted-foreground)", fontSize: "0.72rem" }}>
											{province}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* ── Right column: map ── */}
					<div
						className="relative overflow-hidden border"
						style={{
							height: "clamp(480px, 58vw, 680px)",
							borderColor: "var(--line)",
							background: "#fff",
						}}
					>
						{/* Dot grid texture */}
						<div
							className="absolute inset-0 pointer-events-none"
							style={{
								backgroundImage:
									"radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
								backgroundSize: "24px 24px",
							}}
						/>

						{!mounted && (
							<div className="absolute inset-0 flex items-center justify-center">
								<div
									className="size-7 rounded-full border-2 animate-spin"
									style={{ borderColor: "#ff8549", borderTopColor: "transparent" }}
								/>
							</div>
						)}

						{mounted && (
							<ComposableMap
								width={600}
								height={740}
								projection="geoMercator"
								projectionConfig={{ center: [36, -18.7], scale: 2300 }}
								style={{ width: "100%", height: "100%" }}
							>
								<Geographies geography={GEO_URL}>
									{({ geographies }) =>
										geographies.map((geo) => {
											const rawName =
												(geo.properties?.NAME_1 as string | undefined) ??
												(geo.properties?.name as string | undefined) ??
												"";

											const cityPin = CITY_PINS.find((p) =>
												provinceMatches(rawName, p.province),
											);
											const city = cityPin?.city ?? rawName;

											const isActive =
												activeCityPin !== null &&
												provinceMatches(rawName, activeCityPin.province);

											return (
												<Geography
													key={geo.rsmKey}
													geography={geo}
													onMouseEnter={(evt) =>
														handleProvinceEnter(rawName, city, evt)
													}
													onMouseMove={handleProvinceMove}
													onMouseLeave={handleProvinceLeave}
													style={{
														default: {
															fill: isActive ? "#ff8549" : "#e8e1da",
															stroke: "#fff",
															strokeWidth: 1.5,
															outline: "none",
															cursor: "pointer",
															transition: "fill 700ms ease",
															filter: isActive
																? "drop-shadow(0 4px 10px rgba(255,133,73,0.30))"
																: "drop-shadow(0 2px 4px rgba(0,0,0,0.07))",
														},
														hover: {
															fill: "#ff8549",
															stroke: "#fff",
															strokeWidth: 1.5,
															outline: "none",
															cursor: "pointer",
															transition: "fill 140ms ease",
															filter: "drop-shadow(0 4px 10px rgba(255,133,73,0.30))",
														},
														pressed: {
															fill: "#ff5906",
															stroke: "#fff",
															strokeWidth: 1.5,
															outline: "none",
														},
													}}
												/>
											);
										})
									}
								</Geographies>

								{/* City pins */}
								{CITY_PINS.map(({ city, coordinates }, i) => (
									<Marker key={city} coordinates={coordinates}>
										<circle
											r={10}
											fill="#ff8549"
											opacity={0.2}
											className="animate-ping"
											style={{
												transformBox: "fill-box",
												transformOrigin: "center",
												animationDelay: `${i * 260}ms`,
												animationDuration: "2.8s",
												pointerEvents: "none",
											}}
										/>
										<circle
											r={4}
											fill="#ff5906"
											stroke="#fff"
											strokeWidth={2}
											style={{ pointerEvents: "none" }}
										/>
									</Marker>
								))}
							</ComposableMap>
						)}

						{/* Auto-cycle info card — bottom-left of map */}
						{activeCityPin && !hoverTooltip && (
							<div className="absolute bottom-5 left-5 z-10 ">
								<div className="island-shell rounded-xl px-3.5 py-2.5" style={{ minWidth: "148px" }}>
									<div className="flex items-center gap-1.5 mb-0.5">
										<MapPin className="size-3.5 shrink-0" style={{ color: "#ff8549" }} />
										<span className="text-sm font-semibold leading-tight">
											{activeCityPin.province}
										</span>
									</div>
									<p className="text-xs pl-5" style={{ color: "var(--muted-foreground)" }}>
										{activeCityPin.city}
									</p>
								</div>
							</div>
						)}

						{/* Hover tooltip — follows mouse */}
						{hoverTooltip && (
							<div
								className="fixed z-50 pointer-events-none"
								style={{
									left: hoverTooltip.x + 14,
									top: hoverTooltip.y,
									transform: "translateY(calc(-100% - 8px))",
								}}
							>
								<div className="island-shell rounded-xl px-3.5 py-2.5" style={{ minWidth: "148px" }}>
									<div className="flex items-center gap-1.5 mb-0.5">
										<MapPin className="size-3.5 shrink-0" style={{ color: "#ff8549" }} />
										<span className="text-sm font-semibold leading-tight">
											{hoverTooltip.province}
										</span>
									</div>
									<p className="text-xs pl-5" style={{ color: "var(--muted-foreground)" }}>
										{hoverTooltip.city}
									</p>
								</div>
							</div>
						)}
					</div>

				</div>
			</div>
		</section>
	);
}
