import * as THREE from "three";
import { useEffect } from "react";
import { useThree, useLoader } from "react-three-fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const EnvLight = ({ background = true }) => {
  const { gl, scene } = useThree();

  /* const loader = new THREE.TextureLoader(); */
  const [texture] = useLoader(
    RGBELoader,
    ["colorful_studio_1k.hdr"],
    (loader) => {
      loader.setDataType(THREE.UnsignedByteType);
      loader.setPath("");
    }
  );
  useEffect(() => {
    const gen = new THREE.PMREMGenerator(gl);
    const hdr = gen.fromEquirectangular(texture);
    texture.dispose();
    gen.dispose();
    scene.environment = hdr.texture;
    scene.background = scene.environment;
  }, [texture]);

  return null;
};

export default EnvLight;
