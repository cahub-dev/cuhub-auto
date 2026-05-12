import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Header } from "#/components/Header";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "CA HUB AUTO — Vehicle & Equipment Rental in Mozambique",
			},
			{
				name: "description",
				content:
					"Browse our fleet of vehicles and heavy equipment available for rental across Mozambique. Book online and track your rental from request to delivery.",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
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
				<footer className="site-footer mt-20 py-12 px-5">
					<div className="page-wrap">
						<div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<span className="display-title font-bold text-foreground">
									CA HUB AUTO
								</span>
								<span className="opacity-60">
									&copy; {new Date().getFullYear()}
								</span>
							</div>
							<div className="flex items-center gap-6">
								<a href="mailto:info@cahub.co.mz" className="nav-link text-sm">
									info@cahub.co.mz
								</a>
								<a href="tel:+258840000000" className="nav-link text-sm">
									+258 84 000 0000
								</a>
							</div>
							<span className="opacity-50 text-xs">
								Vehicle & Equipment Rental — Mozambique
							</span>
						</div>
					</div>
				</footer>
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
