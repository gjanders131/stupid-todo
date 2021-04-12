import { Suspense, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import CameraControls from "./components/CameraControls";
import EnvLight from "./components/EnvLight";
import Postit from "./components/Postit";
import Sphere from "./components/Sphere";
import WhiteBoard from "./components/WhiteBoard";

const ThreeCanvas = ({ todo, setTodo, toDelete, setToDelete }) => {
  useEffect(() => {
    if (toDelete === null) {
      return;
    }
    const newList = todo.filter((item) => item.id !== toDelete);
    setTodo(newList);
  }, [toDelete]);
  return (
    <Canvas>
      <CameraControls />
      {/*       <ambientLight />
      <pointLight position={[10, 10, 10]} /> */}
      <Suspense fallback={null}>
        <EnvLight />
        <WhiteBoard />
        {todo.map((newTodo) => {
          return (
            <Postit
              position={newTodo.pos}
              content={newTodo.content}
              key={newTodo.id}
              info={newTodo.id}
              color={`rgb(${newTodo.color[0]},${newTodo.color[1]},${newTodo.color[2]})`}
              setToDelete={setToDelete}
              rot={newTodo.rot}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
