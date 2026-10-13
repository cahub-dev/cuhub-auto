"use client";

import { Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, Instagram, Linkedin, Menu, Phone, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { SALES_CONTACT, SOCIAL_LINKS } from "#/lib/contact-details";
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
		<div className="flex items-center gap-1 text-xs font-semibold">
			{(["en", "pt"] as Language[]).map((lang) => (
				<button
					key={lang}
					type="button"
					onClick={() => setLanguage(lang)}
					className={cn(
						"cursor-pointer px-1.5 py-0.5 transition-colors",
						language === lang
							? "bg-primary text-white"
							: "text-white/70 hover:text-white",
					)}
					aria-pressed={language === lang}
				>
					{lang.toUpperCase()}
				</button>
			))}
		</div>
	);
}

function TopBar(): React.JSX.Element {
	const { t } = useI18n();

	return (
		<div className="relative z-50 hidden bg-black text-[13px] text-white md:block">
			<div className="page-wrap flex h-9 items-center justify-between gap-6">
				<div className="flex items-center gap-5">
					<LanguageSwitcher />
					<span className="h-3.5 w-px bg-white/20" aria-hidden="true" />
					<a
						href={SOCIAL_LINKS.instagram}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t.footer.instagram}
						className="text-white hover:text-primary"
					>
						<Instagram className="size-3.5" aria-hidden="true" />
					</a>
					<a
						href={SOCIAL_LINKS.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t.footer.linkedin}
						className="text-white hover:text-primary"
					>
						<Linkedin className="size-3.5" aria-hidden="true" />
					</a>
				</div>
				<Link
					to="/booking/new"
					className="inline-flex items-center gap-1.5 font-medium text-white no-underline hover:text-primary"
				>
					{t.topBar.cta}
					<ArrowRight className="size-3.5" aria-hidden="true" />
				</Link>
			</div>
		</div>
	);
}

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const router = useRouter();
	const { t } = useI18n();

	const pathname = router.state.location.pathname;
	// On the home page the header floats over the hero photo, as in Backhoe.
	const overlay = pathname === "/";
	// After scrolling past the hero top, the header pins to the top of the screen.
	const [stuck, setStuck] = useState(false);

	useEffect(() => {
		const onScroll = (): void => setStuck(window.scrollY > 160);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
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
			<div className={cn(overlay && "absolute inset-x-0 top-0 z-50")}>
				<TopBar />
				{/* Keeps the page from jumping when the in-flow header becomes fixed. */}
				{stuck && !overlay && (
					<div className="h-16 md:h-[76px]" aria-hidden="true" />
				)}
				<header
					className={cn(
						"site-header relative z-40 text-white",
						overlay ? "bg-black/15" : "bg-[#151515]",
						stuck && "header-stuck",
					)}
				>
					<div className="page-wrap flex h-16 items-center gap-6 md:h-[76px]">
						<Link
							to="/"
							className="flex shrink-0 items-center no-underline"
							aria-label="CA HUB AUTO — Home"
						>
							<img
								src="/logo-light.webp"
								alt="CA HUB AUTO"
								className="h-9 w-auto md:h-11"
							/>
						</Link>

						<a
							href={`tel:${SALES_CONTACT.phoneE164}`}
							className="hidden border-l border-white/25 pl-5 leading-tight text-white no-underline lg:block"
						>
							<span className="block text-sm">{t.nav.helpLine}</span>
							<strong className="block text-lg font-bold text-primary">
								{SALES_CONTACT.phoneDisplay}
							</strong>
						</a>

						<nav className="ml-auto hidden items-center gap-7 md:flex">
							{NAV_ITEMS.map((item) => (
								<Link
									key={item.to}
									to={item.to}
									className="nav-underline text-[15px] font-medium text-white no-underline transition-colors hover:text-primary"
									activeProps={{ className: "!text-primary" }}
									activeOptions={{ exact: item.to === "/" }}
								>
									{t.nav[item.key]}
								</Link>
							))}
						</nav>

						<Link
							to="/booking/new"
							className="hidden h-11 items-center bg-primary px-6 text-xs font-bold uppercase tracking-wide text-white no-underline transition-colors hover:bg-primary-hover md:inline-flex"
						>
							{t.nav.bookNow}
						</Link>

						<button
							type="button"
							className="ml-auto inline-flex size-10 items-center justify-center text-white md:hidden"
							onClick={toggleMenu}
							aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
							aria-expanded={mobileOpen}
						>
							{mobileOpen ? (
								<X className="size-6" />
							) : (
								<Menu className="size-6" />
							)}
						</button>
					</div>
				</header>
			</div>

			{mobileOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 md:hidden"
					onClick={closeMenu}
					aria-hidden="true"
				/>
			)}

			<nav
				className={cn(
					"fixed inset-x-0 top-0 z-50 bg-[#151515] px-5 pb-6 pt-4 text-white shadow-lg transition-transform duration-250 ease-out md:hidden",
					mobileOpen
						? "translate-y-0"
						: "pointer-events-none -translate-y-full",
				)}
			>
				<div className="mb-4 flex items-center justify-between">
					<LanguageSwitcher />
					<button
						type="button"
						onClick={closeMenu}
						aria-label={t.nav.closeMenu}
						className="inline-flex size-10 items-center justify-center"
					>
						<X className="size-6" />
					</button>
				</div>
				<div className="flex flex-col">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="border-b border-white/10 py-3 text-base font-medium text-white no-underline"
							activeProps={{ className: "!text-primary" }}
							activeOptions={{ exact: item.to === "/" }}
						>
							{t.nav[item.key]}
						</Link>
					))}
					<a
						href={`tel:${SALES_CONTACT.phoneE164}`}
						className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary no-underline"
					>
						<Phone className="size-4" aria-hidden="true" />
						{SALES_CONTACT.name} — {SALES_CONTACT.phoneDisplay}
					</a>
					<Link
						to="/booking/new"
						className="mt-4 inline-flex h-11 items-center justify-center bg-primary text-xs font-bold uppercase tracking-wide text-white no-underline"
					>
						{t.nav.bookNow}
					</Link>
				</div>
			</nav>
		</>
	);
}
