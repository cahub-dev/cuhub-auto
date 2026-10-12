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
			fleet: "Equipment",
			about: "About",
			contact: "Contact",
			bookNow: "Request a Quote",
			callUs: "Call us",
			helpLine: "Need help? Talk to an expert",
			openMenu: "Open menu",
			closeMenu: "Close menu",
		},
		topBar: {
			tagline: "Mining machinery & equipment rental across Mozambique",
			cta: "Need equipment on site? Request a quote",
		},
		footer: {
			description:
				"Mining machinery and equipment rental for crushing, earthmoving, haulage, drilling and site power across Mozambique.",
			aboutCompany: "About Company",
			information: "Information",
			contactInfo: "Contact Info",
			address: "Address",
			support: "Sales & support",
			workingTime: "Working time",
			emailLabel: "Email",
			quickLinks: "Quick Links",
			equipment: "Equipment",
			contact: "Contact",
			hours: "Business hours",
			rights: "All rights reserved.",
			instagram: "Follow CA HUB AUTO on Instagram",
			linkedin: "Follow CA HUB AUTO on LinkedIn",
		},
		hero: {
			title: "Rent mining equipment.",
			subtitle:
				"Crushers, excavators, loaders, generators and more — delivered to your site.",
			equipmentPlaceholder: "What are you looking for?",
			categoryPlaceholder: "Select category",
			startDate: "Start date",
			search: "Search",
			listAll: "Or list all available equipment in our",
			listAllLink: "catalogue.",
		},
		featuredFleet: {
			kicker: "AVAILABLE FOR RENT",
			title: "Featured Equipment",
			description:
				"Mining-grade machines, serviced and ready for deployment. No online prices — we send a quote matched to your site and schedule.",
			requestQuote: "Request Quote",
			viewDetails: "View details",
			viewAll: "View all equipment",
		},
		whyChooseUs: {
			kicker: "OUR ADVANTAGES",
			title: "Built for Mining Operations",
			items: [
				{
					title: "Mining-Grade Fleet",
					description:
						"Crushers, excavators, loaders, gensets and haul trucks maintained to work full shifts in hard conditions.",
				},
				{
					title: "Certified Operators",
					description:
						"Experienced, safety-trained operators available with every machine.",
				},
				{
					title: "Nationwide Mobilisation",
					description:
						"We transport and set up equipment at mine sites and quarries in all provinces.",
				},
				{
					title: "Rapid Response",
					description:
						"Fast quotes, fast delivery and fast support to keep your project on schedule.",
				},
				{
					title: "Safety & Compliance",
					description:
						"Inspected equipment, documented maintenance and site safety standards on every rental.",
				},
			],
		},
		howItWorks: {
			kicker: "HOW IT WORKS",
			title: "From request to site in three steps",
			steps: [
				{
					title: "Choose your equipment",
					description:
						"Browse the catalogue or tell us the job. We help you size the right machine.",
				},
				{
					title: "Receive a quote",
					description:
						"We confirm availability and send a proposal for your dates, site and operator needs.",
				},
				{
					title: "Delivered to your site",
					description:
						"We mobilise, set up and support the equipment for the full rental period.",
				},
			],
		},
		home: {
			categories: { ghost: "Let's choose", title: "Categories" },
			benefitsA: {
				kicker: "Why rent with CA HUB",
				title: "Keep production moving without buying a fleet",
				paragraphs: [
					"Renting gives you the right machine for each phase of the project, without capital cost, storage or idle time.",
					"We deliver, service and support every unit on site, so your team can focus on tonnes moved and ore processed.",
				],
				points: [
					{
						title: "Mining operators",
						text: "Crushing, loading and haulage capacity for open-pit mines and quarries.",
					},
					{
						title: "Contractors",
						text: "Flexible fleets for earthworks, roads and plant construction projects.",
					},
				],
				call: "Talk to our sales team",
			},
			features: { ghost: "Our best", title: "Features" },
			benefitsB: {
				kicker: "Delivered to your site",
				title: "Mining-grade equipment, ready to work",
				paragraphs: [
					"Every machine is inspected before mobilisation and maintained during the rental by our technical team.",
					"We transport and set up equipment at mine sites in all 10 provinces of Mozambique.",
				],
				points: [
					{
						title: "Certified operators",
						text: "Safety-trained operators available for every machine on request.",
					},
					{
						title: "Fast response",
						text: "Quotes within 24 hours and quick breakdown support on site.",
					},
				],
			},
			featured: {
				ghost: "Our latest",
				title: "Featured equipment",
				viewAll: "View all equipment",
			},
			process: {
				ghost: "The process",
				title: "How does it work",
				quoteStatus: "Quote requested",
				quoteLines: ["Start: next week", "Duration: 3 months", "Site: Tete"],
			},
			stats: [
				{ value: "2023", label: "Founded" },
				{ value: "10", label: "Provinces" },
				{ value: "8", label: "Equipment types" },
				{ value: "24/7", label: "Support" },
			],
			testimonials: { ghost: "Our clients", title: "Testimonials" },
			updates: { ghost: "Our latest", title: "Updates" },
		},
		bookingPage: {
			ghost: "Get a quote",
			kicker: "Quote Request",
			title: "Request a Quote",
			description:
				"Tell us the equipment, site and dates. Send it via WhatsApp or email — no payment online. We confirm availability and prepare a proposal.",
		},
		bookingFlow: {
			steps: ["Equipment", "Project", "Client", "Review"],
			stepsLabel: "Quote request steps",
			selectFleet: "Select the equipment you need",
			notSureLine1: "Not sure,",
			notSureLine2: "advise me",
			province: "Province",
			pickupDelivery: "Site location",
			pickupPlaceholder: "Mine, quarry, plant or project area",
			startDate: "Start date",
			returnDate: "End date",
			projectUse: "Project / scope of work",
			projectPlaceholder:
				"Tell us about the job: material, volumes, quantity of units and operator needs.",
			addons: "Services",
			optional: "optional",
			extraLabels: [
				"Certified operator",
				"Delivery & mobilisation",
				"Maintenance & servicing",
				"Fuel supply",
				"Insurance",
			],
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
			fleetRental: "Equipment & Project",
			contactDetails: "Contact Details",
			category: "Category",
			location: "Site",
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
			error: "Unable to send the quote request. Please try again.",
		},
		fleetPage: {
			pageTitle: "Equipment",
			sortBy: "Sort by",
			sortDefault: "Default sorting",
			sortName: "Sort by name",
			categoriesTitle: "Equipment Categories",
			results: "results",
			heroKicker: "Mining machinery & equipment for rent",
			heroTitle: "Our Equipment",
			search: "Search",
			searchFleet: "Search equipment",
			searchPlaceholder: "Search equipment...",
			selectFleet: "Equipment Type",
			allCategories: "All equipment",
			clearFilters: "Clear filters",
			showing: "Showing",
			of: "of",
			units: "units",
			noResults: "No equipment matches your filters.",
			tryAdjusting: "Try adjusting your filters or search query.",
			resultsLabel: "Equipment results",
			helpTitle: "Can't find what you need?",
			helpDescription:
				"Our fleet grows with demand. Tell us the job and we will source the right machine.",
		},
		equipmentDetail: {
			bannerTitle: "Equipment",
			delivered: "Delivered across Mozambique",
			categoryLabel: "Category",
			tabDescription: "Description",
			tabSpecs: "Specifications",
			tabQuote: "Request a quote",
			relatedTitle: "Related Equipment",
			about: "About this equipment",
			specs: "Key specifications",
			specNote:
				"Indicative specifications. Exact unit details are confirmed in your quote.",
			applications: "Typical applications",
			services: "Rental support",
			serviceItems: [
				"Certified operator available on request",
				"Delivery and mobilisation to your site",
				"Scheduled maintenance during the rental",
				"Breakdown response and replacement support",
			],
			quoteTitle: "Request a Quote",
			quoteSubtitle: "No online payment. We reply within 24 hours.",
			startDate: "Start date",
			duration: "Rental duration",
			durations: ["1 week", "2 weeks", "1 month", "3 months", "6+ months"],
			province: "Province",
			siteLocation: "Site location",
			sitePlaceholder: "Mine, quarry or project area",
			quantity: "Quantity",
			operator: "Certified operator required",
			sendWhatsApp: "Send via WhatsApp",
			sendEmail: "Send via Email",
			fullForm: "Use the full quote form",
			notFoundTitle: "Equipment not found",
			notFoundDescription:
				"This item is not available in the current catalogue.",
			backToFleet: "Back to equipment",
			related: "More in this category",
		},
		serviceAreas: {
			kicker: "Our Service Areas",
			title: "Equipment Delivered Across Mozambique",
			description:
				"From Tete coal fields to Cabo Delgado and Nampula mining districts — we mobilise equipment to every province in the country.",
			stats: ["Cities", "Provinces", "Available"],
			cities: "Cities we serve",
		},
		contact: {
			ghost: "It's nice to",
			getInTouch: "Get in touch",
			intro:
				"We will be happy to hear from you. Contact our sales team for equipment availability and a quote, or send us a message below.",
			subjectPlaceholder: "Subject",
			addressLabel: "Our Address",
			heroKicker: "Mining machinery & equipment rental",
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
			messagePlaceholder: "Tell us the equipment and project you need",
			sendMessage: "Send Message",
			mailSubject: "Website contact inquiry",
			mailIntro: "Website contact inquiry",
			notProvided: "Not provided",
			messageLabel: "Message:",
			mapTitle: "CA HUB AUTO location map",
		},
		about: {
			featuresTitles: ["Mission", "Vision", "Values"],
			statBoxTitle: "Since 2023, your mining equipment partner",
			statBoxText:
				"A Mozambican team supplying crushers, earthmoving, haulage, drilling and power equipment to mines and quarries.",
			safetyTitle: "Committed to safe, productive sites",
			safetyText:
				"Inspected machines, trained operators and documented maintenance on every rental.",
			bestTitle: "Why mining teams choose CA HUB",
			bestText:
				"One partner for the equipment, the operators and the support that keep production moving.",
			industriesGhost: "Our sectors",
			industriesTitle: "Industries we serve",
			heroKicker: "Founded in Mozambique · 2023",
			title: "About Us",
			heroSubtitle: "Mining Machinery & Equipment Rental",
			introKicker: "WHO WE ARE",
			introTitle: "Who is CA HUB AUTO?",
			paragraphs: [
				"Founded in 2023, CA HUB AUTO is a Mozambican company specialising in the rental of mining machinery and equipment. Our fleet covers the full mining cycle: jaw and cone crushers, excavators, wheel loaders, diesel generators, dump trucks, drilling rigs, ball mills and site support equipment.",
				"We support mining operators, quarries, contractors and processing plants with reliable machines, certified operators and on-site technical support — from Maputo to Tete, Nampula and Cabo Delgado.",
				"Driven by safety, availability and fast response, our goal is to be the trusted equipment partner for mining projects in Mozambique.",
			],
			stats: ["Founded", "Provinces", "Industries", "Support"],
			sectorsTitle: "Sectors We Serve",
			sectors: [
				"Mining",
				"Quarrying",
				"Mineral Processing",
				"Construction",
				"Infrastructure",
			],
			foundationKicker: "OUR FOUNDATION",
			foundationTitle: "Mission, Vision & Values",
			cards: [
				{
					title: "Mission",
					items: [
						"Supply reliable mining equipment that keeps production moving.",
						"Deliver services that raise productivity and safety on site.",
						"Support the success of our clients in every project phase.",
					],
				},
				{
					title: "Vision",
					items: [
						"Become the leading mining equipment rental company in Mozambique.",
						"Be recognised for operational excellence, safety and long-term partnerships.",
					],
				},
				{
					title: "Values",
					items: [
						"Deliver on our promises with transparency and accountability.",
						"Prioritise the protection of people, assets and the environment.",
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
				"Equipment Mobilisation",
				"Operational Period",
				"Demobilisation & Closure",
			],
		},
	},
	pt: {
		languageName: "Português",
		nav: {
			home: "Início",
			fleet: "Equipamentos",
			about: "Sobre Nós",
			contact: "Contacto",
			bookNow: "Solicitar Cotação",
			callUs: "Ligue-nos",
			helpLine: "Precisa de ajuda? Fale com um especialista",
			openMenu: "Abrir menu",
			closeMenu: "Fechar menu",
		},
		topBar: {
			tagline: "Aluguer de máquinas e equipamentos de mineração em Moçambique",
			cta: "Precisa de equipamento na obra? Solicite cotação",
		},
		footer: {
			description:
				"Aluguer de máquinas e equipamentos de mineração para britagem, terraplanagem, transporte, perfuração e energia em todo Moçambique.",
			aboutCompany: "Sobre a Empresa",
			information: "Informação",
			contactInfo: "Contactos",
			address: "Endereço",
			support: "Vendas e suporte",
			workingTime: "Horário",
			emailLabel: "Email",
			quickLinks: "Links Rápidos",
			equipment: "Equipamentos",
			contact: "Contacto",
			hours: "Horário",
			rights: "Todos os direitos reservados.",
			instagram: "Siga a CA HUB AUTO no Instagram",
			linkedin: "Siga a CA HUB AUTO no LinkedIn",
		},
		hero: {
			title: "Alugue equipamento de mineração.",
			subtitle:
				"Britadores, escavadoras, pás carregadoras, geradores e mais — entregues na sua obra.",
			equipmentPlaceholder: "O que procura?",
			categoryPlaceholder: "Selecione a categoria",
			startDate: "Data de início",
			search: "Procurar",
			listAll: "Ou veja todos os equipamentos disponíveis no nosso",
			listAllLink: "catálogo.",
		},
		featuredFleet: {
			kicker: "DISPONÍVEL PARA ALUGUER",
			title: "Equipamentos em Destaque",
			description:
				"Máquinas de nível mineiro, revistas e prontas a mobilizar. Sem preços online — enviamos uma cotação ajustada à sua obra e calendário.",
			requestQuote: "Solicitar Cotação",
			viewDetails: "Ver detalhes",
			viewAll: "Ver todos os equipamentos",
		},
		whyChooseUs: {
			kicker: "AS NOSSAS VANTAGENS",
			title: "Preparados para Operações Mineiras",
			items: [
				{
					title: "Frota de Nível Mineiro",
					description:
						"Britadores, escavadoras, pás carregadoras, geradores e camiões mantidos para turnos completos em condições exigentes.",
				},
				{
					title: "Operadores Certificados",
					description:
						"Operadores experientes e formados em segurança disponíveis com cada máquina.",
				},
				{
					title: "Mobilização Nacional",
					description:
						"Transportamos e instalamos equipamentos em minas e pedreiras de todas as províncias.",
				},
				{
					title: "Resposta Rápida",
					description:
						"Cotações, entregas e apoio rápidos para manter o seu projecto dentro do prazo.",
				},
				{
					title: "Segurança e Conformidade",
					description:
						"Equipamento inspeccionado, manutenção documentada e normas de segurança em cada aluguer.",
				},
			],
		},
		howItWorks: {
			kicker: "COMO FUNCIONA",
			title: "Do pedido à obra em três passos",
			steps: [
				{
					title: "Escolha o equipamento",
					description:
						"Consulte o catálogo ou descreva o trabalho. Ajudamos a dimensionar a máquina certa.",
				},
				{
					title: "Receba a cotação",
					description:
						"Confirmamos a disponibilidade e enviamos uma proposta para as suas datas, obra e necessidade de operador.",
				},
				{
					title: "Entregue na sua obra",
					description:
						"Mobilizamos, instalamos e apoiamos o equipamento durante todo o período de aluguer.",
				},
			],
		},
		home: {
			categories: { ghost: "Escolha", title: "Categorias" },
			benefitsA: {
				kicker: "Porquê alugar com a CA HUB",
				title: "Mantenha a produção sem comprar uma frota",
				paragraphs: [
					"O aluguer dá-lhe a máquina certa para cada fase do projecto, sem custo de capital, armazenamento ou tempo parado.",
					"Entregamos, mantemos e apoiamos cada unidade na obra, para que a sua equipa se concentre nas toneladas movidas e no minério processado.",
				],
				points: [
					{
						title: "Operadores mineiros",
						text: "Capacidade de britagem, carregamento e transporte para minas a céu aberto e pedreiras.",
					},
					{
						title: "Empreiteiros",
						text: "Frotas flexíveis para terraplanagem, estradas e construção de plantas.",
					},
				],
				call: "Fale com a nossa equipa comercial",
			},
			features: { ghost: "O melhor", title: "Vantagens" },
			benefitsB: {
				kicker: "Entregue na sua obra",
				title: "Equipamento de nível mineiro, pronto a trabalhar",
				paragraphs: [
					"Cada máquina é inspeccionada antes da mobilização e mantida durante o aluguer pela nossa equipa técnica.",
					"Transportamos e instalamos equipamentos em minas nas 10 províncias de Moçambique.",
				],
				points: [
					{
						title: "Operadores certificados",
						text: "Operadores formados em segurança disponíveis para cada máquina, mediante pedido.",
					},
					{
						title: "Resposta rápida",
						text: "Cotações em 24 horas e apoio rápido a avarias na obra.",
					},
				],
			},
			featured: {
				ghost: "Destaques",
				title: "Equipamentos em destaque",
				viewAll: "Ver todos os equipamentos",
			},
			process: {
				ghost: "O processo",
				title: "Como funciona",
				quoteStatus: "Cotação solicitada",
				quoteLines: [
					"Início: próxima semana",
					"Duração: 3 meses",
					"Obra: Tete",
				],
			},
			stats: [
				{ value: "2023", label: "Fundação" },
				{ value: "10", label: "Províncias" },
				{ value: "8", label: "Tipos de equipamento" },
				{ value: "24/7", label: "Suporte" },
			],
			testimonials: { ghost: "Clientes", title: "Testemunhos" },
			updates: { ghost: "Novidades", title: "Actualizações" },
		},
		bookingPage: {
			ghost: "Cotação",
			kicker: "Pedido de Cotação",
			title: "Solicitar Cotação",
			description:
				"Indique o equipamento, a obra e as datas. Envie por WhatsApp ou email — sem pagamento online. Confirmamos a disponibilidade e preparamos uma proposta.",
		},
		bookingFlow: {
			steps: ["Equipamento", "Projecto", "Cliente", "Revisão"],
			stepsLabel: "Passos do pedido de cotação",
			selectFleet: "Selecione o equipamento de que precisa",
			notSureLine1: "Não tenho certeza,",
			notSureLine2: "aconselhem-me",
			province: "Província",
			pickupDelivery: "Local da obra",
			pickupPlaceholder: "Mina, pedreira, planta ou área do projecto",
			startDate: "Data de início",
			returnDate: "Data de fim",
			projectUse: "Projecto / âmbito do trabalho",
			projectPlaceholder:
				"Descreva o trabalho: material, volumes, número de unidades e necessidade de operador.",
			addons: "Serviços",
			optional: "opcional",
			extraLabels: [
				"Operador certificado",
				"Entrega e mobilização",
				"Manutenção e assistência",
				"Fornecimento de combustível",
				"Seguro",
			],
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
			fleetRental: "Equipamento e Projecto",
			contactDetails: "Dados de Contacto",
			category: "Categoria",
			location: "Obra",
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
		fleetPage: {
			pageTitle: "Equipamentos",
			sortBy: "Ordenar por",
			sortDefault: "Ordenação padrão",
			sortName: "Ordenar por nome",
			categoriesTitle: "Categorias de Equipamento",
			results: "resultados",
			heroKicker: "Máquinas e equipamentos de mineração para aluguer",
			heroTitle: "Os Nossos Equipamentos",
			search: "Pesquisa",
			searchFleet: "Pesquisar equipamentos",
			searchPlaceholder: "Pesquisar equipamentos...",
			selectFleet: "Tipo de Equipamento",
			allCategories: "Todos os equipamentos",
			clearFilters: "Limpar filtros",
			showing: "A mostrar",
			of: "de",
			units: "unidades",
			noResults: "Nenhum equipamento corresponde aos filtros.",
			tryAdjusting: "Experimente ajustar os filtros ou a pesquisa.",
			resultsLabel: "Resultados de equipamentos",
			helpTitle: "Não encontra o que precisa?",
			helpDescription:
				"A nossa frota cresce com a procura. Descreva o trabalho e encontraremos a máquina certa.",
		},
		equipmentDetail: {
			bannerTitle: "Equipamentos",
			delivered: "Entregue em todo Moçambique",
			categoryLabel: "Categoria",
			tabDescription: "Descrição",
			tabSpecs: "Especificações",
			tabQuote: "Solicitar cotação",
			relatedTitle: "Equipamentos Relacionados",
			about: "Sobre este equipamento",
			specs: "Especificações principais",
			specNote:
				"Especificações indicativas. Os detalhes exactos da unidade são confirmados na cotação.",
			applications: "Aplicações típicas",
			services: "Apoio ao aluguer",
			serviceItems: [
				"Operador certificado disponível mediante pedido",
				"Entrega e mobilização até à sua obra",
				"Manutenção programada durante o aluguer",
				"Resposta a avarias e apoio de substituição",
			],
			quoteTitle: "Solicitar Cotação",
			quoteSubtitle: "Sem pagamento online. Respondemos em 24 horas.",
			startDate: "Data de início",
			duration: "Duração do aluguer",
			durations: ["1 semana", "2 semanas", "1 mês", "3 meses", "6+ meses"],
			province: "Província",
			siteLocation: "Local da obra",
			sitePlaceholder: "Mina, pedreira ou área do projecto",
			quantity: "Quantidade",
			operator: "Necessito de operador certificado",
			sendWhatsApp: "Enviar por WhatsApp",
			sendEmail: "Enviar por Email",
			fullForm: "Usar o formulário completo",
			notFoundTitle: "Equipamento não encontrado",
			notFoundDescription: "Este item não está disponível no catálogo actual.",
			backToFleet: "Voltar aos equipamentos",
			related: "Mais nesta categoria",
		},
		serviceAreas: {
			kicker: "Áreas de Serviço",
			title: "Equipamentos Entregues em Todo Moçambique",
			description:
				"Das minas de carvão de Tete aos distritos mineiros de Cabo Delgado e Nampula — mobilizamos equipamentos para todas as províncias do país.",
			stats: ["Cidades", "Províncias", "Disponível"],
			cities: "Cidades que servimos",
		},
		contact: {
			ghost: "Fale connosco",
			getInTouch: "Entre em contacto",
			intro:
				"Teremos todo o gosto em ouvi-lo. Contacte a nossa equipa comercial para disponibilidade e cotação, ou envie-nos uma mensagem abaixo.",
			subjectPlaceholder: "Assunto",
			addressLabel: "O Nosso Endereço",
			heroKicker: "Aluguer de máquinas e equipamentos de mineração",
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
			messagePlaceholder: "Indique o equipamento e o projecto de que precisa",
			sendMessage: "Enviar Mensagem",
			mailSubject: "Pedido de contacto pelo website",
			mailIntro: "Pedido de contacto pelo website",
			notProvided: "Não indicado",
			messageLabel: "Mensagem:",
			mapTitle: "Mapa de localização da CA HUB AUTO",
		},
		about: {
			featuresTitles: ["Missão", "Visão", "Valores"],
			statBoxTitle: "Desde 2023, o seu parceiro em equipamento mineiro",
			statBoxText:
				"Uma equipa moçambicana que fornece equipamento de britagem, terraplanagem, transporte, perfuração e energia a minas e pedreiras.",
			safetyTitle: "Comprometidos com obras seguras e produtivas",
			safetyText:
				"Máquinas inspeccionadas, operadores formados e manutenção documentada em cada aluguer.",
			bestTitle: "Porque as equipas mineiras escolhem a CA HUB",
			bestText:
				"Um único parceiro para o equipamento, os operadores e o apoio que mantêm a produção.",
			industriesGhost: "Sectores",
			industriesTitle: "Sectores que servimos",
			heroKicker: "Fundada em Moçambique · 2023",
			title: "Sobre Nós",
			heroSubtitle: "Aluguer de Máquinas e Equipamentos de Mineração",
			introKicker: "QUEM SOMOS",
			introTitle: "Quem é a CA HUB AUTO?",
			paragraphs: [
				"Fundada em 2023, a CA HUB AUTO é uma empresa moçambicana especializada no aluguer de máquinas e equipamentos de mineração. A nossa frota cobre todo o ciclo mineiro: britadores de mandíbulas e cónicos, escavadoras, pás carregadoras, geradores a diesel, camiões basculantes, perfuradoras, moinhos de bolas e equipamento de apoio.",
				"Apoiamos operadores mineiros, pedreiras, empreiteiros e plantas de processamento com máquinas fiáveis, operadores certificados e apoio técnico na obra — de Maputo a Tete, Nampula e Cabo Delgado.",
				"Movidos pela segurança, disponibilidade e resposta rápida, o nosso objectivo é ser o parceiro de equipamentos de confiança para projectos mineiros em Moçambique.",
			],
			stats: ["Fundação", "Províncias", "Sectores", "Suporte"],
			sectorsTitle: "Sectores que Servimos",
			sectors: [
				"Mineração",
				"Pedreiras",
				"Processamento Mineral",
				"Construção",
				"Infra-estruturas",
			],
			foundationKicker: "A NOSSA BASE",
			foundationTitle: "Missão, Visão e Valores",
			cards: [
				{
					title: "Missão",
					items: [
						"Fornecer equipamentos de mineração fiáveis que mantêm a produção.",
						"Prestar serviços que aumentam a produtividade e a segurança na obra.",
						"Apoiar o sucesso dos nossos clientes em todas as fases do projecto.",
					],
				},
				{
					title: "Visão",
					items: [
						"Tornar-se a empresa líder no aluguer de equipamentos de mineração em Moçambique.",
						"Ser reconhecida pela excelência operacional, segurança e parcerias de longo prazo.",
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
				"Mobilização do Equipamento",
				"Período Operacional",
				"Desmobilização e Fecho",
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
