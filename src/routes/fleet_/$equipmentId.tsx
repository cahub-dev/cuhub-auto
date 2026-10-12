import { createFileRoute, Link } from "@tanstack/react-router";
import type React from "react";
import { EquipmentDetail } from "#/components/equipment/EquipmentDetail";
import { Button } from "#/components/ui/button";
import { getCategory, getEquipment } from "#/data/equipment";
import { useI18n } from "#/lib/i18n";
import { SITE_NAME, SITE_URL } from "#/lib/seo";

export const Route = createFileRoute("/fleet_/$equipmentId")({
	head: ({ params }) => {
		const item = getEquipment(params.equipmentId);
		if (!item) return {};

		const title = `${item.name.en} for Rent in Mozambique | ${SITE_NAME}`;
		const description = `${item.summary.en} Request a rental quote from ${SITE_NAME} — delivery to mine sites across Mozambique, certified operator on request.`;
		const ogImage = `${SITE_URL}${item.image}`;
		const url = `${SITE_URL}/fleet/${item.id}`;

		// No Offer/price: rentals are quote-only.
		const productSchema = {
			"@context": "https://schema.org",
			"@type": "Product",
			name: item.name.en,
			description: item.description.en,
			image: ogImage,
			url,
			category: getCategory(item.categoryId)?.name.en,
			brand: { "@type": "Brand", name: SITE_NAME },
		};

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:image", content: ogImage },
				{ property: "og:url", content: url },
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
	component: EquipmentDetailPage,
});

function EquipmentDetailPage(): React.JSX.Element {
	const { t } = useI18n();
	const { equipmentId } = Route.useParams();
	const item = getEquipment(equipmentId);

	if (!item) {
		return (
			<div className="page-wrap py-16">
				<div className="rounded-md border border-border p-8 text-center">
					<h1 className="display-title mb-3 text-3xl font-bold text-foreground">
						{t.equipmentDetail.notFoundTitle}
					</h1>
					<p className="mx-auto mb-6 max-w-xl text-muted-foreground">
						{t.equipmentDetail.notFoundDescription}
					</p>
					<Button asChild>
						<Link to="/fleet" className="no-underline">
							{t.equipmentDetail.backToFleet}
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	return <EquipmentDetail item={item} />;
}
