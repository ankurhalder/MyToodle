import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <h1>Todo List with Redux</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
