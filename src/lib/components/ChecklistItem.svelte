<script lang="ts" context="module">
  const elements = new Set<Writable<boolean>>();

  export function deleteAllSelected() {
    elements.forEach((element) => {
      console.log(get(element));
    });
  }
</script>

<script lang="ts">
  import { push } from "svelte-spa-router";
  import type { Checklist } from "../models/checklist";
  import { onMount } from "svelte";
  import { get, writable, type Writable } from "svelte/store";

  onMount(() => {
    elements.add(isSelected);
    return () => elements.delete(isSelected);
  });

  export let selectable = false;
  export let checklist: Checklist;

  let isSelected = writable(false);
</script>

{#if selectable}
  <label
    for={checklist.id}
    class="w-full flex p-2 gap-2 border-b border-b-neutral-300"
  >
    <input
      type="checkbox"
      name="checkbox"
      id={checklist.id}
      class=""
      checked={$isSelected}
    />
    <h1>{checklist.name}</h1>
  </label>
{:else}
  <button
    class="w-full flex justify-between p-2 gap-2 border-b border-b-neutral-300"
    on:click={() => push(`/view/${checklist.id}`)}
  >
    <h1>{checklist.name}</h1>
  </button>
{/if}
