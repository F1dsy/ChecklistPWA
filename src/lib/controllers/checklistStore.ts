import { get, readable } from "svelte/store";
import type { Database } from "../helpers/firestore";
import { Checklist } from "../models/checklist";
import { ChecklistItem } from "../models/checklistitem";

export function createChecklistStore(db: Database, id: string) {
  let checklist = readable<Checklist>(null, (set) => {
    db.getChecklistSnapshot(id, set);
  });

  function addItem(name: string) {
    let clist = get<Checklist>(checklist);
    console.log(clist);
    clist.items.push(new ChecklistItem(name));
    db.updateChecklist(clist);
  }

  return { ...checklist, addItem };
}
