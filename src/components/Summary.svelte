<script lang="ts">
  import CopyButton from "./CopyButton.svelte";
  import { TimingExport } from "../lib/fileConverter";
  import { formatDuration } from "../lib/formatter.js";
  import { Duration } from "@js-joda/core";

  export let data: TimingExport;

  let groupedByTicket: { ticket: string, duration: Duration }[];
  $: groupedByTicket = data ? Object.entries(data.items.reduce((acc, cur) => {
    const ticket = cur.ticket;
    if (!acc[ticket]) {
      acc[ticket] = [];
    }
    acc[ticket].push(cur);
    return acc;
  }, {})).map(element => {
    return {
      ticket: element[0],
      duration: element[1].reduce((acc, cur) => {
        return acc.plus(cur.duration);
      }, Duration.ZERO)
    };
  }) : undefined;
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg mr-12 flex-1">
  <div class="px-4 py-5 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Time Tracking Summary</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">Summary of your working hours</p>
  </div>
  <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
    <dl class="sm:divide-y sm:divide-gray-200">
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Report between</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.startDate()} - {data.endDate()}</dd>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Total working hours</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDuration(data.calculateTotalTime())}</dd>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Hours per Project</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex">
          <ul class="flex-1">
            {#each groupedByTicket as { ticket, duration }}
              <li>{ticket}: {formatDuration(duration)}</li>
            {/each}
          </ul>
          <div>
            <CopyButton value={groupedByTicket.map(({ticket, duration}) => {
              return `${ticket}: ${formatDuration(duration)}`;
            }).join("\n")
            } />
          </div>
        </dd>
      </div>
    </dl>
  </div>
</div>