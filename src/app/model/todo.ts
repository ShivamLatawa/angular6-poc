export class Todo {
  id: number;
  isCompleted: boolean;
  description: string;

  constructor(id: number, description: string, isCompleted: boolean) {
    this.description = description;
    this.isCompleted = isCompleted;
    this.id = id;
  }
}
