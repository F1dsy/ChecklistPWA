<script lang="ts">
  import Sortable from "sortablejs";
  import { onMount } from "svelte";

  export let onUpdate;
  let list: HTMLDivElement;
  onMount(async () => {
    let sortable = new Sortable(list, {
      handle: ".handle",
      onUpdate() {
        onUpdate(sortable.toArray());
      },
    });
  });
</script>

<div class="flex flex-col items-center" bind:this={list}>
  <slot><!-- optional fallback --></slot>
</div>
