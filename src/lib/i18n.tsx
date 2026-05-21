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
		bookingFlow: {
			steps: ["Fleet", "Rental", "Client", "Review"],
			stepsLabel: "Booking steps",
			selectFleet: "Select a vehicle or equipment",
			notSureLine1: "Not sure,",
			notSureLine2: "advise me",
			province: "Province",
			pickupDelivery: "Pickup / delivery location",
			pickupPlaceholder: "Site, office, or project area",
			startDate: "Start date",
			returnDate: "Return date",
			projectUse: "Project / intended use",
			projectPlaceholder: "Tell us what the vehicle or equipment will support.",
			addons: "Add-ons",
			optional: "optional",
			companyName: "Company name",
			nuit: "NUIT",
			optionalInitial: "Optional for initial request",
			industrySector: "Industry sector",
			contactPerson: "Contact person",
			phone: "Phone",
			email: "Email",
			physicalAddress: "Physical address",
			reviewNotice:
				"This sends a quote request only — no payment is taken online. CA HUB AUTO will confirm availability and send a proposal.",
			fleetRental: "Fleet & Rental",
			contactDetails: "Contact Details",
			category: "Category",
			location: "Location",
			none: "None",
			company: "Company",
			sector: "Sector",
			contact: "Contact",
			address: "Address",
			quoteOnly: "Quote request only",
			quoteOnlyDescription:
				"No payment online. We confirm availability and send a proposal first.",
			reply24: "Reply within 24 hours",
			allProvinces: "All 10 provinces covered",
			directContact: "Direct contact",
			yourRequest: "Your request",
			from: "From",
			until: "Until",
			back: "Back",
			continue: "Continue",
			sending: "Sending...",
			sendEmail: "Send via Email",
			sendWhatsApp: "Send via WhatsApp",
			success:
				"Request sent. We emailed you a copy and notified our sales team.",
			error: "Unable to send booking request. Please try again.",
		},
		featuredFleet: {
			kicker: "OUR SERVICES",
			title: "Featured Fleet",
			requestQuote: "Request Quote",
		},
		fleetPage: {
			heroKicker: "Reliable fleet for demanding operations",
			heroTitle: "Our Fleet",
			search: "Search",
			searchFleet: "Search fleet",
			searchPlaceholder: "Search...",
			selectFleet: "Select Fleet",
			sectors: "Sectors",
			sortBy: "Sort by",
			recommended: "Recommended",
			vehiclesFirst: "Vehicles first",
			heavyFirst: "Heavy equipment first",
			clearFilters: "Clear filters",
			showing: "Showing",
			of: "of",
			units: "units",
			noResults: "No fleet units match your filters.",
			tryAdjusting: "Try adjusting your filters or search query.",
			resultsLabel: "Fleet results",
			sortFleet: "Sort fleet",
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
			formKicker: "Get In Touch",
			formTitle: "Send A Message",
			namePlaceholder: "Your Name",
			emailPlaceholder: "Your email",
			phonePlaceholder: "Phone number",
			messagePlaceholder: "Type message",
			sendMessage: "Send Message",
			mailSubject: "Website contact inquiry",
			mailIntro: "Website contact inquiry",
			notProvided: "Not provided",
			messageLabel: "Message:",
			mapTitle: "CA HUB AUTO location map",
		},
		about: {
			heroKicker: "Founded in Mozambique · 2023",
			title: "About Us",
			heroSubtitle: "Where Logistics Meets Performance",
			introKicker: "WHO WE ARE",
			introTitle: "Who is CA HUB AUTO?",
			paragraphs: [
				"Founded in 2023, CA HUB AUTO specializes in vehicle rental, providing a wide range of vehicles and machinery adapted to the needs of various sectors. Our fleet includes double-cab vehicles, vehicles for construction and mining, excavators, wheel loaders, and other heavy equipment essential for infrastructure development and mineral exploration.",
				"With operations covering major hubs in Mozambique, CA HUB AUTO is committed to offering reliable, efficient, and customized transport solutions to support projects throughout the country. We cater to sectors in mining, construction, and telecommunications.",
				"Driven by professionalism and customer satisfaction, our goal is to be your trusted partner in mobility and machinery services in Mozambique.",
			],
			stats: ["Founded", "Provinces", "Industries", "Support"],
			sectorsTitle: "Sectors We Serve",
			sectors: [
				"Mining",
				"Construction",
				"Infrastructure",
				"Telecommunications",
				"Rural Logistics",
			],
			foundationKicker: "OUR FOUNDATION",
			foundationTitle: "Mission, Vision & Values",
			cards: [
				{
					title: "Mission",
					items: [
						"Serve efficient and reliable logistics.",
						"Services that enhance productivity.",
						"Oversee the success of our clients in their respective industrial sectors.",
					],
				},
				{
					title: "Vision",
					items: [
						"Become a leading logistics and equipment rental company in Mozambique.",
						"Recognized for operational excellence, innovation, and long-term partnerships.",
					],
				},
				{
					title: "Values",
					items: [
						"Deliver on our promises with transparency and accountability.",
						"Prioritize the protection of people, assets, and the environment.",
						"Pursue continuous improvement in our standards.",
					],
				},
			],
			processKicker: "HOW IT WORKS",
			processTitle: "Our Rental Process",
			processDescription:
				"Seven steps from first contact to project completion.",
			processSteps: [
				"Client Request",
				"Technical Assessment",
				"Commercial Proposal",
				"Contract Signing",
				"Equipment Delivery",
				"Operational Period",
				"Return & Closure",
			],
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
		bookingFlow: {
			steps: ["Frota", "Aluguer", "Cliente", "Revisão"],
			stepsLabel: "Passos da reserva",
			selectFleet: "Selecione uma viatura ou equipamento",
			notSureLine1: "Não tenho certeza,",
			notSureLine2: "aconselhem-me",
			province: "Província",
			pickupDelivery: "Local de levantamento / entrega",
			pickupPlaceholder: "Obra, escritório ou área do projecto",
			startDate: "Data de início",
			returnDate: "Data de devolução",
			projectUse: "Projecto / uso previsto",
			projectPlaceholder:
				"Indique para que a viatura ou equipamento será usado.",
			addons: "Serviços adicionais",
			optional: "opcional",
			companyName: "Nome da empresa",
			nuit: "NUIT",
			optionalInitial: "Opcional para o pedido inicial",
			industrySector: "Sector de actividade",
			contactPerson: "Pessoa de contacto",
			phone: "Telefone",
			email: "Email",
			physicalAddress: "Endereço físico",
			reviewNotice:
				"Este é apenas um pedido de cotação — nenhum pagamento é feito online. A CA HUB AUTO confirmará a disponibilidade e enviará uma proposta.",
			fleetRental: "Frota e Aluguer",
			contactDetails: "Dados de Contacto",
			category: "Categoria",
			location: "Localização",
			none: "Nenhum",
			company: "Empresa",
			sector: "Sector",
			contact: "Contacto",
			address: "Endereço",
			quoteOnly: "Pedido de cotação apenas",
			quoteOnlyDescription:
				"Sem pagamento online. Confirmamos a disponibilidade e enviamos uma proposta primeiro.",
			reply24: "Resposta em até 24 horas",
			allProvinces: "Cobertura das 10 províncias",
			directContact: "Contacto directo",
			yourRequest: "O seu pedido",
			from: "De",
			until: "Até",
			back: "Voltar",
			continue: "Continuar",
			sending: "A enviar...",
			sendEmail: "Enviar por Email",
			sendWhatsApp: "Enviar por WhatsApp",
			success:
				"Pedido enviado. Enviámos uma cópia por email e notificámos a nossa equipa comercial.",
			error: "Não foi possível enviar o pedido. Tente novamente.",
		},
		featuredFleet: {
			kicker: "OS NOSSOS SERVIÇOS",
			title: "Frota em Destaque",
			requestQuote: "Solicitar Cotação",
		},
		fleetPage: {
			heroKicker: "Frota fiável para operações exigentes",
			heroTitle: "A Nossa Frota",
			search: "Pesquisa",
			searchFleet: "Pesquisar frota",
			searchPlaceholder: "Pesquisar...",
			selectFleet: "Selecionar Frota",
			sectors: "Sectores",
			sortBy: "Ordenar por",
			recommended: "Recomendado",
			vehiclesFirst: "Viaturas primeiro",
			heavyFirst: "Equipamento pesado primeiro",
			clearFilters: "Limpar filtros",
			showing: "A mostrar",
			of: "de",
			units: "unidades",
			noResults: "Nenhuma unidade corresponde aos filtros selecionados.",
			tryAdjusting: "Experimente ajustar os filtros ou a pesquisa.",
			resultsLabel: "Resultados da frota",
			sortFleet: "Ordenar frota",
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
			formKicker: "Entre em Contacto",
			formTitle: "Envie uma Mensagem",
			namePlaceholder: "O seu nome",
			emailPlaceholder: "O seu email",
			phonePlaceholder: "Número de telefone",
			messagePlaceholder: "Escreva a mensagem",
			sendMessage: "Enviar Mensagem",
			mailSubject: "Pedido de contacto pelo website",
			mailIntro: "Pedido de contacto pelo website",
			notProvided: "Não indicado",
			messageLabel: "Mensagem:",
			mapTitle: "Mapa de localização da CA HUB AUTO",
		},
		about: {
			heroKicker: "Fundada em Moçambique · 2023",
			title: "Sobre Nós",
			heroSubtitle: "Onde a Logística Encontra Performance",
			introKicker: "QUEM SOMOS",
			introTitle: "Quem é a CA HUB AUTO?",
			paragraphs: [
				"Fundada em 2023, a CA HUB AUTO especializa-se no aluguer de viaturas, oferecendo uma ampla gama de veículos e máquinas adaptadas às necessidades de vários sectores. A nossa frota inclui viaturas de cabine dupla, viaturas para construção e mineração, escavadoras, pás carregadoras e outros equipamentos pesados essenciais para o desenvolvimento de infra-estruturas e exploração mineral.",
				"Com operações nos principais centros de Moçambique, a CA HUB AUTO está comprometida em oferecer soluções de transporte fiáveis, eficientes e personalizadas para apoiar projectos em todo o país. Servimos sectores como mineração, construção e telecomunicações.",
				"Movidos pelo profissionalismo e pela satisfação do cliente, o nosso objectivo é ser o seu parceiro de confiança em mobilidade e serviços de maquinaria em Moçambique.",
			],
			stats: ["Fundação", "Províncias", "Sectores", "Suporte"],
			sectorsTitle: "Sectores que Servimos",
			sectors: [
				"Mineração",
				"Construção",
				"Infra-estruturas",
				"Telecomunicações",
				"Logística Rural",
			],
			foundationKicker: "A NOSSA BASE",
			foundationTitle: "Missão, Visão e Valores",
			cards: [
				{
					title: "Missão",
					items: [
						"Servir com logística eficiente e fiável.",
						"Prestar serviços que aumentam a produtividade.",
						"Acompanhar o sucesso dos nossos clientes nos seus respectivos sectores industriais.",
					],
				},
				{
					title: "Visão",
					items: [
						"Tornar-se uma empresa líder em logística e aluguer de equipamentos em Moçambique.",
						"Ser reconhecida pela excelência operacional, inovação e parcerias de longo prazo.",
					],
				},
				{
					title: "Valores",
					items: [
						"Cumprir as nossas promessas com transparência e responsabilidade.",
						"Priorizar a protecção das pessoas, dos activos e do ambiente.",
						"Procurar melhoria contínua nos nossos padrões.",
					],
				},
			],
			processKicker: "COMO FUNCIONA",
			processTitle: "O Nosso Processo de Aluguer",
			processDescription:
				"Sete passos desde o primeiro contacto até à conclusão do projecto.",
			processSteps: [
				"Pedido do Cliente",
				"Avaliação Técnica",
				"Proposta Comercial",
				"Assinatura do Contrato",
				"Entrega do Equipamento",
				"Período Operacional",
				"Devolução e Fecho",
			],
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
