<script lang="ts">
  import Header from "../components/Header.svelte";
  import { loadAndConvertFile, TimingExport } from "../lib/fileConverter";
  import RoundButton from "../components/RoundButton.svelte";
  import { round } from "../lib/rounding";
  import Summary from "../components/Summary.svelte";
  import EntryList from "../components/EntryList.svelte";

  let loadedData: TimingExport;
  let rounding = 15;


  async function setFile(event: CustomEvent) {
    loadedData = await loadAndConvertFile(event.detail);
  }

  let data: TimingExport;
  $: data = round(loadedData, rounding);
</script>

<Header on:file-selected={setFile}></Header>
<div class="justify-end flex m-10">
  <RoundButton on:rounding-changed={(event) => {
    console.log("Changed rounding: ", event);
    return rounding = event.detail;
  }} />
</div>

{#if data}
  <Summary data={data}></Summary>
  <EntryList data={data}></EntryList>

  {#each data.items as entry}
    {JSON.stringify(entry)}
  {/each}
{/if}
