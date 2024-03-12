import { v4 as uuid_v4 } from "uuid";

export class Task {
  name: string;
  isCompleted: boolean = false;
  id: string;
  category: string;
  createdAt: number;
  dueDate: number;

  constructor(name: string, category: string) {
    this.name = name;
    this.id = uuid_v4();
    this.category = category;
    this.createdAt = Date.now();
    // default due date is 7 days from now
    this.dueDate = this.createdAt + 1000 * 60 * 60 * 24 * 7;
  }
}
