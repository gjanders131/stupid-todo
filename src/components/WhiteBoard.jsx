/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function WhiteBoard(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/whiteboard.gltf");

  const whiteBoardMat = new THREE.MeshStandardMaterial({
    color: "#dddddd",
    roughness: 0.1,
    metalness: 0,
  });

  const frameMat = new THREE.MeshStandardMaterial({
    color: "#a5a5a5",
    roughness: 0.5,
    metalness: 0.5,
  });

  return (
    <Suspense fallback={null}>
      <group ref={group} {...props} dispose={null}>
        <mesh
          geometry={nodes.frame.geometry}
          castShadow
          receiveShadow
          material={frameMat}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.whiteBoard.geometry}
          castShadow
          receiveShadow
          material={whiteBoardMat}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </Suspense>
  );
}

useGLTF.preload("/whiteboard.gltf");
