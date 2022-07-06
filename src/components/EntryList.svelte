<script lang="ts">
  import type { EntrySet } from "../types";
  import moment from "moment/moment";
  import { extractTicketNr } from "../lib/entryset-helper";
  import CopyButton from "./CopyButton.svelte";

  export let data: EntrySet;

  function calcDuration(value: EntrySet): moment.Duration {
    return value.reduce((acc, cur) => {
      return acc.add(moment.duration(cur.duration));
    }, moment.duration(0));
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

  const groupedByDay = (data ? (Object.values(data.reduce((acc, curr) => {
    if (!acc[curr.day.day()]) {
      acc[curr.day.day()] = [];
    }
    acc[curr.day.day()] = [...acc[curr.day.day()], curr];
    return acc;
  }, {}))).map(value => {
    console.log("groupByTicket", value);
    let dayList = {
      day: value[0].day,
      items: groupByTicket(value)
    };

    //console.log(JSON.stringify(dayList, null, 2));

    return dayList;

  }) : []);

  console.log("days: ", groupedByDay);

  function copyButtonValue(items: { ticketNr: string, items: EntrySet }) {
    // comma seperated string of "ticket1: notes, ticket2: notes, ticket3: notes"
    return items.reduce((acc, curr) => {
      console.log("curr: ", curr);
      const ticketNr = curr.ticketNr;
      const notes = curr.items
        .map(item => item.notes)
        .filter((value, index, self) => self.indexOf(value) === index)
        .reduce((acc1, curr1) => {
          return (acc1 ? acc1 + ", " : "") + curr1;
        }, undefined);

      return (acc ? acc + "; " : "") + `${ticketNr}: ${notes}`;
    }, undefined);
  }
</script>


{#each groupedByDay as day}
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