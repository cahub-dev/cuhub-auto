// Sales contact. Every phone, WhatsApp and email link on the site reads from here.
export const SALES_CONTACT = {
	name: "Simão",
	phoneDisplay: "+258 84 663 4635",
	phoneE164: "+258846634635",
	whatsapp: "258846634635",
	email: "info@cahubauto.com",
} as const;

export const COMPANY_ADDRESS = {
	lines: [
		"Moçambique, Cidade de Maputo",
		"Distrito de Kamavota, Costa do Sol",
		"Rua de Micaia, Q.56, nº115",
	],
	street: "Rua de Micaia, Q.56, nº115",
	locality: "Maputo",
	region: "Maputo City",
	country: "MZ",
	mapQuery: "Costa do Sol Rua de Micaia Q.56 Maputo Mozambique",
	geo: { latitude: -25.9655, longitude: 32.5832 },
} as const;

export const BUSINESS_HOURS = {
	en: "Mon–Sat, 07:00–18:00",
	pt: "Seg–Sáb, 07:00–18:00",
} as const;

export const SOCIAL_LINKS = {
	instagram: "https://www.instagram.com/cahub.auto.rental",
	linkedin: "https://www.linkedin.com/in/cahub-auto-rental/",
} as const;
