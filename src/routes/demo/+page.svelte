<script>
  import { convert } from "../lib/fileConverter.ts";
  import { formatDuration } from "../lib/formatter.ts";

  const demoData = convert([{
    "activityTitle": "TICKET-1: Datenbank-Mapping",
    "day": "2022-06-01",
    "duration": "2:30:12",
    "notes": "Did database DTO mapping",
    "project": "Programmierung"
  }, {
    "activityTitle": "TICKET-2: HomeView",
    "day": "2022-06-01",
    "duration": "1:24:50",
    "notes": "Implement FeatureFlag",
    "project": "Programmierung"
  }, {
    "activityTitle": "TICKET-2: HomeView",
    "day": "2022-06-02",
    "duration": "1:24:50",
    "notes": "Implement FeatureFlag",
    "project": "Programmierung"
  }, {
    "activityTitle": "TICKET-2: HomeView",
    "day": "2022-06-02",
    "duration": "1:24:50",
    "notes": "Implement FeatureFlag",
    "project": "Programmierung"
  }
  ]);
</script>

total time: {formatDuration(demoData.calculateTotalTime(), 15)}

{#if demoData}
  {#each demoData.items as entry}
    {JSON.stringify(entry)}
  {/each}
{/if}