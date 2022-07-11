<script lang="ts">
  import type { EntrySet } from "../types";
  import * as moment from "moment";
  import CopyButton from "./CopyButton.svelte";
  import { extractTicketNr } from "../lib/entryset-helper";

  export let data: {day: moment.Moment, items: EntrySet[]}[];

  console.log(data);
  const workingHours = moment.utc(data.map(entry => {
    return entry.items.map(e => {
      return e.duration.asMilliseconds();
    }).reduce((a, b) => a + b, 0);
  }).reduce((acc, curr) => {
    return acc + curr;
  })).format("HH:mm");

  const startDate = moment.min(data.map(entry => entry.day)).local().format("DD.MM.YYYY");
  const endDate = moment.max(data.map(entry => entry.day)).local().format("DD.MM.YYYY");

  const groupedByActivity = (Object.values(
    data.map(entry => entry.items).reduce((acc, curr) => {
      console.log("acc: ", acc);
      curr.forEach(item => {
        if (acc[item.ticketNr]) {
          acc[item.ticketNr].push(item);
        } else {
          acc[item.ticketNr] = [item];
        }
      });
      return acc;
    }, {})
  )).map(items => {
    console.log("items: ", items);
    return {
      title: items[0].ticketNr,
      duration: moment.duration(items.map(item => item.duration.asMilliseconds()).reduce((a, b) => a + b, 0)).asHours().toPrecision(3),
    };
  }).sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const groupedByActivityold = (Object.values(data.reduce((acc, curr) => {
    const activityTitle = curr.ticketNr;
    if (!acc[activityTitle]) {
      acc[activityTitle] = {
        title: activityTitle,
        duration: moment.duration(0)
      };
    }
    acc[activityTitle] = {
      title: activityTitle,
      duration: acc[activityTitle].duration.add(curr.duration)
    };
    return acc;
  }, {})) as { title: string, duration: number }[]).map(value => {
    return {
      title: value.title,
      duration: moment.duration(value.duration).asHours().toPrecision(3)
    };
  });
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg max-w-4xl mx-12">
  <div class="px-4 py-5 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Time Tracking Summary</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">Summary of your working hours</p>
  </div>
  <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
    <dl class="sm:divide-y sm:divide-gray-200">
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Report between</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{startDate} - {endDate}</dd>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Total working hours</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{workingHours}</dd>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Hours per Project</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex">
          <ul class="flex-1">
            {#each groupedByActivity as {title, duration}}
              <li>{title}: {duration}</li>
            {/each}
          </ul>
          <div>
            <CopyButton value={groupedByActivity.map(value => {
              return `${value.title}: ${value.duration}`;
            }).join("\n")
            } />
          </div>
        </dd>
      </div>
    </dl>
  </div>
</div>