import { describe, expect, it } from "vitest";
import {
	buildEquipmentQuoteMessage,
	buildEquipmentQuoteWhatsAppUrl,
} from "#/lib/booking-message";

const request = {
	equipmentName: "Mobile Jaw Crusher",
	quantity: 2,
	startDate: "2026-11-01",
	duration: "3 months",
	province: "Tete",
	siteLocation: "Moatize pit 3",
	operatorRequired: true,
};

describe("equipment quote message", () => {
	it("includes the request details and no price", () => {
		const message = buildEquipmentQuoteMessage(request);
		expect(message).toContain("2 x Mobile Jaw Crusher");
		expect(message).toContain("Duration: 3 months");
		expect(message).toContain("Site: Moatize pit 3, Tete");
		expect(message).toContain("Certified operator: Yes");
		expect(message).not.toMatch(/\$|total|MZN/i);
	});

	it("falls back when the start date is empty", () => {
		const message = buildEquipmentQuoteMessage({ ...request, startDate: "" });
		expect(message).toContain("Start date: To be confirmed");
	});

	it("encodes the message into a wa.me link", () => {
		const url = buildEquipmentQuoteWhatsAppUrl(request);
		expect(url.startsWith("https://wa.me/")).toBe(true);
		expect(decodeURIComponent(url)).toContain("Mobile Jaw Crusher");
	});
});
