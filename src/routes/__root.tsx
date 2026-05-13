import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Header } from "#/components/Header";
import { Footer } from "#/components/layout/footer";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { SITE_NAME, SITE_URL } from "../lib/seo";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const LOCAL_BUSINESS_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	name: SITE_NAME,
	description:
		"Vehicle and heavy equipment rental for professional operations across Mozambique.",
	url: SITE_URL,
	telephone: "+258848880551",
	email: "cahubauto@gmail.com",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Rua de Micaia, Q.56, nº115",
		addressLocality: "Maputo",
		addressRegion: "Maputo City",
		addressCountry: "MZ",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: -25.9655,
		longitude: 32.5832,
	},
	areaServed: { "@type": "Country", name: "Mozambique" },
	priceRange: "$$",
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "CA HUB AUTO — Vehicle & Equipment Rental in Mozambique" },
			{
				name: "description",
				content:
					"Rent vehicles and heavy equipment in Mozambique. Toyota Land Cruiser, Nissan Navara, Develon loaders, excavators, and Scania trucks — daily and project rates available in Maputo.",
			},
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: "en_US" },
			{ property: "og:url", content: SITE_URL },
			{ property: "og:image", content: `${SITE_URL}/hero.webp` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico", sizes: "48x48" },
			{ rel: "icon", type: "image/webp", href: "/favicon-32x32.webp", sizes: "32x32" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
			{ rel: "manifest", href: "/manifest.json" },
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
