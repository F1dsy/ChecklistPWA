<script lang="ts">
  import Router from "svelte-spa-router";
  import ChecklistsView from "./lib/views/ChecklistsView.svelte";
  import ChecklistView from "./lib/views/ChecklistView.svelte";
  import SignInUserView from "./lib/views/SignInUserView.svelte";
  import RegisterUserView from "./lib/views/RegisterUserView.svelte";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { app } from "./lib/helpers/firebase";
  import AccountView from "./lib/views/AccountView.svelte";

  let routes = {
    "/": ChecklistsView,
    "/view/:id": ChecklistView,
    "/account": AccountView,
    "/login": SignInUserView,
  };

  let initAuth = new Promise((res, rej) => {
    onAuthStateChanged(getAuth(app), (user) => {
      if (user) {
        res(user);
      } else {
        rej("Not logged in");
      }
    });
  });
</script>

<main>
  {#await initAuth}
    <p>Loading...</p>
  {:then user}
    <Router {routes} />
  {:catch}
    <SignInUserView />
  {/await}
</main>
