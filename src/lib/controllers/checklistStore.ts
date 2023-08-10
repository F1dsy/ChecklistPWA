import { get, readable, type Readable } from "svelte/store";
import type { Database } from "../helpers/firestore";
import { Checklist } from "../models/checklist";
import { ChecklistItem } from "../models/checklistitem";

// export function createChecklistStore(db: Database, id: string) {
//   let checklist = readable<Checklist>(null, (set) => {
//     db.getChecklistSnapshot(id, set);
//   });

//   function addItem(name: string) {
//     let clist = get<Checklist>(checklist);
//     console.log(clist);
//     clist.items.push(new ChecklistItem(name, false));
//     db.updateChecklist(clist);
//   }

//   function changeSort(newList: ChecklistItem[]) {
//     let clist = get(checklist);
//     clist.items = newList;
//     db.updateChecklist(clist);
//   }

//   function deleteChecklist() {
//     db.deleteChecklist(get(checklist).id);
//   }

//   function renameChecklist(newName: string) {
//     let clist = get(checklist);
//     clist.name = newName;
//     db.updateChecklist(clist);
//   }

//   return {
//     ...checklist,
//     addItem,
//     changeSort,
//     deleteChecklist,
//     renameChecklist,
//   };
// }

export class ChecklistStore {
  constructor(private db: Database, id: string) {
    this.checklist = readable<Checklist>(null, (set) => {
      db.getChecklistSnapshot(id, set);
    });
  }

  checklist: Readable<Checklist>;

  addItem(name: string) {
    let clist = get(this.checklist);
    console.log(clist);
    clist.items.push(new ChecklistItem(name, false));
    this.db.updateChecklist(clist);
  }

  changeSort(newList: ChecklistItem[]) {
    let clist = get(this.checklist);
    clist.items = newList;
    this.db.updateChecklist(clist);
  }

  deleteChecklist() {
    this.db.deleteChecklist(get(this.checklist).id);
  }

  renameChecklist(newName: string) {
    let clist = get(this.checklist);
    clist.name = newName;
    this.db.updateChecklist(clist);
  }

  checkToggle(checkListItem: ChecklistItem) {
    this.db.updateChecklist(get(this.checklist));
  }
}
