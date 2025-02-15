import { useMemo, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, updateTodo, deleteAllTodos } from "../features/todosSlice";
import {
  setSearchQuery,
  setEditing,
  setEditingText,
  clearEditing,
} from "../features/uiSlice";
import ReusableInput from "./common/ReusableInput";
import ReusableButton from "./common/ReusableButton";
import ExportButton from "./ExportButton";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const { searchQuery, editingId, editingText } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  const filteredTodos = useMemo(() => {
    const filtered = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  }, [todos, searchQuery]);

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage) || 1;
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const displayedTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  const handleEdit = (id, text) => {
    dispatch(setEditing({ id, text }));
  };

  const handleSave = (id) => {
    if (editingText.trim() === "") return;
    dispatch(updateTodo({ id, text: editingText }));
    dispatch(clearEditing());
  };

  const getTimeDisplay = (timestamp) => new Date(timestamp).toLocaleString();

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      dispatch(deleteAllTodos());
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="todo__list">
      {todos.length > 0 && (
        <Fragment>
          <div className="todo__list__search">
            <ReusableInput
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search todos..."
            />
          </div>
          <ReusableButton
            onClick={handleDeleteAll}
            className="todo__list__delete-all-button"
          >
            Delete All
          </ReusableButton>
        </Fragment>
      )}

      <ul className="todo__list__items">
        {displayedTodos.map((todo) => (
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
            searchQuery={searchQuery}
          />
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="todo__list__footer">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <ExportButton />
        </div>
      )}
    </div>
  );
};

export default TodoList;
