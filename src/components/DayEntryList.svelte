<script lang="ts">
  import { TimingExportItem } from "../lib/fileConverter";
  import { Duration } from "@js-joda/core";
  import { formatDuration } from "../lib/formatter.js";
  import { createEventDispatcher } from "svelte";

  export let items: TimingExportItem[];

  let groupedByTicket = [];
  // group items by ticket and aggregate durations, reduce to array of objects with ticket, duration and items
  $: groupedByTicket = Object.values(items.reduce((acc, item) => {
    console.log(item);
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
  }, {})).sort((a, b) => a.ticket.localeCompare(b.ticket));

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("click");
  }

</script>

<ul class="pl-5 cursor-pointer" on:click={onClick}>
  {#each groupedByTicket as item}
    <li>
      {item.ticket}: {formatDuration(item.duration)}
      <ul class="pl-3">
        {#each item.notes.filter((value, index, self) => self.indexOf(value) === index) as note}
          <li>
            - {note}
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>