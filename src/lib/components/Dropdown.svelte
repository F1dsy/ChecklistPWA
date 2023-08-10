<script lang="ts">
  export let items = [];

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

<button class="grid items-center" on:click={() => show()}>
  <span class="material-symbols-outlined"> more_vert </span>
</button>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:click|self={() => close()}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed flex flex-col w-16 h-16 rounded-lg right-4 top-4 bg-white drop-shadow-sm transition-transform origin-top-right"
    on:click|stopPropagation
    class:scale-0={!isOpen}
    class:scale-100={isOpen}
  >
    {#each items as item}
      <button
        class="border-b border-b-neutral-300"
        on:click={() => {
          close();
          item.onclick();
        }}>{item.label}</button
      >
    {/each}
  </div>
</dialog>
