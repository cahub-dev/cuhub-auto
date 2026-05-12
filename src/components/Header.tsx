import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";

const NAV_ITEMS = [
	{ label: "Home", to: "/" },
	{ label: "Fleet", to: "/fleet" },
	{ label: "About", to: "/about" },
	{ label: "Partners", to: "/partners" },
	{ label: "Contact", to: "/contact" },
] as const;

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const router = useRouter();

	const pathname = router.state.location.pathname;
	const toggleMenu = useCallback(() => setMobileOpen((prev) => !prev), []);
	const closeMenu = useCallback(() => setMobileOpen(false), []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers close on nav
	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);

	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	return (
		<>
			<header
				className="fixed top-0 inset-x-0 z-50 border-b"
				style={{
					borderColor: "var(--line)",
					backgroundColor: "var(--header-bg)",
					backdropFilter: "blur(14px)",
					WebkitBackdropFilter: "blur(14px)",
				}}
			>
				<div className="page-wrap flex items-center justify-between h-16">
					<Link
						to="/"
						className="flex items-center shrink-0 no-underline"
						aria-label="CA HUB AUTO — Home"
					>
						<img src="/logo.jpg" alt="CA HUB AUTO" className="h-9 w-auto" />
					</Link>

					<nav className="hidden md:flex items-center gap-1">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="nav-link text-sm font-medium px-3 py-2"
								activeProps={{
									className: "nav-link is-active text-sm font-medium px-3 py-2",
								}}
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="hidden md:flex items-center gap-3">
						<Link to="/booking/new" className="no-underline">
							<Button
								size="sm"
								className="h-9 font-semibold text-sm shadow-sm cursor-pointer"
							>
								Book Now
							</Button>
						</Link>
					</div>

					<button
						type="button"
						className="md:hidden inline-flex items-center justify-center size-10 rounded-lg -mr-2"
						style={{
							backgroundColor: "var(--chip-bg)",
							border: "1px solid var(--chip-line)",
						}}
						onClick={toggleMenu}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
						aria-expanded={mobileOpen}
					>
						{mobileOpen ? (
							<X className="size-5 text-foreground" />
						) : (
							<Menu className="size-5 text-foreground" />
						)}
					</button>
				</div>
			</header>

			{mobileOpen && (
				<div
					className="fixed inset-0 z-40 md:hidden"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.4)",
						backdropFilter: "blur(2px)",
					}}
					onClick={closeMenu}
					aria-hidden="true"
				/>
			)}

			<nav
				className={cn(
					"fixed top-16 inset-x-0 z-40 md:hidden px-5 py-6 transition-transform duration-250 ease-out",
					mobileOpen
						? "translate-y-0"
						: "-translate-y-full pointer-events-none",
				)}
				style={{
					background:
						"linear-gradient(180deg, var(--header-bg), var(--surface-strong))",
					borderBottom: "1px solid var(--line)",
					boxShadow: "0 16px 40px rgba(0, 0, 0, 0.08)",
				}}
			>
				<div className="flex flex-col gap-1">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="nav-link text-base font-medium py-2.5 px-3 rounded-lg"
							activeProps={{
								className:
									"nav-link is-active text-base font-medium py-2.5 px-3 rounded-lg",
							}}
							style={{ backgroundColor: "transparent" }}
						>
							{item.label}
						</Link>
					))}
					<div
						className="pt-3 mt-1"
						style={{ borderTop: "1px solid var(--line)" }}
					>
						<Link to="/booking/new" className="no-underline block">
							<Button className="w-full h-11 font-semibold shadow-sm cursor-pointer">
								Book Now
							</Button>
						</Link>
					</div>
				</div>
			</nav>

			<div className="h-16" aria-hidden="true" />
		</>
	);
}
