<script lang="ts">
  import { push } from "svelte-spa-router";
  import AppBar from "../components/AppBar.svelte";
  import ChecklistItem, {
    deleteAllSelected,
  } from "../components/ChecklistItem.svelte";
  import Dropdown from "../components/Dropdown.svelte";
  import GenericModal from "../components/GenericModal.svelte";
  import { createChecklistsStore } from "../controllers/checklistsStore";
  import firestore from "../helpers/firestore";

  let items = [
    {
      label: "Select",
      onclick: () => {
        selectable = true;
      },
    },
  ];

  let selectable = false;

  let name: string;
  function addChecklist() {
    addmodal.close();
    checklistStore.addChecklist(name);
  }

  let checklistStore = createChecklistsStore(firestore);

  let addmodal: GenericModal;
</script>

<AppBar>
  {#if selectable}
    <button class="grid items-center pr-2" on:click={() => (selectable = false)}
      ><span class="material-symbols-outlined"> close </span></button
    >
    <h1 class="">Title</h1>
    <div class="w-full flex justify-end gap-2">
      <button class="grid items-center" on:click={() => deleteAllSelected()}
        ><span class="material-symbols-outlined"> delete </span></button
      >
    </div>
  {:else}
    <h1 class="">Title</h1>
    <div class="w-full flex justify-end gap-2">
      <button class="grid items-center" on:click={() => addmodal.show()}
        ><span class="material-symbols-outlined"> add </span></button
      >
      <button class="grid items-center" on:click={() => push("/account")}
        ><span class="material-symbols-outlined"> person </span></button
      >
      <Dropdown {items} />
    </div>
  {/if}
</AppBar>
<div class="">
  {#each $checklistStore as checklist}
    <ChecklistItem {checklist} {selectable} />
  {/each}
</div>

<GenericModal bind:this={addmodal}>
  <form
    on:submit|preventDefault={() => addChecklist()}
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
      bind:value={name}
    />
    <button class="bg-purple-500 rounded-md">Add</button>
  </form>
</GenericModal>
