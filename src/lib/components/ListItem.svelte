<script lang="ts" context="module">
  const elements = new Set<ChecklistItem>();

  export function resetAll(store: ChecklistStore) {
    elements.forEach((element) => {
      element.isChecked.set(false);
    });
    // store.checkToggle();
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { ChecklistItem } from "../models/checklistitem";
  import { get } from "svelte/store";
  import GenericModal from "./GenericModal.svelte";
  import type { ChecklistStore } from "../controllers/checklistStore";

  onMount(() => {
    elements.add(item);
    return () => elements.delete(item);
  });
  export let checklistStore: ChecklistStore;
  export let item: ChecklistItem;
  let isChecked = item.isChecked;

  isChecked.subscribe((val) => checklistStore.checkToggle());
</script>

<label
  for={item.name}
  data-id={item.name}
  class=" w-full flex p-2 gap-2 border-b border-b-neutral-300"
>
  <input
    type="checkbox"
    name="checkbox"
    id={item.name}
    class=""
    bind:checked={$isChecked}
  />
  <button on:click={() => {}}>{item.name}</button>
  <span class="material-symbols-outlined handle ml-auto">drag_handle</span>
</label>
