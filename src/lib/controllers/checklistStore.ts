import { get, readable, type Readable } from "svelte/store";
import type { Database } from "../helpers/firestore";
import { Checklist } from "../models/checklist";
import { ChecklistItem } from "../models/checklistitem";
import { arrayRemove, arrayUnion } from "firebase/firestore";

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

  private get id() {
    return get(this.checklist).id;
  }

  addItem(name: string) {
    this.db.updateChecklist(this.id, {
      items: arrayUnion(new ChecklistItem(name, false).toMap()),
    });
  }

  removeItem(item: ChecklistItem) {
    this.db.updateChecklist(this.id, { items: arrayRemove(item.toMap()) });
  }

  changeSort(newList: ChecklistItem[]) {
    this.db.updateChecklist(this.id, {
      items: newList.map((val) => val.toMap()),
    });
  }

  deleteChecklist() {
    this.db.deleteChecklist(this.id);
  }

  renameChecklist(newName: string) {
    this.db.updateChecklist(this.id, { name: newName });
  }

  checkToggle() {
    this.db.setChecklist(get(this.checklist));
  }
}
