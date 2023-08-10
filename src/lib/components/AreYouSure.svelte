<script lang="ts">
  export const message: string = "";

  export function show(): Promise<boolean> {
    dialog.showModal();
    isOpen = true;
    let promise = new Promise<boolean>((res, rej) => {
      handle = res;
      reject = rej;
    });
    promise.finally(() => {
      closeModal();
    });
    return promise;
  }
  let handle: (value: boolean | PromiseLike<boolean>) => void;
  let reject: (reason?: any) => void;

  let closeModal = () => {
    dialog.close();
    isOpen = false;
  };

  let isOpen = false;

  let dialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:click|self={() => closeModal()}
  class="h-full w-full max-h-full max-w-full bg-black bg-opacity-25 p-0 text-gray-900 dark:text-gray-100"
>
  <div class="flex justify-center items-center h-full">
    <div
      on:click|stopPropagation
      class="bg-white dark:bg-gray-900 relative rounded-lg drop-shadow-sm p-4 m-4 w-full sm:w-96 text-center transition-transform duration-75"
      class:scale-0={!isOpen}
      class:scale-100={isOpen}
    >
      <span
        class="material-symbols-outlined absolute right-1 top-1"
        on:click={() => closeModal()}>close</span
      >

      <h1 class="text-xl mb-5">Are You Sure?</h1>
      <p>{message}</p>
      <div class="flex justify-around flex-col">
        <button
          on:click={() => handle(true)}
          class="bg-red-400 dark:bg-red-800 rounded-md p-1">Yes</button
        >
        <button
          on:click={() => handle(false)}
          class="bg-gray-300 dark:bg-gray-600 rounded-md p-1 mt-2">No</button
        >
      </div>
    </div>
  </div>
</dialog>
