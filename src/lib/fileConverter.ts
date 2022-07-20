import type { RawDataSet } from '../types';
import { DateTimeFormatter, Duration, LocalDate } from '@js-joda/core';

export class TimingExport {
	constructor(public readonly items: TimingExportItem[]) {}

	public calculateTotalTime(): Duration {
		return this.items.reduce((acc, item) => acc.plus(item.duration), Duration.ZERO);
	}

	public startDate(): LocalDate {
		return this.items.reduce((acc, item) => {
			if (item.day.isBefore(acc)) {
				return item.day;
			}
			return acc;
		}, LocalDate.MAX);
	}

	public endDate(): LocalDate {
		return this.items.reduce((acc, item) => {
			if (item.day.isAfter(acc)) {
				return item.day;
			}
			return acc;
		}, LocalDate.MIN);
	}
}

export class TimingExportItem {
	constructor(
		public readonly duration: Duration,
		public readonly ticket: string,
		public readonly notes: string,
		public readonly day: LocalDate
	) {}
}

export function loadAndConvertFile(file: File): Promise<TimingExport> {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onload = (event) => {
			try {
				resolve(convert(JSON.parse(event.target?.result as string)));
			} catch (e) {
				reject(e);
			}
		};
		reader.readAsText(file);
	});
}

function extractTicketNr(title: string) {
	return title.split(':')[0];
}

export function convert(data: RawDataSet): TimingExport {
	return new TimingExport(
		data.map((entry) => {
			const { activityTitle, duration, notes, day } = entry;
			const ticket = extractTicketNr(activityTitle);
			const durationParts = duration.split(':').map((part) => parseInt(part));
			return new TimingExportItem(
				Duration.ofHours(durationParts[0]).plusMinutes(durationParts[1]),
				ticket,
				notes,
				LocalDate.parse(day, DateTimeFormatter.ofPattern('yyyy-MM-dd'))
			);
		})
	);
}
