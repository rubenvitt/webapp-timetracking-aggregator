<script lang="ts">
  import { fade } from "svelte/transition";
  import RoundButtonOption from "./RoundButtonOption.svelte";
  import { createEventDispatcher } from "svelte";

  export let selectedRoundOption = 15;
  let rounding = true;

  const dispatch = createEventDispatcher();

  let opened = false;

  // time rounding.ts options: none, 5min, 15min, 30min, 60min
  let roundingOptions = [
    { label: "Round to nearest minute", value: 1 },
    { label: "Round to nearest 5 minutes", value: 5 },
    { label: "Round to nearest 15 minutes", value: 15, selected: true },
    { label: "Round to nearest 30 minutes", value: 30 },
    { label: "Round to nearest hour", value: 60 }
  ];

</script>

<div class="relative">
  <div class="inline-flex shadow-sm rounded-md divide-x divide-gray-600 border-gray-800 border">
    <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-600">
      <div
        class="relative inline-flex items-center bg-white py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-black">
        {#if rounding}
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
          </svg>
        {/if}
        <p class="ml-2.5 text-sm font-medium">Rounding: {selectedRoundOption}</p>
      </div>
      <button on:click={() => opened = !opened} type="button"
              class="relative inline-flex items-center bg-white p-2 rounded-l-none rounded-r-md text-sm font-medium text-black hover:bg-gray-600 hover:text-white focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-black group"
              aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
        <!-- Heroicon name: solid/chevron-down -->
        <svg class="h-5 w-5 text-black group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
             fill="currentColor"
             aria-hidden="true">
          <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>

  {#if opened}
    <ul
      out:fade="{{duration: 100}}"
      class="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
      tabindex="-1" role="listbox" aria-labelledby="listbox-label">
      {#each roundingOptions as option}
        <RoundButtonOption
          on:click={() => {
            opened = false;
            roundingOptions.forEach(option => option.selected = false);
            option.selected = true;
            selectedRoundOption = option.value;
            dispatch("rounding-changed", selectedRoundOption);
          }}
          selected={option.selected} option={option} />
      {/each}

      <!-- More items... -->
    </ul>
  {/if}
</div>

<style lang="css">

</style>
