import { createFileRoute } from "@tanstack/react-router";
import { buildPageMeta } from "#/lib/seo";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: buildPageMeta({
			title: "About Us",
			description:
				"CA HUB AUTO is a Mozambique-based vehicle and heavy equipment rental company. We support mining, construction, and infrastructure teams with reliable, well-maintained fleets — based in Maputo and operating nationwide.",
			path: "/about",
		}),
	}),
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="page-wrap py-16">
			<h1 className="display-title text-3xl font-bold mb-4">About Us</h1>
			<p className="text-muted-foreground">
				Learn more about CA HUB AUTO and our mission.
			</p>
		</div>
	);
}
