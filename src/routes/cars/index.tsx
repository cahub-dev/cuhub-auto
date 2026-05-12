import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cars/")({ component: CarsPage });

function CarsPage() {
	return (
		<div className="page-wrap py-16">
			<h1 className="display-title text-3xl font-bold mb-4">Our Fleet</h1>
			<p className="text-muted-foreground">
				Browse our selection of vehicles available for rental.
			</p>
		</div>
	);
}
