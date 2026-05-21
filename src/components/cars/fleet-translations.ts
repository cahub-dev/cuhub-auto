import type { CarDetailData } from "#/components/cars/car-detail-data";
import type { FleetCardData } from "#/components/cars/FleetCard";
import type { Language } from "#/lib/i18n";

const SECTOR_PT: Record<string, string> = {
	Mining: "Mineração",
	Construction: "Construção",
	Infrastructure: "Infra-estruturas",
	Rural: "Rural",
	"Heavy Industry": "Indústria Pesada",
};

const CATEGORY_PT: Record<string, string> = {
	Vehicles: "Viaturas",
	"Heavy Equipment": "Equipamento Pesado",
	Trucks: "Camiões",
	"Premium SUV": "SUV Premium",
	"Operational Pickup": "Pickup Operacional",
	"Team Pickup": "Pickup para Equipas",
	"Mining Truck": "Camião Mineiro",
};

const VALUE_PT: Record<string, string> = {
	"7 People": "7 Pessoas",
	"5 People": "5 Pessoas",
	"2 People": "2 Pessoas",
	"5 Doors": "5 Portas",
	"4 Doors": "4 Portas",
	"2 Doors": "2 Portas",
	"93 Liters": "93 Litros",
	"80 Liters": "80 Litros",
	Diesel: "Diesel",
	Automatic: "Automática",
	Manual: "Manual",
	Large: "Grande",
	"Open bed": "Caixa aberta",
	Optional: "Opcional",
	Cabin: "Cabina",
	"Site work": "Trabalho em obra",
	Hydraulic: "Hidráulico",
	Wheel: "Rodas",
	Excavation: "Escavação",
	Tracked: "Rasto",
	Hauling: "Transporte pesado",
	Heavy: "Pesado",
	Mining: "Mineração",
};

const LABEL_PT: Record<string, string> = {
	"Seat Capacity": "Capacidade",
	"Total Doors": "Portas",
	"Fuel Tank": "Tanque de combustível",
	"Fuel Type": "Combustível",
	Mileage: "Consumo",
	Transmission: "Transmissão",
	"Drive Type": "Tração",
	Cargo: "Carga",
	Operator: "Operador",
	Access: "Acesso",
	Usage: "Uso",
	Control: "Controlo",
	Drive: "Tração",
	Bucket: "Balde",
	Duty: "Serviço",
	Load: "Carga",
};

const EXTRA_PT: Record<string, string> = {
	"Professional driver": "Motorista profissional",
	"Vehicle delivery": "Entrega da viatura",
	"Premium insurance": "Seguro premium",
	"Certified operator": "Operador certificado",
	"Site transport": "Transporte para obra",
	"Priority support": "Suporte prioritário",
};

const STANDARD_INCLUDED_PT = [
	"Suporte de manutenção programada durante o período de aluguer.",
	"Seguro básico abrangente incluído.",
	"Inspeção da viatura antes da entrega.",
	"Coordenação flexível de levantamento em Maputo.",
	"Assistência 24/7 para reservas activas.",
];

const STANDARD_EXCLUDED_PT = [
	"Consumo de combustível e portagens.",
	"Multas ou penalizações durante o aluguer.",
	"Taxas transfronteiriças salvo aprovação prévia.",
	"Alojamento do motorista para viagens fora da cidade.",
];

const EQUIPMENT_INCLUDED_PT = [
	"Inspeção preventiva antes do envio.",
	"Briefing de entrega ao operador incluído.",
	"Coordenação de manutenção durante o aluguer activo.",
	"Agendamento flexível de mobilização em Maputo.",
];

const EQUIPMENT_EXCLUDED_PT = [
	"Combustível e lubrificantes durante a operação.",
	"Licenças de obra, multas ou taxas de acesso.",
	"Danos causados por uso indevido ou operação insegura.",
	"Transporte para fora da cidade salvo cotação prévia.",
];

const CARD_PT: Record<
	string,
	Pick<FleetCardData, "category" | "description" | "sectors">
> = {
	"toyota-land-cruiser": {
		category: "Viaturas",
		description:
			"Desenvolvida para operações de alto desempenho, fiabilidade operacional, segurança e presença profissional. Ideal para supervisão e logística em ambientes exigentes.",
		sectors: ["Mineração", "Construção"],
	},
	"nissan-navara-single": {
		category: "Viaturas",
		description:
			"Viatura estratégica de apoio operacional, concebida para mobilidade em terrenos difíceis. Ideal para transportar supervisores, técnicos e equipamento ligeiro.",
		sectors: ["Mineração", "Construção", "Rural"],
	},
	"nissan-navara-double": {
		category: "Viaturas",
		description:
			"Ideal para operações em terrenos difíceis, incluindo mineração, construção e zonas rurais. Oferece desempenho, segurança e mobilidade fiável para equipas operacionais.",
		sectors: ["Mineração", "Construção", "Rural"],
	},
	"develon-loader": {
		category: "Equipamento Pesado",
		description:
			"Combina potência e versatilidade para escavação, carregamento e transporte eficiente de materiais em terrenos variados.",
		sectors: ["Construção", "Mineração", "Infra-estruturas"],
	},
	"develon-excavator": {
		category: "Equipamento Pesado",
		description:
			"Oferece alta produtividade, baixo consumo de combustível e durabilidade para operações contínuas e seguras em terrenos difíceis.",
		sectors: ["Mineração", "Construção", "Infra-estruturas"],
	},
	"scania-mining": {
		category: "Camiões",
		description:
			"Preparado para desempenho extremo, redução de custos operacionais e capacidade superior de transporte em ambientes mineiros exigentes.",
		sectors: ["Mineração", "Indústria Pesada"],
	},
};

