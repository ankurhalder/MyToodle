import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, updateTodo, deleteAllTodos } from "../features/todosSlice";
import {
  setSearchQuery,
  setSortMethod,
  setEditing,
  setEditingText,
  clearEditing,
} from "../features/uiSlice";
import ReusableInput from "./common/ReusableInput";
import ReusableButton from "./common/ReusableButton";
import ExportButton from "./ExportButton";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const { searchQuery, sortMethod, editingId, editingText } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  const filteredTodos = useMemo(() => {
    let filtered = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortMethod === "updatedAt") {
      filtered = [...filtered].sort((a, b) => b.updatedAt - a.updatedAt);
    } else if (sortMethod === "createdAt") {
      filtered = [...filtered].sort((a, b) => b.createdAt - a.createdAt);
    }
    return filtered;
  }, [todos, searchQuery, sortMethod]);

  const handleEdit = (id, text) => {
    dispatch(setEditing({ id, text }));
  };

  const handleSave = (id) => {
    if (editingText.trim() === "") return;
    dispatch(updateTodo({ id, text: editingText }));
    dispatch(clearEditing());
  };

  const getTimeDisplay = (timestamp) => new Date(timestamp).toLocaleString();

  return (
    <div className="todo__list">
      <div className="todo__list__search">
        <ReusableInput
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search todos..."
        />
      </div>
      <div className="todo__list__sort">
        <label className="todo__list__sort__label">Sort By: </label>
        <select
          className="todo__list__sort__select"
          value={sortMethod}
          onChange={(e) => dispatch(setSortMethod(e.target.value))}
        >
          <option
            className="todo__list__sort__select__updatedAt"
            value="updatedAt"
          >
            Last Updated
          </option>
          <option
            className="todo__list__sort__select__createdAt"
            value="createdAt"
          >
            Creation Time
          </option>
        </select>
      </div>

      <ReusableButton
        onClick={() => dispatch(deleteAllTodos())}
        className="todo__list__delete-all-button"
      >
        Delete All
      </ReusableButton>

      <ul className="todo__list__items">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            editingText={editingText}
            onEdit={() => handleEdit(todo.id, todo.text)}
            onChangeEditingText={(text) => dispatch(setEditingText(text))}
            onSave={() => handleSave(todo.id)}
            onDelete={() => dispatch(deleteTodo(todo.id))}
            getTimeDisplay={getTimeDisplay}
          />
        ))}
      </ul>

      <ExportButton />
    </div>
  );
};

export default TodoList;
