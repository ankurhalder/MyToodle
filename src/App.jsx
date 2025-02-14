import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="app">
      <h1>MyToodle</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
