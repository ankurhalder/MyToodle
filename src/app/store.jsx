import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todosSlice";
import uiReducer from "../features/uiSlice";

const persistedTodos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    ui: uiReducer,
  },
  preloadedState: {
    todos: persistedTodos,
  },
});

store.subscribe(() => {
  localStorage.setItem("todos", JSON.stringify(store.getState().todos));
});
