import { TimingExport, TimingExportItem } from './fileConverter';
import { Duration } from '@js-joda/core';

export function round(data: TimingExport | undefined, roundTo: number): TimingExport | undefined {
	// round all durations to nearest roundTo minutes and update hours
	if (!data) {
		return undefined;
	}
	return new TimingExport(
		data.items.map((item) => {
			const roundedDuration =
				item.duration.toMinutes() % roundTo === 0
					? item.duration
					: Duration.ofMinutes(roundTo * Math.round(item.duration.toMinutes() / roundTo));
			return new TimingExportItem(roundedDuration, item.ticket, item.notes, item.day);
		})
	);
}
