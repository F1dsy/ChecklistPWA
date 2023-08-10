import { readable } from "svelte/store";
import type { Database } from "../helpers/firestore";
import { Checklist } from "../models/checklist";

export function createChecklistsStore(db: Database) {
  let checklists = readable<Checklist[]>([], (set) => {
    db.getChecklistsSnapshot(set);
  });

  function addChecklist(name: string) {
    console.log(name);
    let checklist = new Checklist("", name, []);
    db.addChecklist(checklist);
  }

  return { ...checklists, addChecklist };
}
