import type { Duration } from '@js-joda/core';

export function formatDuration(duration: Duration): string {
	const hoursStr = duration.toHours().toString().padStart(2, '0');
	const minutes = duration.toMinutes() % 60;

	const minutesDecimal = Math.round((minutes / 60) * 100)
		.toString()
		.padStart(2, '0');

	return `${hoursStr}.${minutesDecimal}`;
}
