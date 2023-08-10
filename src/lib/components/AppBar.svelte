<script lang="ts">
  import { pop } from "svelte-spa-router";
  export let backButton = false;
</script>

<div class="w-full h-16 sticky top-0 z-10 flex-none bg-white dark:bg-gray-900">
  <div
    class="flex items-center border-b border-b-gray-300 dark:border-b-gray-950 px-4 h-full"
  >
    {#if backButton}
      <button
        class="material-symbols-outlined sm:hidden mr-3"
        on:click={() => pop()}>arrow_back</button
      >
    {/if}
    <slot />
  </div>
</div>
