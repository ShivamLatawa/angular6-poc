import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TodoDataService } from "../service/todo-data-service.service";
import { Todo } from '../model/todo';
import { FetchTodos, AddTodoToServer, ToggleTodo } from "../store/actions";
import { TodoListState } from "../store/state";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: []
})

export class TodoComponent implements OnInit{

  todoListState$: Observable<Todo[]>;

  ngOnInit() {
    this.todoListState$ = this.store.select((state) =>  {
      return state.todos;
    });
  }

  constructor(private store: Store <TodoListState> ) {
    this.store.dispatch(new FetchTodos());
  }

  todoEntered(event: KeyboardEvent) {
    const todo = {
      id: Math.ceil(Math.random() * 100),
      description: (<HTMLInputElement>event.target).value,
      isCompleted: false
    };

    this.store.dispatch(new AddTodoToServer(todo));
  }

  toggleTodo(selectedTodo: Todo) {
    this.store.dispatch(new ToggleTodo(selectedTodo));
  }

}
