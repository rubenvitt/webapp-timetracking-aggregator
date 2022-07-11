import moment from "moment/moment";

export function round(duration: moment.Duration, roundTo: number): moment.Duration {
  duration.subtract(duration.seconds(), "seconds");
  duration.subtract(duration.milliseconds(), "milliseconds");

  const start = moment.utc(duration.as("milliseconds"));
  const remainder = roundTo - (start.minute() % roundTo);
  return duration.add(remainder, "minute");
}