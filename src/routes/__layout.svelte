<script>
  import "../app.css";
  import "../components/Header.svelte";
</script>

<div class="container mx-auto">
  <slot />
</div>

<style lang="css">
    .container {
        @apply max-w-7xl;
    }
</style>
