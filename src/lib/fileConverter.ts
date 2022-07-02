import type { EntrySet, RawDataSet } from "../types";
import * as moment from "moment";
import type { DurationInputArg2 } from "moment";


export function loadAndConvertFile(file: File): Promise<EntrySet> {
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

export function convert(data: RawDataSet): EntrySet {
  return data.map(value => {
    return {
      activityTitle: value.activityTitle,
      day: moment.utc(value.day),
      duration: moment.utc(moment.duration(value.duration, ("HH:mm:ss" as DurationInputArg2)).as("milliseconds")),
      notes: value.notes,
      project: value.project,
    };
  })
}