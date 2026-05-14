import { Link } from "@tanstack/react-router";
import type React from "react";
import { Button } from "#/components/ui/button";

export function AboutCTA(): React.JSX.Element {
	return (
		<section
			className="py-16 md:py-20"
			style={{ background: "var(--color-coral-glow-400)" }}
		>
			<div className="page-wrap flex flex-col items-center text-center gap-6">
				<h2 className="display-title text-3xl md:text-4xl font-bold text-white tracking-tight max-w-2xl">
					Ready to Work with Us?
				</h2>
				<p className="text-base text-white/80 max-w-lg">
					Tell us about your project and we'll match you with the right fleet.
					Fast response, transparent pricing, nationwide coverage.
				</p>
				<div className="flex flex-wrap gap-3 justify-center">
					<Link to="/fleet" className="no-underline">
						<Button
							size="lg"
							className="font-semibold"
							style={{
								background: "#fff",
								color: "var(--color-coral-glow-400)",
							}}
						>
							View Our Fleet
						</Button>
					</Link>
					<Link to="/contact" className="no-underline">
						<Button
							size="lg"
							variant="outline"
							className="font-semibold border-white/50 text-white hover:bg-white/10 hover:text-white"
						>
							Contact Us
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
