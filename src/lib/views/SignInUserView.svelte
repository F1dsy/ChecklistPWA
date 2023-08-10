<script lang="ts">
  import { link, push } from "svelte-spa-router";
  import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
  import { app } from "../helpers/firebase";

  // let email = "";
  // let password = "";

  // async function signIn() {
  //   let user = await auth.signInUser(email, password);
  //   if (user) {
  //     push("/home");
  //   }
  // }

  let auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  async function signIn() {
    let result = await signInWithPopup(auth, provider);
    console.log(result);
    push("/");
  }
</script>

<div class="h-full grid items-center p-2 pt-20">
  <button class="rounded-md bg-purple-300" on:click={() => signIn()}
    >Sign in with Google</button
  >
</div>

<!-- 
<form
  class="flex flex-col justify-center items-center h-full w-full"
  on:submit|preventDefault
>
  <div class="grid gap-2 p-2">
    <h1 class="text-2xl text-center">Sign in</h1>

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
      >Sign In</button
    >
    <div class="text-center gray-500">
      <a href="/register" use:link>Or Register</a>
    </div>
  </div>
</form> -->
