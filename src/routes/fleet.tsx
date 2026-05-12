import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fleet")({ component: FleetPage });

function FleetPage() {
	return (
		<div className="page-wrap py-16">
			<h1 className="display-title text-3xl font-bold mb-4">Fleet</h1>
			<p className="text-muted-foreground">
				Explore our full range of vehicles and equipment.
			</p>
		</div>
	);
}
