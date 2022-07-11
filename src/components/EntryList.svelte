<script lang="ts">
  import type { EntrySet } from "../types";
  import moment from "moment/moment";
  import { extractTicketNr } from "../lib/entryset-helper";
  import CopyButton from "./CopyButton.svelte";
  import { round } from "../lib/rounding";

  export let data: EntrySet;

  function copyButtonValue(items: { ticketNr: string, items: EntrySet }) {
    // comma seperated string of "ticket1: notes, ticket2: notes, ticket3: notes"
    return items.reduce((acc, curr) => {
      const ticketNr = curr.ticketNr;
      const duration = moment.utc(curr.duration.asMilliseconds()).format("HH:mm");
      const notes = curr.items
        .map(item => item.notes)
        .filter((value, index, self) => self.indexOf(value) === index)
        .reduce((acc1, curr1) => {
          return (acc1 ? acc1 + ", " : "") + curr1;
        }, undefined);

      return (acc ? acc + "; " : "") + `${ticketNr} (${duration}): ${notes}`;
    }, undefined);
  }
</script>


{#each data as day}
  <div class="day max-w-5xl">
    <div class="flex justify-between">
      <h2 class="font-bold text-orange-600">{day.day.format("DD.MM.yyyy")}</h2>
      <CopyButton value={copyButtonValue(day.items)} />
    </div>
    <ul class="pl-5">
      {#each day.items as item}
        <li>
          <!--{item.ticketNr}: {item.duration.format("HH:mm")}-->
          {item.ticketNr}: {moment.utc(item.duration.asMilliseconds()).format("HH:mm")}
          <ul class="pl-3">
            {#each item.items.map(i => i.notes).filter((value, index, self) => self.indexOf(value) === index) as item}
              <li>
                - {item}
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>
{/each}