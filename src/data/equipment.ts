import {
	Box,
	Construction,
	Container,
	Drill,
	Droplets,
	Factory,
	Fuel,
	Gauge,
	Hammer,
	Layers,
	type LucideIcon,
	Ruler,
	Settings,
	Tractor,
	Truck,
	Weight,
	Zap,
} from "lucide-react";
import type { Language } from "#/lib/i18n";

// Single source of truth for the equipment catalogue. The fleet page, home
// sections, detail pages, booking flow, chatbot and sitemap all read from here.
// Specs are indicative; exact unit specs are confirmed in each quote.

export type Localized = Record<Language, string>;

export interface EquipmentCategory {
	id: string;
	name: Localized;
	description: Localized;
	icon: LucideIcon;
}

export interface EquipmentSpec {
	label: Localized;
	value: string | Localized;
	icon: LucideIcon;
}

export interface Equipment {
	id: string;
	categoryId: string;
	name: Localized;
	summary: Localized;
	description: Localized;
	specs: EquipmentSpec[];
	applications: Localized[];
	image: string;
	/** Background-free image for Backhoe-style boxes; falls back to `image`. */
	cutout?: string;
	gallery: string[];
}

// Display order = business priority (Mr. Lam: crushers, excavators, loaders,
// generators first, then the rest).
export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
	{
		id: "crushers",
		name: { en: "Crushers", pt: "Britadores" },
		description: {
			en: "Jaw and cone crushers for primary and secondary crushing.",
			pt: "Britadores de mandíbulas e cónicos para britagem primária e secundária.",
		},
		icon: Hammer,
	},
	{
		id: "excavators",
		name: { en: "Excavators", pt: "Escavadoras" },
		description: {
			en: "Crawler excavators for digging, trenching and loading.",
			pt: "Escavadoras de rastos para escavação, valas e carregamento.",
		},
		icon: Construction,
	},
	{
		id: "wheel-loaders",
		name: { en: "Wheel Loaders", pt: "Pás Carregadoras" },
		description: {
			en: "Wheel loaders for stockpile handling and truck loading.",
			pt: "Pás carregadoras para manuseamento de pilhas e carregamento de camiões.",
		},
		icon: Tractor,
	},
	{
		id: "generators",
		name: { en: "Generators", pt: "Geradores" },
		description: {
			en: "Diesel generator sets to power remote sites and plants.",
			pt: "Grupos geradores a diesel para alimentar obras e plantas remotas.",
		},
		icon: Zap,
	},
	{
		id: "dump-trucks",
		name: { en: "Dump Trucks", pt: "Camiões Basculantes" },
		description: {
			en: "Heavy tippers for ore, waste and aggregate haulage.",
			pt: "Basculantes pesados para transporte de minério, estéril e agregados.",
		},
		icon: Truck,
	},
	{
		id: "drilling-rigs",
		name: { en: "Drilling Rigs", pt: "Perfuradoras" },
		description: {
			en: "Surface drill rigs for blast-hole and exploration drilling.",
			pt: "Perfuradoras de superfície para furos de desmonte e prospecção.",
		},
		icon: Drill,
	},
	{
		id: "ball-mills",
		name: { en: "Ball Mills", pt: "Moinhos de Bolas" },
		description: {
			en: "Grinding mills for mineral processing and ore milling.",
			pt: "Moinhos para processamento mineral e moagem de minério.",
		},
		icon: Settings,
	},
	{
		id: "support",
		name: { en: "Site Support", pt: "Apoio à Obra" },
		description: {
			en: "Water bowsers and other support equipment for mine sites.",
			pt: "Camiões-cisterna e outro equipamento de apoio para minas.",
		},
		icon: Droplets,
	},
];

