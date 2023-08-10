<script lang="ts">
  import Router, { push, type RouteDetail } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import ChecklistsView from "./lib/views/ChecklistsView.svelte";
  import ChecklistView from "./lib/views/ChecklistView.svelte";
  import SignInUserView from "./lib/views/SignInUserView.svelte";
  import RegisterUserView from "./lib/views/RegisterUserView.svelte";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { app } from "./lib/helpers/firebase";
  import AccountView from "./lib/views/AccountView.svelte";
  import type { SvelteComponent } from "svelte";

  let routes = {
    "/": wrap({
      asyncComponent: () =>
        import("./lib/views/ChecklistsView.svelte") as Promise<{
          default: typeof SvelteComponent;
        }>,
      conditions: preCondition,
    }),
    "/view/:id": wrap({
      asyncComponent: () =>
        import("./lib/views/ChecklistView.svelte") as Promise<{
          default: typeof SvelteComponent;
        }>,
      conditions: preCondition,
    }),
    "/account": wrap({
      asyncComponent: () =>
        import("./lib/views/AccountView.svelte") as Promise<{
          default: typeof SvelteComponent;
        }>,
      conditions: preCondition,
    }),
    "/login": SignInUserView,
  };

  async function preCondition(detail: RouteDetail) {
    return await new Promise((res: (value: boolean) => void, rej) => {
      onAuthStateChanged(getAuth(app), (user) => {
        console.log(user);
        if (user) {
          res(true);
        } else {
          res(false);
          push("/login");
        }
      });
    });
  }

  let initAuth = new Promise((res, rej) => {
    onAuthStateChanged(getAuth(app), (user) => {
      console.log(user);
      if (user) {
        res(user);
      } else {
        rej("Not logged in");
        push("/login");
      }
    });
  });
</script>

<main>
  <Router {routes} />
  <!-- {#await initAuth}
    <p>Loading...</p>
  {:then user}
  {/await} -->
</main>
