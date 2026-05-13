"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Calendar } from "#/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";

const TIME_OPTIONS: readonly string[] = Array.from({ length: 48 }, (_, i) => {
	const h = Math.floor(i / 2)
		.toString()
		.padStart(2, "0");
	const m = i % 2 === 0 ? "00" : "30";
	return `${h}:${m}`;
});

function startOfDay(date: Date): Date {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}

export function DateTimeField({
	label,
	date,
	time,
	onDateChange,
	onTimeChange,
	minDate,
}: {
	label: string;
	date: Date;
	time: string;
	onDateChange: (d: Date) => void;
	onTimeChange: (t: string) => void;
	minDate?: Date;
}): React.JSX.Element {
	const [dateOpen, setDateOpen] = useState(false);
	const [timeOpen, setTimeOpen] = useState(false);
	const min = minDate ? startOfDay(minDate) : startOfDay(new Date());

	return (
		<div className="booking-field">
			<span className="booking-field-label">{label}</span>
			<div className="booking-datetime">
				<Popover open={dateOpen} onOpenChange={setDateOpen}>
					<PopoverTrigger asChild>
						<button
							type="button"
							className="booking-chip"
							aria-label={`${label}: ${format(date, "EEEE, MMMM d")}`}
						>
							<CalendarIcon className="size-4" aria-hidden="true" />
							<span>{format(date, "MMM d")}</span>
						</button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							onSelect={(d) => {
								if (!d) return;
								onDateChange(d);
								setDateOpen(false);
							}}
							disabled={(d) => d < min}
						/>
					</PopoverContent>
				</Popover>

				<Popover open={timeOpen} onOpenChange={setTimeOpen}>
					<PopoverTrigger asChild>
						<button
							type="button"
							className="booking-chip"
							aria-label={`${label} time: ${time}`}
						>
							<Clock className="size-4" aria-hidden="true" />
							<span>{time}</span>
						</button>
					</PopoverTrigger>
					<PopoverContent
						className="w-24 p-1 max-h-56 overflow-y-auto"
						align="start"
					>
						<div className="flex flex-col">
							{TIME_OPTIONS.map((t) => (
								<button
									key={t}
									type="button"
									onClick={() => {
										onTimeChange(t);
										setTimeOpen(false);
									}}
									className={`px-2 py-1.5 text-sm rounded text-left transition-colors ${
										t === time
											? "bg-primary text-primary-foreground"
											: "hover:bg-accent"
									}`}
								>
									{t}
								</button>
							))}
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