export const EQUIPMENT: Equipment[] = [
	{
		id: "mobile-jaw-crusher",
		categoryId: "crushers",
		name: { en: "Mobile Jaw Crusher", pt: "Britador de Mandíbulas Móvel" },
		summary: {
			en: "Track-mounted primary crusher for hard rock, ore and quarry material.",
			pt: "Britador primário sobre rastos para rocha dura, minério e material de pedreira.",
		},
		description: {
			en: "A track-mounted jaw crusher for primary crushing at the face or the stockpile. It handles hard rock, ore and demolition material, and moves between work areas without a low-bed. Supplied with a certified operator on request.",
			pt: "Britador de mandíbulas sobre rastos para britagem primária na frente de trabalho ou na pilha. Processa rocha dura, minério e material de demolição, e desloca-se entre áreas de trabalho sem camião de transporte. Fornecido com operador certificado, se solicitado.",
		},
		specs: [
			{
				label: { en: "Capacity", pt: "Capacidade" },
				value: "150–350 t/h",
				icon: Gauge,
			},
			{
				label: { en: "Max feed size", pt: "Alimentação máx." },
				value: "≈ 800 mm",
				icon: Ruler,
			},
			{
				label: { en: "Mobility", pt: "Mobilidade" },
				value: { en: "Tracked", pt: "Sobre rastos" },
				icon: Construction,
			},
			{
				label: { en: "Power", pt: "Energia" },
				value: "Diesel",
				icon: Fuel,
			},
		],
		applications: [
			{ en: "Primary crushing of ore", pt: "Britagem primária de minério" },
			{ en: "Quarry aggregate production", pt: "Produção de agregados" },
			{ en: "Road base material", pt: "Material para base de estradas" },
		],
		image: "/equipment/crushers/jaw-crusher-1.webp",
		cutout: "/equipment/crushers/jaw-crusher-cutout.webp",
		gallery: [
			"/equipment/crushers/jaw-crusher-1.webp",
			"/equipment/crushers/jaw-crusher-2.webp",
		],
	},
	{
		id: "mobile-cone-crusher",
		categoryId: "crushers",
		name: { en: "Cone Crusher & Screen", pt: "Britador Cónico e Crivo" },
		summary: {
			en: "Secondary crushing and screening for sized aggregate and ore.",
			pt: "Britagem secundária e crivagem para agregado e minério calibrados.",
		},
		description: {
			en: "A cone crusher with screening for secondary and tertiary crushing. Pair it with a jaw crusher to produce sized aggregate or to reduce ore before milling.",
			pt: "Britador cónico com crivagem para britagem secundária e terciária. Combine-o com um britador de mandíbulas para produzir agregado calibrado ou reduzir minério antes da moagem.",
		},
		specs: [
			{
				label: { en: "Capacity", pt: "Capacidade" },
				value: "100–300 t/h",
				icon: Gauge,
			},
			{
				label: { en: "Product size", pt: "Granulometria" },
				value: "5–40 mm",
				icon: Ruler,
			},
			{
				label: { en: "Screen decks", pt: "Decks de crivo" },
				value: "2–3",
				icon: Layers,
			},
			{
				label: { en: "Power", pt: "Energia" },
				value: "Diesel",
				icon: Fuel,
			},
		],
		applications: [
			{ en: "Secondary ore crushing", pt: "Britagem secundária de minério" },
			{ en: "Sized aggregate", pt: "Agregado calibrado" },
			{
				en: "Mill feed preparation",
				pt: "Preparação de alimentação do moinho",
			},
		],
		image: "/equipment/crushers/cone-crusher-1.webp",
		cutout: "/equipment/crushers/cone-crusher-cutout.webp",
		gallery: [
			"/equipment/crushers/cone-crusher-1.webp",
			"/equipment/crushers/cone-crusher-2.webp",
		],
	},
	{
		id: "develon-excavator",
		categoryId: "excavators",
		name: {
			en: "Develon DX220 Excavator",
			pt: "Escavadora Develon DX220",
		},
		summary: {
			en: "22-tonne crawler excavator for digging, trenching and truck loading.",
			pt: "Escavadora de rastos de 22 toneladas para escavação, valas e carregamento.",
		},
		description: {
			en: "A 22-tonne class crawler excavator with high productivity and low fuel use. It loads trucks, opens trenches and prepares benches on hard mining and construction sites.",
			pt: "Escavadora de rastos da classe de 22 toneladas, com alta produtividade e baixo consumo. Carrega camiões, abre valas e prepara bancadas em minas e obras exigentes.",
		},
		specs: [
			{
				label: { en: "Operating weight", pt: "Peso operacional" },
				value: "≈ 22 t",
				icon: Weight,
			},
			{
				label: { en: "Bucket", pt: "Balde" },
				value: "≈ 1.0 m³",
				icon: Box,
			},
			{
				label: { en: "Undercarriage", pt: "Material rodante" },
				value: { en: "Crawler", pt: "Rastos" },
				icon: Construction,
			},
			{
				label: { en: "Fuel", pt: "Combustível" },
				value: "Diesel",
				icon: Fuel,
			},
		],
		applications: [
			{ en: "Truck loading", pt: "Carregamento de camiões" },
			{ en: "Bench and pit preparation", pt: "Preparação de bancadas" },
			{ en: "Trenching and drainage", pt: "Valas e drenagem" },
		],
		image: "/equipment/excavators/develon-dx220-1.webp",
		cutout: "/equipment/excavators/develon-dx220-cutout.webp",
		gallery: [
			"/equipment/excavators/develon-dx220-1.webp",
			"/equipment/excavators/develon-dx220-2.webp",
			"/equipment/excavators/develon-dx220-3.webp",
		],
	},
	{
		id: "develon-loader",
		categoryId: "wheel-loaders",
		name: {
			en: "Develon SD300 Wheel Loader",
			pt: "Pá Carregadora Develon SD300",
		},
		summary: {
			en: "3-tonne wheel loader for stockpiles, loading and site clean-up.",
			pt: "Pá carregadora de 3 toneladas para pilhas, carregamento e limpeza de obra.",
		},
		description: {
			en: "A versatile wheel loader for loading trucks, feeding crushers and managing stockpiles. It moves fast between work areas on varied terrain.",
			pt: "Pá carregadora versátil para carregar camiões, alimentar britadores e gerir pilhas. Desloca-se rapidamente entre áreas de trabalho em terrenos variados.",
		},
		specs: [
			{
				label: { en: "Rated load", pt: "Carga nominal" },
				value: "3 t",
				icon: Weight,
			},
			{
				label: { en: "Bucket", pt: "Balde" },
				value: "≈ 1.8 m³",
				icon: Box,
			},
			{
				label: { en: "Drive", pt: "Tracção" },
				value: "4WD",
				icon: Tractor,
			},
			{
				label: { en: "Fuel", pt: "Combustível" },
				value: "Diesel",
				icon: Fuel,
			},
		],
		applications: [
			{ en: "Crusher feeding", pt: "Alimentação de britadores" },
			{ en: "Stockpile management", pt: "Gestão de pilhas" },
			{ en: "Truck loading", pt: "Carregamento de camiões" },
		],
		image: "/equipment/wheel-loaders/develon-sd300-1.webp",
		cutout: "/equipment/wheel-loaders/develon-sd300-cutout.webp",
		gallery: [
			"/equipment/wheel-loaders/develon-sd300-1.webp",
			"/equipment/wheel-loaders/develon-sd300-2.webp",
			"/equipment/wheel-loaders/develon-sd300-3.webp",
		],
	},
	{
		id: "diesel-generator",
		categoryId: "generators",
		name: { en: "Diesel Generator Set", pt: "Grupo Gerador a Diesel" },
		summary: {
			en: "Silent diesel gensets from 100 to 500 kVA for sites and plants.",
			pt: "Geradores a diesel insonorizados de 100 a 500 kVA para obras e plantas.",
		},
		description: {
			en: "Canopied diesel generator sets for prime or standby power. They run crushers, camps, workshops and processing plants where grid power is not available.",
			pt: "Grupos geradores a diesel com canópia para energia principal ou de reserva. Alimentam britadores, acampamentos, oficinas e plantas de processamento onde não há rede eléctrica.",
		},
		specs: [
			{
				label: { en: "Power range", pt: "Potência" },
				value: "100–500 kVA",
				icon: Zap,
			},
			{
				label: { en: "Output", pt: "Saída" },
				value: "400 V · 50 Hz · 3φ",
				icon: Gauge,
			},
			{
				label: { en: "Enclosure", pt: "Canópia" },
				value: { en: "Soundproof", pt: "Insonorizada" },
				icon: Container,
			},
			{
				label: { en: "Fuel", pt: "Combustível" },
				value: "Diesel",
				icon: Fuel,
			},
		],
		applications: [
			{
				en: "Crusher and plant power",
				pt: "Energia para britadores e plantas",
			},
			{ en: "Mine camps and offices", pt: "Acampamentos e escritórios" },
			{ en: "Standby power", pt: "Energia de reserva" },
		],
		image: "/equipment/generators/diesel-generator-1.webp",
		cutout: "/equipment/generators/diesel-generator-cutout.webp",
		gallery: ["/equipment/generators/diesel-generator-1.webp"],
	},
	{
		id: "scania-mining",
		categoryId: "dump-trucks",
		name: { en: "Scania Heavy Tipper", pt: "Basculante Pesado Scania" },
		summary: {
			en: "Multi-axle heavy tipper for ore, waste and aggregate haulage.",
			pt: "Basculante pesado multi-eixo para transporte de minério, estéril e agregados.",
		},
		description: {
			en: "A heavy-duty Scania tipper built for mine and quarry haul roads. It moves ore, waste rock and aggregate with high payload and low operating cost.",
			pt: "Basculante Scania de serviço pesado para estradas de mina e pedreira. Transporta minério, estéril e agregados com alta carga útil e baixo custo operacional.",
		},
		specs: [
			{
				label: { en: "Payload", pt: "Carga útil" },
				value: "25–30 t",
				icon: Weight,
			},
			{
				label: { en: "Body", pt: "Caixa" },
				value: { en: "Rock tipper", pt: "Basculante de rocha" },
				icon: Box,
			},
			{
				label: { en: "Axles", pt: "Eixos" },
				value: { en: "Multi-axle", pt: "Multi-eixo" },
				icon: Truck,
			},
			{
				label: { en: "Fuel", pt: "Combustível" },
				value: "Diesel",
				icon: Fuel,
			},
		],
		applications: [
			{ en: "Ore haulage", pt: "Transporte de minério" },
			{ en: "Waste rock removal", pt: "Remoção de estéril" },
			{ en: "Aggregate delivery", pt: "Entrega de agregados" },
		],
		image: "/equipment/dump-trucks/scania-tipper-1.webp",
		cutout: "/equipment/dump-trucks/scania-tipper-cutout.webp",
		gallery: [
			"/equipment/dump-trucks/scania-tipper-1.webp",
			"/equipment/dump-trucks/scania-tipper-2.webp",
			"/equipment/dump-trucks/scania-tipper-3.webp",
		],
	},
	{
		id: "surface-drill-rig",
		categoryId: "drilling-rigs",
		name: { en: "Surface Drill Rig", pt: "Perfuradora de Superfície" },
		summary: {
			en: "Crawler drill rig for blast holes in open-pit mines and quarries.",
			pt: "Perfuradora sobre rastos para furos de desmonte em minas e pedreiras.",
		},
		description: {
			en: "A crawler-mounted surface drill rig for production blast holes and pre-split drilling. Top-hammer and DTH configurations are available on request.",
			pt: "Perfuradora de superfície sobre rastos para furos de produção e pré-corte. Configurações de martelo de topo e DTH disponíveis mediante pedido.",
		},
		specs: [
			{
				label: { en: "Hole diameter", pt: "Diâmetro do furo" },
				value: "89–165 mm",
				icon: Ruler,
			},
			{
				label: { en: "Hole depth", pt: "Profundidade" },
				value: { en: "Up to ≈ 30 m", pt: "Até ≈ 30 m" },
				icon: Drill,
			},
			{
				label: { en: "Method", pt: "Método" },
				value: "Top hammer / DTH",
				icon: Hammer,
			},
			{
				label: { en: "Mobility", pt: "Mobilidade" },
				value: { en: "Tracked", pt: "Sobre rastos" },
				icon: Construction,
			},
		],
		applications: [
			{ en: "Production blast holes", pt: "Furos de desmonte" },
			{ en: "Quarry benches", pt: "Bancadas de pedreira" },
			{ en: "Pre-split drilling", pt: "Perfuração de pré-corte" },
		],
		image: "/equipment/drilling-rigs/drill-rig-1.webp",
		cutout: "/equipment/drilling-rigs/drill-rig-cutout.webp",
		gallery: [
			"/equipment/drilling-rigs/drill-rig-1.webp",
			"/equipment/drilling-rigs/drill-rig-2.webp",
		],
	},
	{
		id: "ball-mill",
		categoryId: "ball-mills",
		name: { en: "Ball Mill", pt: "Moinho de Bolas" },
		summary: {
			en: "Grinding mill for ore processing and mineral liberation.",
			pt: "Moinho para processamento de minério e libertação mineral.",
		},
		description: {
			en: "A ball mill for wet or dry grinding of crushed ore. Use it in gold, graphite and other mineral processing circuits. Sizing is matched to your throughput in the quote.",
			pt: "Moinho de bolas para moagem húmida ou seca de minério britado. Utilizado em circuitos de processamento de ouro, grafite e outros minerais. O dimensionamento é ajustado ao seu caudal na cotação.",
		},
		specs: [
			{
				label: { en: "Throughput", pt: "Capacidade" },
				value: "5–50 t/h",
				icon: Gauge,
			},
			{
				label: { en: "Grinding", pt: "Moagem" },
				value: { en: "Wet or dry", pt: "Húmida ou seca" },
				icon: Settings,
			},
			{
				label: { en: "Drive", pt: "Accionamento" },
				value: { en: "Electric motor", pt: "Motor eléctrico" },
				icon: Zap,
			},
			{
				label: { en: "Use", pt: "Utilização" },
				value: { en: "Processing plant", pt: "Planta de processamento" },
				icon: Factory,
			},
		],
		applications: [
			{ en: "Gold ore grinding", pt: "Moagem de minério de ouro" },
			{ en: "Mineral processing", pt: "Processamento mineral" },
			{ en: "Pilot plants", pt: "Plantas piloto" },
		],
		image: "/equipment/ball-mills/ball-mill-1.webp",
		gallery: ["/equipment/ball-mills/ball-mill-1.webp"],
	},
	{
		id: "water-bowser",
		categoryId: "support",
		name: { en: "Water Bowser", pt: "Camião-Cisterna de Água" },
		summary: {
			en: "Water truck for dust suppression on haul roads and pits.",
			pt: "Camião-cisterna para controlo de poeiras em estradas e cavas.",
		},
		description: {
			en: "A water bowser for dust suppression, compaction water and site supply. It keeps haul roads safe and meets environmental conditions on site.",
			pt: "Camião-cisterna para controlo de poeiras, água de compactação e abastecimento da obra. Mantém as estradas de transporte seguras e cumpre as exigências ambientais.",
		},
		specs: [
			{
				label: { en: "Tank", pt: "Tanque" },
				value: "15,000–20,000 L",
				icon: Droplets,
			},
			{
				label: { en: "Spray", pt: "Aspersão" },
				value: { en: "Front & rear bars", pt: "Barras frente e trás" },
				icon: Gauge,
			},
			{
				label: { en: "Drive", pt: "Tracção" },
				value: "6x4",
				icon: Truck,
			},
			{
				label: { en: "Fuel", pt: "Combustível" },
				value: "Diesel",
				icon: Fuel,
			},
		],
		applications: [
			{ en: "Haul road dust control", pt: "Controlo de poeiras" },
			{ en: "Compaction water", pt: "Água para compactação" },
			{ en: "Site water supply", pt: "Abastecimento de água" },
		],
		image: "/equipment/support/water-bowser-1.webp",
		cutout: "/equipment/support/water-bowser-cutout.webp",
		gallery: ["/equipment/support/water-bowser-1.webp"],
	},
];

export function getEquipment(id: string): Equipment | undefined {
	return EQUIPMENT.find((item) => item.id === id);
}

export function getCategory(id: string): EquipmentCategory | undefined {
	return EQUIPMENT_CATEGORIES.find((category) => category.id === id);
}

export function getEquipmentByCategory(categoryId: string): Equipment[] {
	return EQUIPMENT.filter((item) => item.categoryId === categoryId);
}

/** Equipment sorted by category priority, then by catalogue order. */
export function getEquipmentInPriorityOrder(): Equipment[] {
	return EQUIPMENT_CATEGORIES.flatMap((category) =>
		getEquipmentByCategory(category.id),
	);
}

export function localize(
	value: string | Localized,
	language: Language,
): string {
	return typeof value === "string" ? value : value[language];
}
