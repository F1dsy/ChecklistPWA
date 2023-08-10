import { ChecklistItem } from "./checklistitem";

export class Checklist {
  constructor(
    public id: string,
    public name: string,
    public items: ChecklistItem[]
  ) {}

  toMap() {
    return { name: this.name, items: this.items.map((item) => item.toMap()) };
  }

  static fromMap(id: string, map) {
    return new Checklist(
      id,
      map.name,
      map.items.map((data) => ChecklistItem.fromMap(data))
    );
  }
}
