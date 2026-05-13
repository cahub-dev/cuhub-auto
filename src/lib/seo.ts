export const SITE_NAME = "CA HUB AUTO";
export const SITE_URL = "https://cahub.co.mz"; // update when domain is confirmed
export const DEFAULT_OG_IMAGE = "/logo.webp";

export function buildPageMeta({
	title,
	description,
	ogImage = DEFAULT_OG_IMAGE,
	ogType = "website",
}: {
	title: string;
	description: string;
	ogImage?: string;
	ogType?: string;
}) {
	const fullTitle = `${title} | ${SITE_NAME}`;
	const absImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

	return [
		{ title: fullTitle },
		{ name: "description", content: description },
		{ property: "og:title", content: fullTitle },
		{ property: "og:description", content: description },
		{ property: "og:image", content: absImage },
		{ property: "og:type", content: ogType },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: absImage },
	];
}
