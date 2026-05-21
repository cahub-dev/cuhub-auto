import { createFileRoute, Link } from "@tanstack/react-router";
import type React from "react";
import { CarDetail } from "#/components/cars/CarDetail";
import { getCarDetail } from "#/components/cars/car-detail-data";
import { Button } from "#/components/ui/button";
import { useI18n } from "#/lib/i18n";
import { SITE_NAME, SITE_URL } from "#/lib/seo";

export const Route = createFileRoute("/fleet_/$carId")({
	head: ({ params }) => {
		const car = getCarDetail(params.carId);
		if (!car) return {};

		const title = `${car.name} Rental — $${car.dailyRate}/day | ${SITE_NAME}`;
		const description = `Rent the ${car.name} in ${car.location}. ${car.description} From $${car.dailyRate}/day.`;
		const ogImage = `${SITE_URL}${car.gallery[0]}`;

		const productSchema = {
			"@context": "https://schema.org",
			"@type": "Product",
			name: car.name,
			description: car.description,
			image: ogImage,
			brand: { "@type": "Brand", name: SITE_NAME },
			category: car.category,
			offers: {
				"@type": "Offer",
				priceCurrency: "USD",
				price: car.dailyRate,
				unitText: "DAY",
				availability: "https://schema.org/InStock",
				seller: { "@type": "Organization", name: SITE_NAME },
			},
		};

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:image", content: ogImage },
				{ property: "og:image:width", content: "1200" },
				{ property: "og:image:height", content: "630" },
				{ property: "og:url", content: `${SITE_URL}/fleet/${params.carId}` },
				{ property: "og:type", content: "product" },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: ogImage },
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(productSchema),
				},
			],
		};
	},
	component: FleetDetailPage,
});

function FleetDetailPage(): React.JSX.Element {
	const { t } = useI18n();
	const { carId } = Route.useParams();
	const car = getCarDetail(carId);

	if (!car) {
		return (
			<div className="page-wrap py-16">
				<div className="island-shell rounded-2xl p-8 text-center">
					<h1 className="display-title mb-3 text-3xl font-bold text-foreground">
						{t.carDetail.notFoundTitle}
					</h1>
					<p className="mx-auto mb-6 max-w-xl text-muted-foreground">
						{t.carDetail.notFoundDescription}
					</p>
					<Button asChild>
						<Link to="/fleet">{t.carDetail.backToFleet}</Link>
					</Button>
				</div>
			</div>
		);
	}

	return <CarDetail car={car} />;
}
