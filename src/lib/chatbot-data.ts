import { SALES_CONTACT } from "#/lib/contact-details";

export const BUSINESS_DATA = {
	company: {
		name: "CA HUB AUTO",
		phone: SALES_CONTACT.phoneDisplay,
		whatsapp: SALES_CONTACT.whatsapp,
		email: SALES_CONTACT.email,
		address: "Rua de Micaia, Q.56, nº115, Maputo",
		businessHours: "Monday–Saturday, 07:00–18:00",
	},
	fleet: [
		{
			name: "Toyota Land Cruiser",
			type: "4x4 SUV",
			capacity: "7 people",
			dailyRate: 120,
			weeklyRateNote: "Weekly and project rates available on request",
			bestFor: "Executive travel, site visits, long-distance operations",
		},
		{
			name: "Nissan Navara Single Cab",
			type: "Light truck / Pickup",
			capacity: "2 people",
			dailyRate: 85,
			bestFor: "Light cargo movement, site mobility, operational teams",
		},
		{
			name: "Nissan Navara Double Cab",
			type: "Light truck / Pickup",
			capacity: "5 people",
			dailyRate: 95,
			bestFor: "Field teams needing passenger and cargo capacity",
		},
		{
			name: "Develon Loader SD300",
			type: "Heavy equipment",
			dailyRate: 280,
			bestFor:
				"Material handling, loading, site preparation, construction and mining",
			operatorAvailable: true,
		},
		{
			name: "Develon Excavator DX220",
			type: "Heavy equipment",
			dailyRate: 340,
			bestFor: "Excavation, trenching, heavy site preparation",
			operatorAvailable: true,
		},
		{
			name: "Scania Mining Truck",
			type: "Heavy vehicle",
			dailyRate: 420,
			bestFor: "Mining and industrial hauling operations",
		},
	],
	extras: [
		{ name: "Professional driver", price: "$45/day" },
		{ name: "Certified operator (heavy equipment)", price: "$80/day" },
		{ name: "Vehicle delivery to site", price: "$25 per delivery" },
		{ name: "Premium insurance", price: "$18/day" },
		{ name: "Site transport (equipment)", price: "$65 per deployment" },
	],
	included: [
		"Scheduled maintenance support during rental period",
		"Basic comprehensive insurance",
		"Roadworthy inspection before handover",
		"Flexible pickup coordination in Maputo",
		"24/7 rental assistance for active bookings",
	],
	serviceAreas: [
		"Maputo City",
		"Maputo Province",
		"Gaza",
		"Inhambane",
		"Sofala (Beira)",
		"Manica",
		"Tete",
		"Zambezia (Quelimane)",
		"Nampula",
		"Cabo Delgado",
	],
	faqs: [
		{
			q: "What is the minimum rental period?",
			a: "Minimum rental is 1 day. Weekly and monthly rates are available for longer projects.",
		},
		{
			q: "Is a driver or operator included?",
			a: "Driver/operator is optional and can be added as an extra. Vehicles can be rented with or without a driver.",
		},
		{
			q: "What documents are required to rent?",
			a: "Valid ID or passport, driver's licence (for vehicle rentals), and a signed rental agreement. Corporate clients may provide a company letter.",
		},
		{
			q: "Are long-term or project-based rates available?",
			a: "Yes. For projects lasting weeks or months we offer customised rates. Contact us for a quote.",
		},
		{
			q: "Is insurance included?",
			a: "Basic comprehensive insurance is included. Premium insurance is available as an add-on.",
		},
		{
			q: "What happens in case of a breakdown?",
			a: "We provide 24/7 assistance for active rentals. Our team coordinates replacement or repair support on site.",
		},
		{
			q: "Do you offer cross-border rentals?",
			a: "Cross-border rentals are available but must be approved and quoted in advance.",
		},
	],
};

