<script lang="ts">
  import Header from "../components/Header.svelte";
  import Summary from "../components/Summary.svelte";

  let data;

  function setFile(event: CustomEvent) {
    const file = event.detail;
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result);
      data = JSON.parse(event.target.result as string);
    };
    reader.readAsText(file);
  }
</script>

<Header on:file-selected={setFile}></Header>
{#if data}
  <Summary data={data}></Summary>
{/if}