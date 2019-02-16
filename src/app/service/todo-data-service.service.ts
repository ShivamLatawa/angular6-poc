import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  todos: Todo[] =  [];

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo) {
    return this.http.post('http://localhost:3000/data', todo);
  }

  fetchTodos() {
    return this.http.get('http://localhost:3000/data');
  }

  toggleTodo(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    return todo;
  }

  deleteTodo(todo: Todo) {
    const todoId = todo.id;
    return this.http.delete(`http://localhost:3000/data/${todoId}`);
  }
}
