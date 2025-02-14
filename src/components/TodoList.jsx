import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, updateTodo, deleteAllTodos } from "../features/todosSlice";
import ReusableInput from "./common/ReusableInput";
import ReusableButton from "./common/ReusableButton";
import ExportButton from "./ExportButton";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethod, setSortMethod] = useState("updatedAt");

  let filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortMethod === "updatedAt") {
    filteredTodos = [...filteredTodos].sort(
      (a, b) => b.updatedAt - a.updatedAt
    );
  } else if (sortMethod === "createdAt") {
    filteredTodos = [...filteredTodos].sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  const handleEdit = (id, text) => {
    setEditingId(id);
    setNewText(text);
  };

  const handleSave = (id) => {
    if (newText.trim() === "") return;
    dispatch(updateTodo({ id, text: newText }));
    setEditingId(null);
    setNewText("");
  };

  const getTimeDisplay = (timestamp) => new Date(timestamp).toLocaleString();

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <ReusableInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search todos..."
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Sort By: </label>
        <select
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="updatedAt">Last Updated</option>
          <option value="createdAt">Creation Time</option>
        </select>
      </div>

      <ReusableButton
        onClick={() => dispatch(deleteAllTodos())}
        style={{ marginBottom: "1rem" }}
      >
        Delete All
      </ReusableButton>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {editingId === todo.id ? (
              <>
                <ReusableInput
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
                <ReusableButton onClick={() => handleSave(todo.id)}>
                  Save
                </ReusableButton>
              </>
            ) : (
              <>
                <div>
                  <strong>{todo.text}</strong>
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  Added: {getTimeDisplay(todo.createdAt)}
                  {todo.updatedAt !== todo.createdAt && (
                    <> | Updated: {getTimeDisplay(todo.updatedAt)}</>
                  )}
                </div>
                <ReusableButton
                  onClick={() => handleEdit(todo.id, todo.text)}
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </ReusableButton>
                <ReusableButton onClick={() => dispatch(deleteTodo(todo.id))}>
                  Delete
                </ReusableButton>
              </>
            )}
          </li>
        ))}
      </ul>

      <ExportButton />
    </div>
  );
};

export default TodoList;
