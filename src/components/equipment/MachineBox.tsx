import type React from "react";
import type { Equipment } from "#/data/equipment";
import { cn } from "#/lib/utils";

/** Cut-out machine on a white or grey box; real photos fill the box instead. */
export function MachineBox({
	item,
	alt = "",
	grey = false,
	className,
}: {
	item: Pick<Equipment, "image" | "cutout">;
	alt?: string;
	grey?: boolean;
	className?: string;
}): React.JSX.Element {
	return (
		<div
			className={cn(
				"machine-box",
				grey && "machine-box-grey",
				!item.cutout && "!p-0",
				className,
			)}
		>
			{item.cutout ? (
				<img src={item.cutout} alt={alt} loading="lazy" />
			) : (
				<img
					src={item.image}
					alt={alt}
					loading="lazy"
					className="!max-h-none !max-w-none h-full w-full object-cover ![mix-blend-mode:normal]"
				/>
			)}
		</div>
	);
}
