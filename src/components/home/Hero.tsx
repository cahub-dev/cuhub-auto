"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type React from "react";
import { type FormEvent, useState } from "react";
import {
	EQUIPMENT_CATEGORIES,
	getEquipmentInPriorityOrder,
} from "#/data/equipment";
import { useI18n } from "#/lib/i18n";

export const HERO_IMAGE = "/hero/mining-hero.webp";

export function Hero(): React.JSX.Element {
	const { language, t } = useI18n();
	const navigate = useNavigate();
	const [equipment, setEquipment] = useState("");
	const [category, setCategory] = useState("");
	const [startDate, setStartDate] = useState("");

	// A date means the visitor is ready to ask for a quote; otherwise browse.
	function handleSearch(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		if (startDate) {
			navigate({
				to: "/booking/new",
				search: { ...(equipment ? { equipment } : {}), start: startDate },
			});
		} else if (equipment) {
			navigate({
				to: "/fleet/$equipmentId",
				params: { equipmentId: equipment },
			});
		} else {
			navigate({ to: "/fleet", search: category ? { category } : {} });
		}
	}

	const items = getEquipmentInPriorityOrder().filter(
		(item) => !category || item.categoryId === category,
	);

	return (
		<section className="hero-section" aria-labelledby="hero-title">
			<img
				src={HERO_IMAGE}
				alt=""
				className="hero-bg"
				fetchPriority="high"
				draggable={false}
			/>
			<div className="page-wrap hero-inner">
				<h1 id="hero-title" className="hero-title">
					{t.hero.title}
				</h1>
				<p className="hero-subtitle">{t.hero.subtitle}</p>

				{/* action/name keep the search working before hydration or without JS. */}
				<form
					className="hero-search"
					action="/fleet"
					method="get"
					onSubmit={handleSearch}
					aria-label={t.hero.search}
				>
					<label className="hero-search-field">
						<span className="sr-only">{t.hero.equipmentPlaceholder}</span>
						<select
							value={equipment}
							onChange={(event) => setEquipment(event.target.value)}
						>
							<option value="">{t.hero.equipmentPlaceholder}</option>
							{items.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name[language]}
								</option>
							))}
						</select>
						<ChevronDown className="size-4" aria-hidden="true" />
					</label>
					<label className="hero-search-field">
						<span className="sr-only">{t.hero.categoryPlaceholder}</span>
						<select
							name="category"
							value={category}
							onChange={(event) => {
								setCategory(event.target.value);
								setEquipment("");
							}}
						>
							<option value="">{t.hero.categoryPlaceholder}</option>
							{EQUIPMENT_CATEGORIES.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name[language]}
								</option>
							))}
						</select>
						<ChevronDown className="size-4" aria-hidden="true" />
					</label>
					<label className="hero-search-field">
						<span className="sr-only">{t.hero.startDate}</span>
						<input
							type="date"
							value={startDate}
							min={new Date().toISOString().slice(0, 10)}
							onChange={(event) => setStartDate(event.target.value)}
							aria-label={t.hero.startDate}
						/>
					</label>
					<button type="submit" className="hero-search-submit">
						{t.hero.search}
					</button>
				</form>

				<p className="mt-8 text-sm text-white">
					{t.hero.listAll}{" "}
					<Link
						to="/fleet"
						className="text-primary no-underline hover:underline"
					>
						{t.hero.listAllLink}
					</Link>
				</p>
			</div>
		</section>
	);
}
