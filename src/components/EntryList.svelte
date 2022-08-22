<script lang="ts">
  import { TimingExport, TimingExportItem } from "../lib/fileConverter";
  import CopyButton from "./CopyButton.svelte";
  import { formatDuration } from "../lib/formatter";
  import { Duration } from "@js-joda/core";
  import DayEntryList from "./DayEntryList.svelte";
  import copy from "../lib/copy.js";

  export let data: TimingExport;

  function copyButtonValue(day: { day: string, items: TimingExportItem[] }) {
    let grouped = day.items.reduce((acc, item) => {
      let key = item.ticket;
      if (!acc[key]) {
        acc[key] = {
          ticket: item.ticket,
          duration: Duration.ZERO,
          notes: []
        };
      }
      acc[key].duration = acc[key].duration.plus(item.duration);
      acc[key].notes.push(item.notes);
      return acc;
    }, {});

    return Object.keys(grouped).sort((a, b) => a.localeCompare(b)).map(key => {
      let item = grouped[key];
      return `${item.ticket} (${formatDuration(item.duration)}): ${item.notes.filter((value, index, self) => self.indexOf(value) === index).join(", ")}`;
    }).join("; ");
  }

  function dayDuration({ items }: { items: TimingExportItem[] }) {
    return formatDuration(items.reduce((acc, item) => acc.plus(item.duration), Duration.ZERO));
  }

  let groupedByDay;

  $: groupedByDay = data ? Object.entries(data.items.reduce((acc, cur) => {
    const day = cur.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(cur);
    return acc;
  }, {})).map(entry => {
    return {
      day: entry[0],
      items: entry[1]
    };
  }).sort((a, b) => {
    return a.day.localeCompare(b.day);
  }) : undefined;
</script>


<div class="space-y-5 my-8 mr-10">
  {#if groupedByDay}
    {#each groupedByDay as day}
      <div class="flex">
        <div class="flex justify-between flex-1">
          <div>
            <h2 class="font-bold text-orange-600 cursor-pointer"
                on:click={() => copy(dayDuration(day))}>{day.day}: {dayDuration(day)}</h2>
            <DayEntryList on:click={() => copy(copyButtonValue(day))} items={day.items} />
          </div>
          <div class="flex flex-col space-y-2">
            <CopyButton title="Copy notes" value={copyButtonValue(day)} />
            <CopyButton title="Copy duration" value={dayDuration(day)} />
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>