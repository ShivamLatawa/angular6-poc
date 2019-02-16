import { Component } from '@angular/core';
import { TodoDataService } from '../service/todo-data-service.service';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoDataService]
})

export class TodoComponent {

  todos: Todo[];

  constructor(private todoDataService: TodoDataService) {
    this.todoDataService.fetchTodos().subscribe(todos => {
      this.todos = todos as Todo[];
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
        this.todos = todos as Todo[];
      });
    });

    this.clearInput();
  }

  clearInput() {
    ( <HTMLInputElement> event.target).value = '';
  }

  deleteTodo(selectedTodo: Todo) {
    this.todoDataService.deleteTodo(selectedTodo).subscribe(() => {
      this.todoDataService.fetchTodos().subscribe(todos => {
        this.todos = todos as Todo[];
      });
    });
  }

  clearCompletedTodos() {
    this.getTodos()
        .filter(todo => todo.isCompleted === true)
        .map(todo => this.deleteTodo(todo));
  }

  getTodos() {
    return this.todos;
  }

  toggleTodo(selectedTodo: Todo) {
    this.todoDataService.toggleTodo(selectedTodo);
  }

}
