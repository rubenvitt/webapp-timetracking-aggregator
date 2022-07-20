
export type Entry = {
  activityTitle: string;
  day: string;
  duration: string;
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