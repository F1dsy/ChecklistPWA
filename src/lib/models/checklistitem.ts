import { get, writable } from "svelte/store";

export class ChecklistItem {
  constructor(public name: string, private isCheckedStartState: boolean) {
    this.isChecked.set(isCheckedStartState);
  }

  isChecked = writable(false);

  toMap() {
    return { name: this.name, isChecked: get(this.isChecked) };
  }
  static fromMap(map) {
    return new ChecklistItem(map.name, map.isChecked);
  }
}