const DETAIL_PT: Record<
	string,
	Pick<
		CarDetailData,
		| "category"
		| "location"
		| "description"
		| "included"
		| "excluded"
		| "highlights"
	>
> = {
	"toyota-land-cruiser": {
		category: "SUV Premium",
		location: "Maputo, Moçambique",
		description:
			"SUV premium fiável para viagens executivas, visitas a projectos e operações de longa distância em Moçambique. Combina capacidade 4x4, conforto e presença profissional.",
		included: STANDARD_INCLUDED_PT,
		excluded: STANDARD_EXCLUDED_PT,
		highlights: [
			"Excelente conforto para equipas executivas e operacionais.",
			"Forte capacidade 4x4 para rotas exigentes.",
			"Ideal para mineração, construção e operações rurais.",
			"Períodos de aluguer flexíveis para missões curtas ou longas.",
		],
	},
	"nissan-navara-single": {
		category: "Pickup Operacional",
		location: "Maputo, Moçambique",
		description:
			"Pickup de cabine simples prática para transporte de equipamento ligeiro, mobilidade em obra e operações diárias fiáveis.",
		included: STANDARD_INCLUDED_PT,
		excluded: STANDARD_EXCLUDED_PT,
		highlights: [
			"Transporte eficiente de ferramentas e equipamento ligeiro.",
			"Mobilidade fiável para supervisores e técnicos.",
			"Adequada para construção, mineração e rotas rurais.",
			"Aluguer diário económico para operações.",
		],
	},
	"nissan-navara-double": {
		category: "Pickup para Equipas",
		location: "Maputo, Moçambique",
		description:
			"Pickup de cabine dupla versátil para equipas que precisam de conforto para passageiros e flexibilidade de carga numa viatura robusta.",
		included: STANDARD_INCLUDED_PT,
		excluded: STANDARD_EXCLUDED_PT,
		highlights: [
			"Transporte confortável de equipas com capacidade de carga.",
			"Bom desempenho em estradas rurais e não pavimentadas.",
			"Ideal para equipas técnicas e supervisão em obra.",
			"Disponível com motorista mediante pedido.",
		],
	},
	"develon-loader": {
		category: "Equipamento Pesado",
		location: "Maputo, Moçambique",
		description:
			"Pá carregadora potente para manuseamento de materiais, carregamento e preparação de obra em construção, infra-estruturas e mineração.",
		included: EQUIPMENT_INCLUDED_PT,
		excluded: EQUIPMENT_EXCLUDED_PT,
		highlights: [
			"Alta produtividade para terraplanagem e carregamento.",
			"Disponível com apoio de operador mediante pedido.",
			"Adequada para construção, mineração e infra-estruturas.",
			"Janelas flexíveis de mobilização para obras activas.",
		],
	},
	"develon-excavator": {
		category: "Equipamento Pesado",
		location: "Maputo, Moçambique",
		description:
			"Escavadora de rastos robusta para escavação, abertura de valas e preparação pesada de obra onde a produtividade contínua é crítica.",
		included: EQUIPMENT_INCLUDED_PT,
		excluded: EQUIPMENT_EXCLUDED_PT,
		highlights: [
			"Construída para escavação e abertura de valas exigentes.",
			"Forte desempenho hidráulico para operação contínua.",
			"Boa opção para mineração, construção e infra-estruturas.",
			"Operador e transporte disponíveis como extras.",
		],
	},
	"scania-mining": {
		category: "Camião Mineiro",
		location: "Maputo, Moçambique",
		description:
			"Camião de serviço extremo configurado para mineração e transporte industrial, onde durabilidade e eficiência operacional são essenciais.",
		included: EQUIPMENT_INCLUDED_PT,
		excluded: EQUIPMENT_EXCLUDED_PT,
		highlights: [
			"Capacidade fiável para transporte industrial pesado.",
			"Concebido para ambientes mineiros exigentes.",
			"Disponível para aluguer de curto prazo ou por projecto.",
			"Apoio de motorista e planeamento de mobilização disponíveis.",
		],
	},
};

export function localizeFleetCard(
	car: FleetCardData,
	language: Language,
): FleetCardData {
	if (language !== "pt") return car;
	const translated = CARD_PT[car.id];
	return translated ? { ...car, ...translated } : car;
}

export function localizeCarDetail(
	car: CarDetailData,
	language: Language,
): CarDetailData {
	if (language !== "pt") return car;
	const translated = DETAIL_PT[car.id];
	return {
		...car,
		...(translated ?? {}),
		category: translated?.category ?? CATEGORY_PT[car.category] ?? car.category,
		location:
			translated?.location ?? car.location.replace("Mozambique", "Moçambique"),
		specs: car.specs.map((spec) => ({
			...spec,
			label: LABEL_PT[spec.label] ?? spec.label,
			value: VALUE_PT[spec.value] ?? spec.value,
		})),
		extras: car.extras.map((extra) => ({
			...extra,
			label: EXTRA_PT[extra.label] ?? extra.label,
		})),
	};
}

export function localizeCategory(category: string, language: Language): string {
	return language === "pt" ? (CATEGORY_PT[category] ?? category) : category;
}

export function localizeSector(sector: string, language: Language): string {
	return language === "pt" ? (SECTOR_PT[sector] ?? sector) : sector;
}
