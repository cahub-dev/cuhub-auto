import type React from "react";

export function CarDetailGallery({
	images,
	name,
}: {
	images: [string, string, string];
	name: string;
}): React.JSX.Element {
	return (
		<div className="grid gap-3 lg:grid-cols-[2fr_0.95fr]">
			<div className="overflow-hidden rounded-2xl bg-accent">
				<img
					src={images[0]}
					alt={name}
					className=" h-full min-h-[280px] w-full object-cover lg:min-h-[420px]"
				/>
			</div>
			<div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col">
				{images.slice(1).map((image, index) => (
					<div
						key={image}
						className="overflow-hidden rounded-2xl bg-accent lg:flex-1"
					>
						<img
							src={image}
							alt={`${name} view ${index + 2}`}
							className=" h-40 w-full object-cover lg:h-full"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
