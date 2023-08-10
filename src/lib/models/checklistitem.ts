import { writable } from "svelte/store";

export class ChecklistItem {
  constructor(public name: string) {}

  isChecked = writable(false);

  toMap() {
    return { name: this.name };
  }
  static fromMap(map) {
    return new ChecklistItem(map.name);
  }
}
