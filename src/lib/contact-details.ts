// TODO_SIMAO_PHONE: replace the placeholder phone fields with Simão's number
// before the production deploy. Every phone link on the site reads from here.
export const SALES_CONTACT = {
	name: "Simão",
	phoneDisplay: "TODO_SIMAO_PHONE",
	phoneE164: "TODO_SIMAO_PHONE",
	whatsapp: "TODO_SIMAO_PHONE",
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
