<script lang="ts">
  export let value: string;

  function copy() {
    navigator.clipboard.writeText(value);
  }

</script>

<button on:click={copy}>Copy value</button>

<style lang="css">
    button {
        @apply bg-white text-black border-2 border-black p-2 rounded-lg hover:bg-black hover:text-white hover:border-white;
    }
</style>
