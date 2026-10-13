import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { ChatWidget } from "#/components/chat/ChatWidget";
import { Header } from "#/components/Header";
import { Footer } from "#/components/layout/footer";
import { COMPANY_ADDRESS, SALES_CONTACT } from "#/lib/contact-details";
import { I18nProvider } from "#/lib/i18n";
import { MOTION_BOOT_SCRIPT, SmoothScroll } from "#/lib/motion";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/seo";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const LOCAL_BUSINESS_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	name: SITE_NAME,
	description:
		"Mining machinery and equipment rental across Mozambique: crushers, excavators, wheel loaders, generators, dump trucks, drilling rigs and ball mills.",
	url: SITE_URL,
	telephone: SALES_CONTACT.phoneE164,
	email: SALES_CONTACT.email,
	address: {
		"@type": "PostalAddress",
		streetAddress: COMPANY_ADDRESS.street,
		addressLocality: COMPANY_ADDRESS.locality,
		addressRegion: COMPANY_ADDRESS.region,
		addressCountry: COMPANY_ADDRESS.country,
	},
	geo: {
		"@type": "GeoCoordinates",
		...COMPANY_ADDRESS.geo,
	},
	areaServed: { "@type": "Country", name: "Mozambique" },
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				title:
					"CA HUB AUTO — Mining Machinery & Equipment Rental in Mozambique",
			},
			{
				name: "description",
				content:
					"Rent mining machinery in Mozambique: crushers, excavators, wheel loaders, diesel generators, dump trucks, drilling rigs and ball mills. Delivery to site and certified operators.",
			},
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: "en_US" },
			{ property: "og:url", content: SITE_URL },
			{ property: "og:image", content: `${SITE_URL}${DEFAULT_OG_IMAGE}` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico", sizes: "48x48" },
			{
				rel: "icon",
				type: "image/webp",
				href: "/favicon-32x32.webp",
				sizes: "32x32",
			},
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
			{ rel: "manifest", href: "/manifest.json" },
		],
		scripts: [
			{ children: MOTION_BOOT_SCRIPT },
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
		// The motion boot script adds a class to <html> before hydration, and
		// I18nProvider sets lang. suppressHydrationWarning covers only this element.
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<SmoothScroll />
				<I18nProvider>
					<Header />
					<main>{children}</main>
					<Footer />
					<ChatWidget />
				</I18nProvider>
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
