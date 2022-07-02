<script lang="ts">
  export let value: string;

  function copy() {
    navigator.clipboard.writeText(value);
  }

</script>

<button on:click={copy}>Copy value</button>

<style lang="css">
    button {
        @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
    }
</style>
