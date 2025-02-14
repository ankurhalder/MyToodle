import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todosSlice";
import ReusableInput from "./common/ReusableInput";
import ReusableButton from "./common/ReusableButton";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <ReusableInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <ReusableButton type="submit">Add Todo</ReusableButton>
    </form>
  );
};

export default TodoForm;
