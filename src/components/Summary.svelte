<script lang="ts">
  import type { EntrySet } from "../types";
  import * as moment from "moment";
  import { utc } from "moment";
  import CopyButton from "./CopyButton.svelte";

  export let data: EntrySet;

  const workingHours = utc(data.map(entry => {
    console.log(data)
    return Number(entry.duration);
  }).reduce((acc, curr) => {
    return acc + curr;
  })).format("HH:mm");

  const startDate = moment.min(data.map(entry => entry.day)).local().format("DD.MM.YYYY");
  const endDate = moment.max(data.map(entry => entry.day)).local().format("DD.MM.YYYY");

  const groupedByActivity = (Object.values(data.reduce((acc, curr) => {
    const activityTitle = curr.activityTitle.split(":")[0];
    if (!acc[activityTitle]) {
      acc[activityTitle] = {
        title: activityTitle,
        duration: moment.duration(0)
      };
    }
    console.log(acc, curr)
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