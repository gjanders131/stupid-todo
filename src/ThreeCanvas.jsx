import { softShadows } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import CameraControls from "./components/CameraControls";
import Effects from "./components/Effects";
import EnvLight from "./components/EnvLight";
import Postit from "./components/Postit";
import WhiteBoard from "./components/WhiteBoard";

softShadows();

const ThreeCanvas = ({ todo, setTodo, toDelete, setToDelete }) => {
  useEffect(() => {
    if (toDelete === null) {
      return;
    }
    const newList = todo.filter((item) => item.id !== toDelete);
    setTodo(newList);
  }, [toDelete]);

  const shadowMapSize = 2048;
  const shadowCamSize = 25;

  return (
    <Canvas camera={{ position: [0, 0, 20] }} colorManagement shadowMap>
      <CameraControls />
      <directionalLight
        position={[10, 15, 20]}
        castShadow
        shadow-mapSize-height={shadowMapSize}
        shadow-mapSize-width={shadowMapSize}
        shadow-camera-far={150}
        shadow-camera-left={-shadowCamSize}
        shadow-camera-right={shadowCamSize}
        shadow-camera-top={shadowCamSize}
        shadow-camera-bottom={-shadowCamSize}
      />
      <Suspense fallback={null}>
        <EnvLight />

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
        <WhiteBoard />
      </Suspense>
      <Effects />
    </Canvas>
  );
};

export default ThreeCanvas;
