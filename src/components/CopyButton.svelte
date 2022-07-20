<script lang="ts">
  import copy from "../lib/copy.js";

  export let value: string;
  export let title = "Copy value";
</script>

<button on:click={() => copy(value)}>{title}</button>

<style lang="css">
    button {
        @apply bg-white text-black border-2 border-black p-2 rounded-lg hover:bg-black hover:text-white hover:border-white;
    }
</style>
