import { cn } from "#/lib/utils.ts";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			aria-hidden="true"
			className={cn("loading-shimmer rounded-md", className)}
			{...props}
		/>
	);
}

export { Skeleton };
