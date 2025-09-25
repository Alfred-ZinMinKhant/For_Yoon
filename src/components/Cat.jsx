import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Loads and renders the Toon Cat GLB model
const Cat = (props) => {
  const group = useRef();
  const mixer = useRef();
  const gltf = useGLTF("/models/toon_cat_free.glb");

  // Change all mesh materials to even lighter grey
  React.useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.color.set("#777777");
            });
          } else {
            child.material.color.set("#999999");
          }
        }
      });
    }
  }, [gltf.scene]);

  // Setup animation mixer and play all animations
  React.useEffect(() => {
    if (gltf.animations && gltf.animations.length > 0 && gltf.scene) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.current.clipAction(clip).play();
      });
    }
    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
    };
  }, [gltf.animations, gltf.scene]);

  // Advance animation mixer every frame
  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

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
useGLTF.preload("/models/toon_cat_free.glb");

export default Cat;
