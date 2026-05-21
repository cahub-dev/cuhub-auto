"use client";

import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import { type Language, useI18n } from "#/lib/i18n";
import { cn } from "#/lib/utils";

const NAV_ITEMS = [
	{ key: "home", to: "/" },
	{ key: "fleet", to: "/fleet" },
	{ key: "about", to: "/about" },
	{ key: "contact", to: "/contact" },
] as const;

function LanguageSwitcher(): React.JSX.Element {
	const { language, setLanguage } = useI18n();

	return (
		<div className="flex items-center gap-1 rounded-full border border-border/70 bg-white/80 p-1 text-xs font-bold">
			{(["en", "pt"] as Language[]).map((lang) => (
				<button
					key={lang}
					type="button"
					onClick={() => setLanguage(lang)}
					className={cn(
						"cursor-pointer rounded-full px-2.5 py-1 transition-colors",
						language === lang
							? "bg-primary text-white"
							: "text-muted-foreground hover:text-foreground",
					)}
					aria-pressed={language === lang}
				>
					{lang.toUpperCase()}
				</button>
			))}
		</div>
	);
}

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const router = useRouter();
	const { t } = useI18n();

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
				className="fixed inset-x-0 top-0 z-50 border-b"
				style={{
					borderColor: "var(--line)",
					backgroundColor: "var(--header-bg)",
					backdropFilter: "blur(14px)",
					WebkitBackdropFilter: "blur(14px)",
				}}
			>
				<div className="page-wrap flex h-16 items-center justify-between">
					<Link
						to="/"
						className="flex shrink-0 items-center no-underline"
						aria-label="CA HUB AUTO — Home"
					>
						<img src="/logo.webp" alt="CA HUB AUTO" className="h-9 w-auto" />
					</Link>

					<nav className="hidden items-center gap-1 md:flex">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="nav-link px-3 py-2 text-sm font-medium"
								activeProps={{
									className: "nav-link is-active px-3 py-2 text-sm font-medium",
								}}
							>
								{t.nav[item.key]}
							</Link>
						))}
					</nav>

					<div className="hidden items-center gap-3 md:flex">
						<LanguageSwitcher />
						<Link to="/booking/new" className="no-underline">
							<Button
								size="sm"
								className="h-9 cursor-pointer text-sm font-semibold shadow-sm"
							>
								{t.nav.bookNow}
							</Button>
						</Link>
					</div>

					<button
						type="button"
						className="-mr-2 inline-flex size-10 items-center justify-center rounded-lg md:hidden"
						style={{
							backgroundColor: "var(--chip-bg)",
							border: "1px solid var(--chip-line)",
						}}
						onClick={toggleMenu}
						aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
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
					"fixed inset-x-0 top-16 z-40 px-5 py-6 transition-transform duration-250 ease-out md:hidden",
					mobileOpen
						? "translate-y-0"
						: "pointer-events-none -translate-y-full",
				)}
				style={{
					background:
						"linear-gradient(180deg, var(--header-bg), var(--surface-strong))",
					borderBottom: "1px solid var(--line)",
					boxShadow: "0 16px 40px rgba(0, 0, 0, 0.08)",
				}}
			>
				<div className="flex flex-col gap-1">
					<div className="mb-3">
						<LanguageSwitcher />
					</div>
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="nav-link rounded-lg px-3 py-2.5 text-base font-medium"
							activeProps={{
								className:
									"nav-link is-active rounded-lg px-3 py-2.5 text-base font-medium",
							}}
							style={{ backgroundColor: "transparent" }}
						>
							{t.nav[item.key]}
						</Link>
					))}
					<div
						className="mt-1 pt-3"
						style={{ borderTop: "1px solid var(--line)" }}
					>
						<Link to="/booking/new" className="block no-underline">
							<Button className="h-11 w-full cursor-pointer font-semibold shadow-sm">
								{t.nav.bookNow}
							</Button>
						</Link>
					</div>
				</div>
			</nav>

			<div className="h-16" aria-hidden="true" />
		</>
	);
}
