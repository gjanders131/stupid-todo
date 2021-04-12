import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

function makeLabelCanvas(size, content) {
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
  console.log({ width, height });
  ctx.canvas.width = width;
  ctx.canvas.height = width;

  // need to set font again after resizing canvas
  ctx.font = font;
  ctx.textBaseline = "top";

  const altCtx = ctx;
  const nrmCtx = ctx;
  altCtx.fillStyle = "black";
  altCtx.fillRect(0, 0, width, width);
  altCtx.filter = "blur(2px)";
  altCtx.fillStyle = "white";
  altCtx.fillText(content, borderSize, borderSize);

  nrmCtx.fillStyle = "#ffffff";
  nrmCtx.fillRect(0, 0, width, width);
  nrmCtx.filter = "blur(1px)";
  nrmCtx.fillStyle = "#000000";
  nrmCtx.fillText(content, borderSize, borderSize);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, width);
  ctx.filter = "blur(0.5px)";
  ctx.fillStyle = "#1f1f1f";
  ctx.fillText(content, borderSize, borderSize);

  return {
    canvas: ctx.canvas,
    altCanvas: altCtx.canvas,
    nrmCanvas: nrmCtx.canvas,
  };
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
    const canvas = makeLabelCanvas(
      100,
      props.content,
      hover ? "yellow" : props.color
    );
    const texture = new THREE.CanvasTexture(canvas.canvas);
    // because our canvas is likely not a power of 2
    // in both dimensions set the filtering appropriately.
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false;

    const altTex = new THREE.CanvasTexture(canvas.altCanvas);
    altTex.minFilter = THREE.LinearFilter;
    altTex.wrapS = THREE.ClampToEdgeWrapping;
    altTex.wrapT = THREE.ClampToEdgeWrapping;
    altTex.flipY = false;

    const nrmTex = new THREE.CanvasTexture(canvas.nrmCanvas);
    nrmTex.minFilter = THREE.LinearFilter;
    nrmTex.wrapS = THREE.ClampToEdgeWrapping;
    nrmTex.wrapT = THREE.ClampToEdgeWrapping;
    nrmTex.flipY = false;

    return new THREE.MeshStandardMaterial({
      color: hover ? "yellow" : props.color,
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.5,
      roughnessMap: altTex,
      bumpMap: nrmTex,
      metalness: 0,
    });
  };

  return (
    <Suspense fallback={null}>
      <group ref={group} {...props} dispose={null}>
        <mesh
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
