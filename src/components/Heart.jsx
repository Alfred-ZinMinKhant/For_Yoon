import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Heart = ({ position, onReachCat }) => {
  const ref = useRef();
  const reached = useRef(false);
  // Create a 2D heart shape and extrude it to 3D
  const geometry = useMemo(() => {
    const x = 0,
      y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x, y + 0.1);
    heartShape.bezierCurveTo(x, y + 0.1, x - 0.1, y, x - 0.2, y - 0.1);
    heartShape.bezierCurveTo(x - 0.3, y - 0.3, x, y - 0.35, x, y - 0.18);
    heartShape.bezierCurveTo(x, y - 0.35, x + 0.3, y - 0.3, x + 0.2, y - 0.1);
    heartShape.bezierCurveTo(x + 0.1, y, x, y + 0.1, x, y + 0.1);
    return new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.07,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
  }, []);

  // Set initial position on mount
  React.useEffect(() => {
    if (ref.current) {
      ref.current.position.set(position[0], position[1], position[2]);
    }
  }, [position]);

  useFrame(() => {
    if (ref.current && !reached.current) {
      if (ref.current.position.y > -0.1) {
        ref.current.position.y -= 0.03;
      } else {
        reached.current = true;
        if (onReachCat) onReachCat();
      }
      // Pulse for cuteness
      const s = 1 + 0.1 * Math.sin(Date.now() * 0.005);
      ref.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      castShadow
      receiveShadow
      rotation={[0, 0, Math.PI]}
    >
      <meshStandardMaterial color="#ff69b4" />
    </mesh>
  );
};

export default Heart;
