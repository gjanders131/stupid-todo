import * as THREE from "three";
import React, { useState, useEffect, useMemo } from "react";
import { useLoader } from "react-three-fiber";

export default function Sphere(props) {
  return (
    <group {...props}>
      <mesh >
        <sphereBufferGeometry attach="geometry" args={[1.5, 64, 64]} />
        <meshPhysicalMaterial
          attach="material"
          clearcoat={1.0}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          color={"blue"}
          //normalMap-anisotropy={16}
        />
      </mesh>
    </group>
  );
}
