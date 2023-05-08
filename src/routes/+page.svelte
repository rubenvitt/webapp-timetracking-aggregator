<script lang="ts">
  import Header from "../components/Header.svelte";
  import { loadAndConvertFile, TimingExport } from "../lib/fileConverter";
  import RoundButton from "../components/RoundButton.svelte";
  import { round } from "../lib/rounding";
  import EntryList from "../components/EntryList.svelte";
  import Summary from "../components/Summary.svelte";

  let loadedData: TimingExport;
  let rounding = 30;


  async function setFile(event: CustomEvent) {
    loadedData = await loadAndConvertFile(event.detail);
  }

  let data: TimingExport;
  $: data = round(loadedData, rounding);
</script>

<Header on:file-selected={setFile}></Header>
<div class="justify-end flex mt-10 mr-10">
  {#if data}
    <Summary data={data}></Summary>
  {/if}
  <RoundButton on:rounding-changed={(event) => {
    console.log("Changed rounding: ", event);
    return rounding = event.detail;
  }} />
</div>

{#if data}
  <EntryList data={data}></EntryList>
{/if}
