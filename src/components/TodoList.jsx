import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, updateTodo, deleteAllTodos } from "../features/todosSlice";
import ReusableInput from "./common/ReusableInput";
import ReusableButton from "./common/ReusableButton";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState("");

  const handleEdit = (id, text) => {
    setEditingId(id);
    setNewText(text);
  };

  const handleSave = (id) => {
    dispatch(updateTodo({ id, text: newText }));
    setEditingId(null);
    setNewText("");
  };

  return (
    <div>
      <ReusableButton
        onClick={() => dispatch(deleteAllTodos())}
        style={{ marginBottom: "1rem" }}
      >
        Delete All
      </ReusableButton>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
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
                <span>{todo.text}</span>
                <ReusableButton
                  onClick={() => handleEdit(todo.id, todo.text)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Edit
                </ReusableButton>
                <ReusableButton
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Delete
                </ReusableButton>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
