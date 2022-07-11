<script lang="ts">
  import Header from "../components/Header.svelte";
  import Summary from "../components/Summary.svelte";
  import { loadAndConvertFile } from "../lib/fileConverter";
  import type { EntrySet } from "../types";
  import EntryList from "../components/EntryList.svelte";
  import RoundButton from "../components/RoundButton.svelte";
  import moment from "moment";
  import { round } from "../lib/rounding";
  import { extractTicketNr } from "../lib/entryset-helper";

  let data: EntrySet;
  let rounding = 15;


  function getGroupedByDay(rounding: number) {
    function calcDuration(value: EntrySet): moment.Duration {
      console.log("Rounding: ", rounding);
      return round(value.reduce((acc, cur) => {
        return acc.add(moment.duration(cur.duration));
      }, moment.duration(0)), rounding);
    }

    function groupByTicket(list) {
      // exctract ticketnr for each item in list and group by it
      let reduce = list.reduce((acc, item) => {
        const ticketNr = extractTicketNr(item.activityTitle);
        if (ticketNr) {
          acc[ticketNr] = acc[ticketNr] || [];
          acc[ticketNr].push(item);
          return acc;
        }
      }, {});

      return Object.entries(reduce).map(([key, value]) => {
        return ({
          ticketNr: key,
          duration: calcDuration(value),
          items: value
        });
      });
    }

    return (data ? (Object.values(data.reduce((acc, curr) => {
      if (!acc[curr.day.day()]) {
        acc[curr.day.day()] = [];
      }
      acc[curr.day.day()] = [...acc[curr.day.day()], curr];
      return acc;
    }, {}))).map(value => {
      return {
        day: value[0].day,
        items: groupByTicket(value)
      };
    }) : []);

  }

  async function setFile(event: CustomEvent) {
    data = await loadAndConvertFile(event.detail);
  }
</script>

<Header on:file-selected={setFile}></Header>
<div class="justify-end flex m-10">
  <RoundButton on:rounding-changed={(event) => {
    console.log("Changed rounding: ", event);
    return rounding = event.detail;
  }} />
</div>
{#if data}
  <Summary data={getGroupedByDay(rounding)}></Summary>
  <EntryList data={getGroupedByDay(rounding)}></EntryList>
{/if}