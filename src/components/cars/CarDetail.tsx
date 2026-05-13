import { MapPin, Star } from "lucide-react";
import type React from "react";
import { CarBookingCard } from "#/components/cars/CarBookingCard";
import { CarDetailContent } from "#/components/cars/CarDetailContent";
import { CarDetailGallery } from "#/components/cars/CarDetailGallery";
import { CarSpecsGrid } from "#/components/cars/CarSpecsGrid";
import type { CarDetailData } from "#/components/cars/car-detail-data";

export function CarDetail({ car }: { car: CarDetailData }): React.JSX.Element {
	return (
		<div className="page-wrap py-10 md:py-14">
			<CarDetailGallery images={car.gallery} name={car.name} />

			<div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
				<div className="min-w-0 space-y-8">
					<header>
						<div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
							<span className="inline-flex items-center gap-1.5 font-semibold text-primary">
								<MapPin className="size-4" aria-hidden="true" />
								{car.location}
							</span>
							<span className="inline-flex items-center gap-1.5 text-foreground">
								<Star
									className="size-4 fill-yellow-400 text-yellow-400"
									aria-hidden="true"
								/>
								{car.rating} / 5 ({car.reviewCount} reviews)
							</span>
						</div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
							{car.category}
						</p>
						<h1 className="display-title text-4xl font-bold tracking-tight text-foreground md:text-5xl">
							{car.name}
						</h1>
					</header>

					<CarSpecsGrid specs={car.specs} />
					<CarDetailContent car={car} />
				</div>

				<CarBookingCard car={car} />
			</div>
		</div>
	);
}
