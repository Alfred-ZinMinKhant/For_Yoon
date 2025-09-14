import React, { useRef, useState } from "react";
import yoonVideo from "../assets/Yoon.mp4";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

function GiftBox({ onUnwrap }) {
  const lidRef = useRef();
  const [open, setOpen] = useState(false);
  useFrame(() => {
    if (open && lidRef.current && lidRef.current.rotation.x > -Math.PI / 2) {
      lidRef.current.rotation.x -= 0.08;
    }
  });
  const handleClick = () => {
    setOpen(true);
    setTimeout(onUnwrap, 1200);
  };
  return (
    <group position={[0, 0, 0]}>
      {/* Box base - bigger and with a subtle gradient */}
      <mesh position={[0, -0.22, 0]} onClick={handleClick} castShadow>
        <boxGeometry args={[1.1, 0.45, 1.1]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Lid - bigger */}
      <mesh ref={lidRef} position={[0, 0.13, 0]} castShadow>
        <boxGeometry args={[1.13, 0.16, 1.13]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Ribbon - thicker and more vibrant */}
      <mesh position={[0, -0.22, 0]} castShadow>
        <boxGeometry args={[0.16, 0.47, 1.13]} />
        <meshStandardMaterial color="#fc3d3d" />
      </mesh>
      <mesh position={[0, -0.22, 0]} castShadow>
        <boxGeometry args={[1.13, 0.47, 0.16]} />
        <meshStandardMaterial color="#fc3d3d" />
      </mesh>
      {/* Click to open label - larger font */}
      {!open && (
        <Html center style={{ pointerEvents: "none" }}>
          <div
            style={{
              color: "#ff69b4",
              fontFamily: "cursive",
              fontSize: 32,
              marginTop: 28,
              textShadow: "0 2px 8px #fff6e9, 0 1px 4px #fc3d3d33",
            }}
          >
            Click to unwrap!
          </div>
        </Html>
      )}
    </group>
  );
}

const GiftUnwrap = ({ onComplete }) => {
  const [unwrapped, setUnwrapped] = useState(false);
  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .gift-msg { font-size: 1.1rem !important; padding: 1.2rem 0.7rem !important; }
          .gift-btn { font-size: 1rem !important; padding: 0.7rem 1.2rem !important; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(135deg, #ffe0ec 0%, #fcf6e9 60%, #c2e9fb 100%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          padding: 0,
          boxSizing: "border-box",
          gap: 0,
          overflow: "visible",
        }}
      >
        <Canvas
          camera={{ position: [0, 0.5, 2], fov: 60 }}
          shadows
          style={{
            width: "100vw",
            height: "auto",
            minHeight: 220,
            background: "transparent",
            overflow: "visible",
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 4, 2]} intensity={1} castShadow />
          {!unwrapped && <GiftBox onUnwrap={() => setUnwrapped(true)} />}
          {/* Confetti hearts and message */}
          {unwrapped && (
            <Html
              center
              style={{
                width: "100vw",
                minHeight: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                background: "none",
                padding: 0,
              }}
            >
              <video
                src={yoonVideo}
                autoPlay
                muted
                loop
                style={{
                  width: "100vw",
                  maxWidth: "100vw",
                  height: "auto",
                  maxHeight: "80vh",
                  borderRadius: 24,
                  boxShadow: "0 8px 32px #e83e3e44",
                  background: "#000",
                  display: "block",
                  objectFit: "contain",
                }}
                controls
              />
            </Html>
          )}
        </Canvas>
        {unwrapped && (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              marginTop: 300,
            }}
          >
            <button
              className="gift-btn"
              style={{
                padding: "1.1rem 2.8rem",
                fontSize: "1.3rem",
                background: "#fc3d3d",
                color: "#fff6e9",
                border: "none",
                borderRadius: "2rem",
                boxShadow: "0 4px 16px #e83e3e44",
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontWeight: 700,
                transition: "background 0.2s",
                maxWidth: "90vw",
                whiteSpace: "nowrap",
                letterSpacing: 1,
                alignSelf: "center",
              }}
              onClick={onComplete}
            >
              Next surprise →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GiftUnwrap;
