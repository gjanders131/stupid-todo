import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

function makeLabelCanvas(size, content, bgcolor, textColor, blur) {
  const borderSize = 25;
  const ctx = document.createElement("canvas").getContext("2d");
  const font = `${size}px Shadows Into Light`;
  ctx.font = font;
  // measure how long the name will be
  const doubleBorderSize = borderSize * 2;
  const width = ctx.measureText(content).width + doubleBorderSize;
  const height = ctx.measureText("M").width;
  /*
  if(width > 500){
    
  }
  
  */
  ctx.canvas.width = width;
  ctx.canvas.height = width;

  // need to set font again after resizing canvas
  ctx.font = font;
  ctx.textBaseline = "top";

  ctx.fillStyle = bgcolor;
  ctx.filter = `blur(${blur})`;
  ctx.fillRect(0, 0, width, width);
  ctx.fillStyle = textColor;
  ctx.fillText(content, borderSize, borderSize);

  return ctx;
}

const Postit = (props) => {
  const group = useRef();
  const [hover, setHover] = useState(false);
  const { nodes } = useGLTF("/postit.gltf");

  const handleOnClick = (id) => {
    props.setToDelete(id);
  };

  //Material with canvas texture
  const newMat = () => {
    const diffuseText = makeLabelCanvas(
      100,
      props.content,
      "white",
      "#292929",
      "0px"
    );
    const roughnessText = makeLabelCanvas(
      100,
      props.content,
      "#cccccc",
      "#616161",
      "2px"
    );
    const bumpText = makeLabelCanvas(
      100,
      props.content,
      "#ffffff",
      "#fdfdfd",
      "0.5px"
    );

    const texture = new THREE.CanvasTexture(diffuseText.canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false;

    const roughness = new THREE.CanvasTexture(roughnessText.canvas);
    roughness.minFilter = THREE.LinearFilter;
    roughness.wrapS = THREE.ClampToEdgeWrapping;
    roughness.wrapT = THREE.ClampToEdgeWrapping;
    roughness.flipY = false;

    const bump = new THREE.CanvasTexture(bumpText.canvas);
    bump.minFilter = THREE.LinearFilter;
    bump.wrapS = THREE.ClampToEdgeWrapping;
    bump.wrapT = THREE.ClampToEdgeWrapping;
    bump.flipY = false;

    return new THREE.MeshStandardMaterial({
      color: hover ? "yellow" : props.color,
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.5,
      roughnessMap: roughness,
      bumpMap: bump,
      metalness: 0,
    });
  };

  return (
    <Suspense fallback={null}>
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={newMat()}
          position={props.position}
          rotation={[Math.PI / 2, props.rot, 0]}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={() => handleOnClick(props.info)}
        />
      </group>
    </Suspense>
  );
};

useGLTF.preload("/postit.gltf");

export default Postit;
