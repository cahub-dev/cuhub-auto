import { Link, createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { CarDetail } from "#/components/cars/CarDetail";
import { getCarDetail } from "#/components/cars/car-detail-data";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/fleet_/$carId")({
	component: FleetDetailPage,
});

function FleetDetailPage(): React.JSX.Element {
	const { carId } = Route.useParams();
	const car = getCarDetail(carId);

	if (!car) {
		return (
			<div className="page-wrap py-16">
				<div className="island-shell rounded-2xl p-8 text-center">
					<h1 className="display-title mb-3 text-3xl font-bold text-foreground">
						Vehicle not found
					</h1>
					<p className="mx-auto mb-6 max-w-xl text-muted-foreground">
						This fleet item is not available in the current catalogue.
					</p>
					<Button asChild>
						<Link to="/fleet">Back to fleet</Link>
					</Button>
				</div>
			</div>
		);
	}

	return <CarDetail car={car} />;
}
