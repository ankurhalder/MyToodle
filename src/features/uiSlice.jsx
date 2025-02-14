import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  sortMethod: "updatedAt",
  editingId: null,
  editingText: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortMethod: (state, action) => {
      state.sortMethod = action.payload;
    },
    setEditing: (state, action) => {
      state.editingId = action.payload.id;
      state.editingText = action.payload.text;
    },
    setEditingText: (state, action) => {
      state.editingText = action.payload;
    },
    clearEditing: (state) => {
      state.editingId = null;
      state.editingText = "";
    },
  },
});

export const {
  setSearchQuery,
  setSortMethod,
  setEditing,
  setEditingText,
  clearEditing,
} = uiSlice.actions;
export default uiSlice.reducer;
