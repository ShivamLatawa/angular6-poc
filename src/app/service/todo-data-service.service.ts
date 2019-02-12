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

  getAllTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = todos;
  }

  toggleTodo(todo) {
    todo.isCompleted = !todo.isCompleted;
    return todo;
  }
}
