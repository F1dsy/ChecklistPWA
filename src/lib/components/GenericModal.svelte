<script lang="ts">
  export const show = () => {
    isOpen = true;
    dialog.showModal();
  };

  export const close = () => {
    isOpen = false;
    dialog.close();
  };

  let isOpen = false;

  let dialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:click|self={() => close()}
  class="h-full w-full m-0 p-8 max-h-full max-w-full bg-black bg-opacity-25 text-gray-900 dark:text-gray-100"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:click|stopPropagation
    class="bg-white dark:bg-gray-900 relative rounded-lg drop-shadow-sm transition-transform duration-75"
    class:scale-0={!isOpen}
    class:scale-100={isOpen}
  >
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span
      class="material-symbols-outlined absolute right-1 top-1"
      on:click={() => close()}>close</span
    >
    <slot />
  </div>
</dialog>
