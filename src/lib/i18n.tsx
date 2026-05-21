"use client";

import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export type Language = "en" | "pt";

const STORAGE_KEY = "cahub-language";

export const DICTIONARY = {
	en: {
		languageName: "English",
		nav: {
			home: "Home",
			fleet: "Fleet",
			about: "About",
			contact: "Contact",
			bookNow: "Book Now",
			openMenu: "Open menu",
			closeMenu: "Close menu",
		},
		footer: {
			description:
				"Vehicle and heavy equipment rental support for professional operations across Mozambique.",
			quickLinks: "Quick Links",
			contact: "Contact",
			rights: "All rights reserved.",
			instagram: "Follow CA HUB AUTO on Instagram",
			linkedin: "Follow CA HUB AUTO on LinkedIn",
		},
		hero: {
			aria: "CA HUB AUTO highlights",
			previous: "Previous slide",
			next: "Next slide",
			select: "Select slide",
			slide: "Slide",
			of: "of",
			cta: "Request a Quote",
			slides: [
				{
					kicker: "VEHICLE & MACHINERY RENTAL",
					titleLine1: "Where Logistics",
					titleLine2: "Meets Performance",
					description:
						"Founded in 2023, CA HUB AUTO provides reliable vehicle and heavy equipment rental solutions across Mozambique.",
					image: "/sliders/sldier_1.webp",
				},
				{
					kicker: "HEAVY EQUIPMENT",
					titleLine1: "Power Your",
					titleLine2: "Project Forward",
					description:
						"From mining to construction, our heavy equipment fleet is built for the most demanding job sites.",
					image: "/sliders/slider_2.webp",
				},
				{
					kicker: "RELIABLE FLEET",
					titleLine1: "Built for the",
					titleLine2: "Toughest Terrain",
					description:
						"Our maintained fleet of 4x4s, trucks, and machinery keeps your operations running without interruption.",
					image: "/sliders/slider_3.webp",
				},
				{
					kicker: "ACROSS MOZAMBIQUE",
					titleLine1: "Covering Every Mile,",
					titleLine2: "Every Job",
					description:
						"Telecommunications, infrastructure, logistics — we deliver dependable vehicles wherever your project takes you.",
					image: "/sliders/slider_4.webp",
				},
			],
		},
		bookingPanel: {
			title: "Book Your Vehicle",
			subtitle: "Fast · Flexible · Reliable",
		},
		bookingSearch: {
			vehicleType: "Vehicle type",
			pickupReturn: "Pickup & return",
			returnLocation: "Return location",
			sameReturn: "Same return location",
			differentReturn: "Different return location",
			pickupDate: "Pickup date",
			returnDate: "Return date",
			startRequest: "Start booking request",
		},
		featuredFleet: {
			kicker: "OUR SERVICES",
			title: "Featured Fleet",
			requestQuote: "Request Quote",
		},
		whyChooseUs: {
			kicker: "WHY CHOOSE US",
			title: "Competitive Advantages",
			items: [
				{
					title: "Modern Fleet",
					description:
						"Well maintained and high-performance equipment ensuring operational efficiency across all projects.",
				},
				{
					title: "Qualified Technical Team",
					description:
						"Experienced professionals committed to safety and excellence in every operation.",
				},
				{
					title: "Nationwide Coverage",
					description:
						"Operational capacity across multiple regions of Mozambique with bases in all provinces.",
				},
				{
					title: "Rapid Response",
					description:
						"Efficient service delivery with minimal turnaround time to keep your projects on schedule.",
				},
				{
					title: "Competitive Pricing",
					description:
						"Cost-effective solutions without compromising quality or operational standards.",
				},
			],
		},
		serviceAreas: {
			kicker: "Our Service Areas",
			title: "10 Cities Across All of Mozambique",
			description:
				"Wherever your project takes you — from Maputo to Pemba — our fleet is ready to serve every province in the country.",
			stats: ["Cities", "Provinces", "Available"],
			cities: "Cities we serve",
		},
		video: {
			comingSoon: "Company video coming soon",
		},
		contact: {
			heroKicker: "Where logistics meets performance",
			title: "Contact Us",
			details: "Contact Details",
			infoTitle: "Contact Information",
			location: "Our Location",
			email: "Email Address",
			phone: "Phone Number",
		},
	},
	pt: {
		languageName: "Português",
		nav: {
			home: "Início",
			fleet: "Frota",
			about: "Sobre Nós",
			contact: "Contacto",
			bookNow: "Reservar Agora",
			openMenu: "Abrir menu",
			closeMenu: "Fechar menu",
		},
		footer: {
			description:
				"Aluguer de viaturas e equipamentos pesados para operações profissionais em Moçambique.",
			quickLinks: "Links Rápidos",
			contact: "Contacto",
			rights: "Todos os direitos reservados.",
			instagram: "Siga a CA HUB AUTO no Instagram",
			linkedin: "Siga a CA HUB AUTO no LinkedIn",
		},
		hero: {
			aria: "Destaques da CA HUB AUTO",
			previous: "Slide anterior",
			next: "Próximo slide",
			select: "Selecionar slide",
			slide: "Slide",
			of: "de",
			cta: "Solicitar Cotação",
			slides: [
				{
					kicker: "ALUGUER DE VIATURAS E MÁQUINAS",
					titleLine1: "Onde a Logística",
					titleLine2: "Encontra Performance",
					description:
						"Fundada em 2023, a CA HUB AUTO fornece soluções fiáveis de aluguer de viaturas e equipamentos pesados em Moçambique.",
					image: "/sliders/sldier_1.webp",
				},
				{
					kicker: "EQUIPAMENTO PESADO",
					titleLine1: "Impulsione o",
					titleLine2: "Seu Projecto",
					description:
						"Da mineração à construção, a nossa frota de equipamentos pesados está preparada para os locais de trabalho mais exigentes.",
					image: "/sliders/slider_2.webp",
				},
				{
					kicker: "FROTA FIÁVEL",
					titleLine1: "Preparada para",
					titleLine2: "Terrenos Difíceis",
					description:
						"A nossa frota de 4x4, camiões e máquinas, devidamente mantida, mantém as suas operações em movimento.",
					image: "/sliders/slider_3.webp",
				},
				{
					kicker: "EM TODO MOÇAMBIQUE",
					titleLine1: "Cobrimos Cada Rota,",
					titleLine2: "Cada Obra",
					description:
						"Telecomunicações, infra-estruturas e logística — entregamos viaturas fiáveis onde quer que o seu projecto esteja.",
					image: "/sliders/slider_4.webp",
				},
			],
		},
		bookingPanel: {
			title: "Reserve a Sua Viatura",
			subtitle: "Rápido · Flexível · Fiável",
		},
		bookingSearch: {
			vehicleType: "Tipo de viatura",
			pickupReturn: "Levantamento e devolução",
			returnLocation: "Local de devolução",
			sameReturn: "Mesmo local de devolução",
			differentReturn: "Local de devolução diferente",
			pickupDate: "Data de levantamento",
			returnDate: "Data de devolução",
			startRequest: "Iniciar pedido de reserva",
		},
		featuredFleet: {
			kicker: "OS NOSSOS SERVIÇOS",
			title: "Frota em Destaque",
			requestQuote: "Solicitar Cotação",
		},
		whyChooseUs: {
			kicker: "PORQUÊ ESCOLHER-NOS",
			title: "Vantagens Competitivas",
			items: [
				{
					title: "Frota Moderna",
					description:
						"Equipamentos bem mantidos e de alto desempenho para garantir eficiência operacional em todos os projectos.",
				},
				{
					title: "Equipa Técnica Qualificada",
					description:
						"Profissionais experientes, comprometidos com segurança e excelência em cada operação.",
				},
				{
					title: "Cobertura Nacional",
					description:
						"Capacidade operacional em várias regiões de Moçambique, com presença em todas as províncias.",
				},
				{
					title: "Resposta Rápida",
					description:
						"Serviço eficiente e tempos de resposta reduzidos para manter os seus projectos dentro do prazo.",
				},
				{
					title: "Preços Competitivos",
					description:
						"Soluções económicas sem comprometer a qualidade nem os padrões operacionais.",
				},
			],
		},
		serviceAreas: {
			kicker: "Áreas de Serviço",
			title: "10 Cidades em Todo Moçambique",
			description:
				"Onde quer que o seu projecto esteja — de Maputo a Pemba — a nossa frota está pronta para servir todas as províncias do país.",
			stats: ["Cidades", "Províncias", "Disponível"],
			cities: "Cidades que servimos",
		},
		video: {
			comingSoon: "Vídeo institucional brevemente disponível",
		},
		contact: {
			heroKicker: "Onde a logística encontra performance",
			title: "Contacte-nos",
			details: "Detalhes de Contacto",
			infoTitle: "Informação de Contacto",
			location: "A Nossa Localização",
			email: "Endereço de Email",
			phone: "Número de Telefone",
		},
	},
} as const;

type Dictionary = typeof DICTIONARY.en;

interface I18nContextValue {
	language: Language;
	t: Dictionary;
	setLanguage: (language: Language) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState] = useState<Language>("en");

	useEffect(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === "en" || stored === "pt") setLanguageState(stored);
	}, []);

	const setLanguage = useCallback((nextLanguage: Language) => {
		setLanguageState(nextLanguage);
		window.localStorage.setItem(STORAGE_KEY, nextLanguage);
	}, []);

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const value = useMemo(
		() => ({ language, t: DICTIONARY[language], setLanguage }),
		[language, setLanguage],
	);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
	const context = useContext(I18nContext);
	if (!context) throw new Error("useI18n must be used within I18nProvider");
	return context;
}
