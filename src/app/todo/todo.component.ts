import { Component, OnInit } from '@angular/core';
import { TodoDataService } from "../service/todo-data-service.service";
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoDataService]
})

export class TodoComponent {

  constructor(private todoDataService: TodoDataService) {
    this.todoDataService.fetchTodos().subscribe(todos => {
      this.todoDataService.setTodos(todos);
    });
  }

  todoEntered(event: KeyboardEvent) {
    const todo = {
      id: Math.ceil(Math.random() * 100),
      description: ( <HTMLInputElement> event.target).value,
      isCompleted: false
    };

    this.todoDataService.addTodo(todo).subscribe(() => {
      this.todoDataService.fetchTodos().subscribe(todos => {
        this.todoDataService.setTodos(todos);
      })
    });
  }

  getTodos() {
    return this.todoDataService.getAllTodos();
  }

  toggleTodo(selectedTodo: Todo) {
    this.todoDataService.toggleTodo(selectedTodo);
  }

}
