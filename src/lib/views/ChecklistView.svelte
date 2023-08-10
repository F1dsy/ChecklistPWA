<script lang="ts">
  import AppBar from "../components/AppBar.svelte";
  import BottomSheet from "../components/BottomSheet.svelte";
  import ListItem, { resetAll } from "../components/ListItem.svelte";
  import { createChecklistStore } from "../controllers/checklistStore";
  import firestore from "../helpers/firestore";
  export let params: { id: string };
  let checklist = createChecklistStore(firestore, params.id);

  function addItem() {
    checklist.addItem(nameInput);
    nameInput = "";
    isAddingNewItem = false;
  }

  function tellAll() {
    resetAll();
  }

  let nameInput: string;
  let isAddingNewItem = false;
</script>

{#if $checklist}
  <AppBar backButton={true}
    ><h1>{$checklist.name}</h1>
    <div class="w-full flex justify-end gap-2">
      <button on:click={() => tellAll()}>Press</button>
    </div>
  </AppBar>
  <div class="flex flex-col items-center p-2">
    {#each $checklist.items as item}
      <ListItem {item} />
    {/each}

    {#if isAddingNewItem}
      <form class="flex" on:submit|preventDefault>
        <input
          class="p-1 rounded-md bg-gray-100 dark:bg-gray-800"
          type="text"
          name=""
          id=""
          bind:value={nameInput}
        />
        <button
          class="flex items-center"
          on:click={() => addItem()}
          disabled={!nameInput}
        >
          <span class="material-symbols-outlined"> check </span>
        </button>
      </form>
    {:else}
      <button
        class="flex items-center"
        on:click={() => (isAddingNewItem = true)}
      >
        <span class="material-symbols-outlined"> add </span>
        <span>Add New Item</span>
      </button>
    {/if}
  </div>
{/if}
