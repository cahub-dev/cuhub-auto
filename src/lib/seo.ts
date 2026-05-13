export const SITE_NAME = "CA HUB AUTO";
export const SITE_URL = "https://cuhub-auto.vercel.app"; // swap for custom domain when ready
export const DEFAULT_OG_IMAGE = "/hero.webp";

export function buildPageMeta({
	title,
	description,
	path = "",
	ogImage = DEFAULT_OG_IMAGE,
	ogType = "website",
}: {
	title: string;
	description: string;
	path?: string;
	ogImage?: string;
	ogType?: string;
}) {
	const fullTitle = `${title} | ${SITE_NAME}`;
	const absImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
	const absUrl = `${SITE_URL}${path}`;

	return [
		{ title: fullTitle },
		{ name: "description", content: description },
		{ property: "og:title", content: fullTitle },
		{ property: "og:description", content: description },
		{ property: "og:image", content: absImage },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
		{ property: "og:url", content: absUrl },
		{ property: "og:type", content: ogType },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: absImage },
	];
}
