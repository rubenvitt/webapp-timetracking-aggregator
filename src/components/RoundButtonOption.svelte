<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let selected = false;
  export let option: { label: string, value: string } = { label: "", value: "" };

  let highlight = false;

  const dispatch = createEventDispatcher();

  function onClick() {
    selected = true;
    dispatch("click");
  }
</script>

<!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "text-white bg-indigo-500", Not Highlighted: "text-gray-900"
      -->

<li class="hover:text-white hover:bg-black group text-gray-900 select-none relative text-sm flex"
    id="listbox-option-0" role="option">
  <div on:click={onClick} class="flex flex-1 p-4 flex-col cursor-pointer">
    <div class="flex justify-between flex-1">
      <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
      <p class="font-normal" class:selected={"font-semibold"}>{option.label}</p>
      {#if selected}
      <span class="text-black group-hover:text-white">
              <!-- Heroicon name: solid/check -->
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                   aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
              </svg>
            </span>
      {/if}
    </div>
  </div>
</li>

<style lang="css"></style>