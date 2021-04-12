import { useState } from "react";
import TodoForm from "./components/TodoForm";
import ThreeCanvas from "./ThreeCanvas";

function App() {
  const [todo, setTodo] = useState([]);
  const [toDelete, setToDelete] = useState();
  return (
    <div
      className="w-screen h-screen bg-green-500"
      style={{ width: "100vw", height: "100vh" }}
    >
      <TodoForm todo={todo} setTodo={setTodo} />
      <ThreeCanvas
        todo={todo}
        setTodo={setTodo}
        toDelete={toDelete}
        setToDelete={setToDelete}
      />
    </div>
  );
}

export default App;
