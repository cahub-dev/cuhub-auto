import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: AboutPage });

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
