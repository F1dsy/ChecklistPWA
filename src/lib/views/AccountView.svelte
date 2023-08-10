<script lang="ts">
  import { getAuth, signOut } from "firebase/auth";
  import AppBar from "../components/AppBar.svelte";
  import { app } from "../helpers/firebase";
  import Router, { push } from "svelte-spa-router";

  let auth = getAuth(app);

  function signOutUser() {
    signOut(auth);
    push("/login");
  }
</script>

<AppBar backButton={true}>
  <h1>Account</h1>
</AppBar>

<h2>Logged in as:</h2>
<p>{auth.currentUser.displayName}</p>

<button class="rounded bg-purple-300 p-1" on:click={() => signOutUser()}
  >Log out</button
>
