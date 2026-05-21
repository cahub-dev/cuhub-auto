"use client";

import { MapPin, Star } from "lucide-react";
import type React from "react";
import { CarBookingCard } from "#/components/cars/CarBookingCard";
import { CarDetailContent } from "#/components/cars/CarDetailContent";
import { CarDetailGallery } from "#/components/cars/CarDetailGallery";
import { CarSpecsGrid } from "#/components/cars/CarSpecsGrid";
import type { CarDetailData } from "#/components/cars/car-detail-data";
import { localizeCarDetail } from "#/components/cars/fleet-translations";
import { useI18n } from "#/lib/i18n";

export function CarDetail({ car }: { car: CarDetailData }): React.JSX.Element {
	const { language, t } = useI18n();
	const localizedCar = localizeCarDetail(car, language);

	return (
		<div className="page-wrap py-10 md:py-14">
			<div className="">
				<CarDetailGallery
					images={localizedCar.gallery}
					name={localizedCar.name}
				/>
			</div>

			<div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
				<div className=" min-w-0 space-y-8">
					<header>
						<div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
							<span className="inline-flex items-center gap-1.5 font-semibold text-primary">
								<MapPin className="size-4" aria-hidden="true" />
								{localizedCar.location}
							</span>
							<span className="inline-flex items-center gap-1.5 text-foreground">
								<Star
									className="size-4 fill-yellow-400 text-yellow-400"
									aria-hidden="true"
								/>
								{localizedCar.rating} / 5 ({localizedCar.reviewCount}{" "}
								{t.carDetail.reviews})
							</span>
						</div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
							{localizedCar.category}
						</p>
						<h1 className="display-title text-4xl font-bold tracking-tight text-foreground md:text-5xl">
							{localizedCar.name}
						</h1>
					</header>

					<CarSpecsGrid specs={localizedCar.specs} />
					<CarDetailContent car={localizedCar} />
				</div>

				<div className="">
					<CarBookingCard car={localizedCar} />
				</div>
			</div>
		</div>
	);
}
