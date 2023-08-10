<script lang="ts">
  import { pop } from "svelte-spa-router";
  import AppBar from "../components/AppBar.svelte";
  import Dropdown from "../components/Dropdown.svelte";

  import ListItem, { resetAll } from "../components/ListItem.svelte";
  import SortableList from "../components/SortableList.svelte";
  //   import { createChecklistStore } from "../controllers/checklistStore";
  //   import firestore from "../helpers/firestore";
  import AreYouSure from "../components/AreYouSure.svelte";
  import GenericModal from "../components/GenericModal.svelte";
  import type { ChecklistStore } from "../controllers/checklistStore";
  //   import { onMount } from "svelte";
  //   export let params: { id: string };

  export let checklistStore: ChecklistStore;
  let checklist = checklistStore.checklist;

  function addItem() {
    checklistStore.addItem(nameInput);
    nameInput = "";
    isAddingNewItem = false;
  }

  function onUpdate(e: string[]) {
    let list = e.map((id) => $checklist.items.find((item) => item.name === id));
    checklistStore.changeSort(list);
  }

  function renameChecklist() {
    renameModal.close();
    checklistStore.renameChecklist(renameInput);
  }

  let dropdownItems = [
    {
      label: "Reset",
      onclick: () => resetAll(checklistStore),
    },
    {
      label: "Delete List",
      onclick: async () => {
        let result = await areyousure.show();
        if (result) {
          checklistStore.deleteChecklist();
          pop();
        }
      },
    },
    {
      label: "Rename List",
      onclick: async () => {
        renameInput = $checklist.name;
        renameModal.show();
      },
    },
  ];

  let nameInput: string;
  let renameInput: string = $checklist.name;
  let isAddingNewItem = false;

  let areyousure: AreYouSure;
  let renameModal: GenericModal;
</script>

{#if checklist}
  <AppBar backButton={true}
    ><h1>{$checklist.name}</h1>
    <div class="w-full flex justify-end gap-2">
      <Dropdown items={dropdownItems} />
    </div>
  </AppBar>
  <div class="">
    <SortableList {onUpdate}>
      {#each $checklist.items as item (item)}
        <ListItem {item} {checklistStore} />
      {/each}
    </SortableList>

    {#if isAddingNewItem}
      <form class="flex" on:submit|preventDefault>
        <input
          class="p-1 rounded-md bg-gray-100 dark:bg-gray-800"
          required
          type="text"
          name="nameInput"
          id="nameInput"
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

<AreYouSure bind:this={areyousure} />

<GenericModal bind:this={renameModal}>
  <form
    on:submit|preventDefault={() => renameChecklist()}
    class="flex flex-col p-2 gap-2"
  >
    <h1>Add Checklist</h1>
    <input
      type="text"
      required
      minlength="3"
      name="name"
      id="name"
      class="p-1 rounded-md bg-gray-100 dark:bg-gray-800"
      bind:value={renameInput}
    />
    <button class="bg-purple-500 rounded-md">Add</button>
  </form>
</GenericModal>
