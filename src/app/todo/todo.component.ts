import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Todo } from '../model/todo';
import { FetchTodos, AddTodoToServer, ToggleTodo, DeleteTodo } from '../store/actions';
import { TodoListState } from '../store/state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: []
})

export class TodoComponent implements OnInit {

  todoListState$: Observable<Todo[]>;

  constructor(private store: Store <TodoListState> ) {
    this.store.dispatch(new FetchTodos());
  }

  ngOnInit() {
    this.todoListState$ = this.store.select((state) =>  {
      return state.todos;
    });
  }

  todoEntered(event: KeyboardEvent) {
    const todo = {
      id: Math.ceil(Math.random() * 10000),
      description: (<HTMLInputElement>event.target).value,
      isCompleted: false
    };

    this.store.dispatch(new AddTodoToServer(todo));
    this.clearInput();
  }

  toggleTodo(selectedTodo: Todo) {
    this.store.dispatch(new ToggleTodo(selectedTodo));
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(new DeleteTodo(todo));
  }

  clearInput() {
    (<HTMLInputElement>event.target).value = '';
  }

  clearCompleted() {
    this.todoListState$
        .subscribe((todos: Todo[]) => todos
          .filter((todo) =>  todo.isCompleted)
          .map((todo: Todo) => this.deleteTodo(todo)))
        .unsubscribe();
  }
}
