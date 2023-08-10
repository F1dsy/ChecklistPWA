<script lang="ts" context="module">
  const elements = new Set<ChecklistItem>();

  export function resetAll() {
    elements.forEach((element) => {
      console.log(get(element.isChecked));
      element.isChecked.set(false);
    });
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { ChecklistItem } from "../models/checklistitem";
  import { get } from "svelte/store";

  onMount(() => {
    elements.add(item);
    return () => elements.delete(item);
  });

  //   export let selectable = false;
  export let item: ChecklistItem;
  let isChecked = item.isChecked;
  //   let isSelected = writable(false);
</script>

{#if true}
  <label
    for={item.name}
    class="w-full flex p-2 gap-2 border-b border-b-neutral-300"
  >
    <input
      type="checkbox"
      name="checkbox"
      id={item.name}
      class=""
      bind:checked={$isChecked}
    />
    <h1>{item.name}</h1>
  </label>
{:else}{/if}
