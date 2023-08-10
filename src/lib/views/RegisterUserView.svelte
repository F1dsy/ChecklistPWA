<script lang="ts">
  import { link } from "svelte-spa-router";

  // function onError(error: Error) {
  //   isError = true;
  //   errorMessage = error.message;
  // }
  // function register() {
  //   try {
  //     auth.register(email, password, onError).catch((error) => {
  //       console.log(error);
  //       console.log("error");
  //     });
  //   } catch (error) {}
  // }

  let isError = false;
  let errorMessage = "";
  let email: string = "";
  let password: string = "";
</script>

<form
  class="flex flex-col justify-center items-center h-full w-full"
  on:submit|preventDefault
>
  <div class="grid gap-2 p-2">
    <h1 class="text-2xl text-center">Register</h1>

    <div class="flex flex-col">
      <label for="email">Email</label>
      <input
        class="p-1 rounded-md bg-gray-100 dark:bg-gray-800"
        type="email"
        id="email"
        bind:value={email}
        autocomplete="email"
      />
    </div>

    <div class="flex flex-col">
      <label for="password">Password</label>
      <input
        class="p-1 rounded-md bg-gray-100 dark:bg-gray-800"
        type="password"
        id="password"
        bind:value={password}
        autocomplete="current-password"
      />
    </div>
    <button type="submit" class="p-1 bg-[#6750a4] text-white rounded-md mt-3"
      >Register</button
    >
    <div class="text-center gray-500">
      <a href="/login" use:link>Or Login</a>
    </div>
  </div>
</form>