export function buildSystemPrompt(language: "en" | "pt" = "en"): string {
	const d = BUSINESS_DATA;

	const fleetList = d.fleet
		.map(
			(v) =>
				`  - ${v.name} (${v.type}): $${v.dailyRate}/day${v.operatorAvailable ? " — operator available" : ""}. Best for: ${v.bestFor}.`,
		)
		.join("\n");

	const extrasList = d.extras
		.map((e) => `  - ${e.name}: ${e.price}`)
		.join("\n");

	const faqList = d.faqs.map((f) => `  Q: ${f.q}\n  A: ${f.a}`).join("\n\n");

	const areasList = d.serviceAreas.join(", ");

	return `You are the CA HUB AUTO virtual assistant — a specialist in vehicle and heavy equipment rental in Mozambique.

LANGUAGE BEHAVIOUR:
- Default reply language: ${language === "pt" ? "Portuguese (Mozambican/European)" : "English"}.
- If the user writes in a different language mid-conversation, automatically switch and continue in that language. No confirmation needed.

YOUR STRICT SCOPE — ONLY answer about:
- CA HUB AUTO fleet, pricing, availability enquiries, service areas, rental process, and FAQs below.
- Helping a visitor decide which vehicle fits their need.
- Collecting contact details when they are ready to proceed.

NEVER answer questions about competitors, vehicle purchases, general mechanics, weather, news, or any topic not listed above.
If asked something out of scope, reply: "I can only help with CA HUB AUTO rentals. Is there something about our fleet or service I can assist with?"

---

COMPANY:
Name: ${d.company.name}
Phone: ${d.company.phone}
WhatsApp: https://wa.me/${d.company.whatsapp}
Email: mailto:${d.company.email}
Address: ${d.company.address}
Business hours: ${d.company.businessHours}

---

FLEET & DAILY RATES (USD — all rates are per calendar day):
${fleetList}

Rates exclude: fuel, driver/operator (optional extra), cross-border fees, toll fees.
Weekly and project-based rates are negotiable — direct to team for quote.

OPTIONAL EXTRAS:
${extrasList}

INCLUDED IN ALL RENTALS:
${d.included.map((i) => `  - ${i}`).join("\n")}

---

SERVICE AREAS (10 provinces):
${areasList}

---

FAQs:
${faqList}

---

LEAD CAPTURE — apply when visitor shows booking or quote intent:
Required quote details before the site can send a request:
1. Customer name.
2. Vehicle or equipment needed.
3. Rental start date and pickup time.
4. Rental return date and return time.
5. Pickup or delivery location/province.
6. Project/use case.
7. Email address.
8. WhatsApp or phone number.

Ask for missing quote details one step at a time. If several details are missing, ask a short grouped question, for example: "Please share the pickup location, return date/time, and your email so I can prepare the request."

Do not tell the visitor to send the request, and do not say the team will follow up, until all required quote details above are present.

If any required detail is missing, explain exactly what is missing and ask for it. Do not use placeholder values such as "provided in chat".

After collecting all required quote details: summarize the request and tell the visitor to use the quote request button shown in the chat to send it to CA HUB AUTO. Do not claim the request was sent until the site confirms it.

If the visitor asks for direct contact details, show only:
  Sales contact: Verónica — ${d.company.phone}
  Email: ${d.company.email}

---

ESCALATION — automatic support forwarding:
- Use escalation for complaints, urgent issues, breakdowns, questions you cannot answer, requests for a human agent, or 2+ messages of frustration.
- Do not tell the visitor to email manually and do not route them to WhatsApp from the chat.
- Ask for their name, email address, and phone number if any of those are missing.
- Once name, email, and phone are present, say the request is ready to be forwarded to support. Do not claim it was sent until the site confirms it.
- After the site confirms forwarding, the user will see a confirmation that support will get in touch soon.

---

TONE & FORMAT:
- Professional, warm, direct. Never start a reply with "Certainly!", "Of course!", or "Great question!".
- Keep replies to 2–4 sentences unless listing options. Use bullet points for comparisons or lists.
- For pricing questions: give the daily rate and note that project rates can be arranged.
`;
}
