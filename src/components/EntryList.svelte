<script lang="ts">
  import type { EntrySet } from "../types";
  import CopyButton from "./CopyButton.svelte";
  import { round } from "../lib/rounding";

  export let data: EntrySet;

  function copyButtonValue(items: { ticketNr: string, items: EntrySet }) {
    // comma seperated string of "ticket1: notes, ticket2: notes, ticket3: notes
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
          {item.ticketNr}: todo
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