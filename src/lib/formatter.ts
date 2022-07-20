import type { Duration } from '@js-joda/core';

export function formatDuration(duration: Duration): string {
	// round minutes to nearest 15 minutes and update hours

	const minutesStr = (duration.toMinutes() % 60).toString().padStart(2, '0');
	const hoursStr = duration.toHours().toString().padStart(2, '0');

	return `${hoursStr}:${minutesStr}`;
}
