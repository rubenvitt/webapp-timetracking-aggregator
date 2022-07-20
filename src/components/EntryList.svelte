<script lang="ts">
  import type { EntrySet } from "../types";
  import { TimingExport } from "../lib/fileConverter";

  export let data: TimingExport;

  function copyButtonValue(items: { ticketNr: string, items: EntrySet }) {
    // comma seperated string of "ticket1: notes, ticket2: notes, ticket3: notes
  }

  let groupedByDay = {};

  $: groupedByDay = data ? data.items.reduce((acc, cur) => {
    const day = cur.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(cur);
    return acc;
  }, {}) : undefined;
</script>


<!--{#each data.items as day}-->
<!--  <div class="day max-w-5xl">-->
<!--    <div class="flex justify-between">-->
<!--      <h2 class="font-bold text-orange-600">{day.day.format("DD.MM.yyyy")}</h2>-->
<!--      <CopyButton value={copyButtonValue(day.items)} />-->
<!--    </div>-->
<!--    <ul class="pl-5">-->
<!--      {#each day.items as item}-->
<!--        <li>-->
<!--          &lt;!&ndash;{item.ticketNr}: {item.duration.format("HH:mm")}&ndash;&gt;-->
<!--          {item.ticketNr}: todo-->
<!--          <ul class="pl-3">-->
<!--            {#each item.items.map(i => i.notes).filter((value, index, self) => self.indexOf(value) === index) as item}-->
<!--              <li>-->
<!--                - {item}-->
<!--              </li>-->
<!--            {/each}-->
<!--          </ul>-->
<!--        </li>-->
<!--      {/each}-->
<!--    </ul>-->
<!--  </div>-->
<!--{/each}-->