import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/partners")({ component: PartnersPage });

function PartnersPage() {
	return (
		<div className="page-wrap py-16">
			<h1 className="display-title text-3xl font-bold mb-4">Partners</h1>
			<p className="text-muted-foreground">
				Our trusted partners across Mozambique.
			</p>
		</div>
	);
}
