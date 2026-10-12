// Content that must come from CA HUB (Mr. Lam / Kenny). Sections that read
// these lists render nothing while they are empty, so no placeholder or
// invented testimonial is ever published.

export interface Testimonial {
	quote: string;
	name: string;
	company: string;
	photo?: string;
}

export interface Update {
	title: string;
	date: string;
	tag: string;
	image: string;
	href?: string;
}

export const TESTIMONIALS: Testimonial[] = [];

export const UPDATES: Update[] = [];
