import * as TodoActions from '../store/actions';
import { Todo } from '../model/todo';

const initialState: Todo[] = [];

export function TodoReducer(state = initialState, action) {
    switch (action.type) {
        case TodoActions.UPDATE_TODOS_STATE: {
            const todos = action.payload;
            return [...todos];
        }

        case TodoActions.TOGGLE_TODO: {
            const selectedTodo = action.payload;
            return updateTodo(state, selectedTodo);
        }

        default: {
            return state;
        }
    }
}

const updateTodo = (todos: Todo[], selectedTodo: Todo) => {
  return todos.map(
      (todo) => todo.id === selectedTodo.id
      ? Object.assign({}, selectedTodo, {isCompleted: !selectedTodo.isCompleted})
      : todo);
};
