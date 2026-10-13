"use client";

import { Link } from "@tanstack/react-router";
import type React from "react";
import { MachineBox } from "#/components/equipment/MachineBox";
import { SectionHeading } from "#/components/shared/SectionHeading";
import { EQUIPMENT_CATEGORIES, getEquipmentByCategory } from "#/data/equipment";
import { useI18n } from "#/lib/i18n";
import { Reveal } from "#/lib/motion";

export function EquipmentCategories(): React.JSX.Element {
	const { language, t } = useI18n();

	return (
		<section className="py-20 md:py-28" aria-labelledby="categories-title">
			<div className="page-wrap">
				<SectionHeading
					id="categories-title"
					ghost={t.home.categories.ghost}
					title={t.home.categories.title}
					className="mb-12 md:mb-16"
				/>

				<ul className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
					{EQUIPMENT_CATEGORIES.map((category, index) => {
						const [first] = getEquipmentByCategory(category.id);
						return (
							<Reveal
								as="li"
								key={category.id}
								delay={(index % 4) * 90}
								data-testid="category-card"
							>
								<Link
									to="/fleet"
									search={{ category: category.id }}
									className="group block text-center no-underline"
								>
									{first && (
										<MachineBox item={first} className="h-36 md:h-48" />
									)}
									<span className="mt-4 block text-base text-[#202020] transition-colors group-hover:text-primary">
										{category.name[language]}
									</span>
								</Link>
							</Reveal>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
