import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const timestamp = Date.now();
      const newTodo = {
        id: timestamp,
        text: action.payload,
        completed: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      state.push(newTodo);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
        todo.updatedAt = Date.now();
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    deleteAllTodos: () => {
      return [];
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, deleteAllTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
