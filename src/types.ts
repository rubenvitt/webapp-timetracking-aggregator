import type { Moment } from "moment";

export type Entry = {
  activityTitle: string;
  day: Moment;
  duration: Moment;
  notes: string;
  project: string;
}

export type RawDataSet = {
  activityTitle: string;
  day: string;
  duration: string;
  notes: string;
  project: string;
}[];

export type EntrySet = Entry[];