<script>
  import Summary from "../components/Summary.svelte";
  import { convert } from "../lib/fileConverter.ts";
  import EntryList from "../components/EntryList.svelte";

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

<Summary data={demoData} />
<EntryList data={demoData} />