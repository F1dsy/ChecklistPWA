<script lang="ts">
  import ChecklistContainer from "../components/ChecklistContainer.svelte";
  import { ChecklistStore } from "../controllers/checklistStore";
  import firestore from "../helpers/firestore";
  export let params: { id: string };

  let checklistStore = new ChecklistStore(firestore, params.id);

  let promise = new Promise((res, rej) =>
    checklistStore.checklist.subscribe((val) => {
      if (val) res(val);
    })
  );
</script>

{#await promise then val}
  <ChecklistContainer {checklistStore} />
{/await}
