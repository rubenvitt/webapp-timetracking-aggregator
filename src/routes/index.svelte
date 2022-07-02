<script lang="ts">
  import Header from "../components/Header.svelte";
  import Summary from "../components/Summary.svelte";
  import { loadAndConvertFile } from "../lib/fileConverter";
  import type { EntrySet } from "../types";

  let data: EntrySet;

  async function setFile(event: CustomEvent) {
    data = await loadAndConvertFile(event.detail);
  }
</script>

<Header on:file-selected={setFile}></Header>
{#if data}
  <Summary data={data}></Summary>
{/if}