import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

// Loads and renders the Toon Cat GLB model
const Cat = (props) => {
  const group = useRef();
  // Path relative to public or src folder
  const gltf = useGLTF("/src/assets/models/toon_cat_free.glb");
  // Change all mesh materials to grey
  React.useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.color.set("#cccccc");
            });
          } else {
            child.material.color.set("#cccccc");
          }
        }
      });
    }
  }, [gltf.scene]);
  // No rotation or movement: cat stays still
  return (
    <group
      ref={group}
      {...props}
      scale={[0.003, 0.003, 0.003]}
      position={[0, -0.5, 0]}
    >
      <primitive object={gltf.scene} />
    </group>
  );
};

// Preload the model for performance
useGLTF.preload("/src/assets/models/toon_cat_free.glb");

export default Cat;
