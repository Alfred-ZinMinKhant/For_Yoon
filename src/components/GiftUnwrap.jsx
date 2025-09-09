import React, { useRef, useState } from "react";
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
      {/* Box base */}
      <mesh position={[0, -0.15, 0]} onClick={handleClick} castShadow>
        <boxGeometry args={[0.7, 0.3, 0.7]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
      {/* Lid */}
      <mesh ref={lidRef} position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.72, 0.1, 0.72]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Ribbon */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <boxGeometry args={[0.1, 0.32, 0.72]} />
        <meshStandardMaterial color="#fff6e9" />
      </mesh>
      <mesh position={[0, -0.15, 0]} castShadow>
        <boxGeometry args={[0.72, 0.32, 0.1]} />
        <meshStandardMaterial color="#fff6e9" />
      </mesh>
      {/* Click to open label */}
      {!open && (
        <Html center style={{ pointerEvents: "none" }}>
          <div
            style={{
              color: "#ff69b4",
              fontFamily: "cursive",
              fontSize: 24,
              marginTop: 20,
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
    <React.Fragment>
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
          background: "rgba(255,255,255,0.7)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "2vw",
        }}
      >
        <Canvas camera={{ position: [0, 0.5, 2], fov: 60 }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 4, 2]} intensity={1} castShadow />
          {!unwrapped && <GiftBox onUnwrap={() => setUnwrapped(true)} />}
          {/* Confetti hearts and message */}
          {unwrapped && (
            <Html
              center
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="gift-msg"
                style={{
                  color: "#ff69b4",
                  fontFamily: "cursive",
                  fontSize: "clamp(1.1rem, 4vw, 2rem)",
                  background: "rgba(255,255,255,0.97)",
                  borderRadius: 32,
                  padding: "2.5rem 3rem",
                  boxShadow: "0 8px 32px #ffb6d5",
                  textAlign: "center",
                  maxWidth: 420,
                  margin: "0 auto",
                  lineHeight: 1.5,
                  position: "relative",
                  top: 0,
                  left: 0,
                  transform: "none",
                  wordBreak: "break-word",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                    marginBottom: 18,
                  }}
                >
                  🎁
                </div>
                <div style={{ marginBottom: 18 }}>Surprise!</div>
                <div
                  style={{
                    fontSize: "clamp(1rem, 3vw, 1.3rem)",
                    marginBottom: 18,
                  }}
                >
                  You are the greatest gift in my life.
                  <br />I hope this made you smile!
                </div>
                <span
                  style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                    color: "#ff69b4",
                    fontWeight: 600,
                  }}
                >
                  Happy Birthday, my love! 💖
                </span>
              </div>
            </Html>
          )}
        </Canvas>
        {unwrapped && (
          <button
            className="gift-btn"
            style={{
              marginTop: 40,
              padding: "1rem 2.5rem",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              background: "#ff69b4",
              color: "#fff",
              border: "none",
              borderRadius: "2rem",
              boxShadow: "0 4px 16px #ffb6d5",
              cursor: "pointer",
              fontFamily: "cursive",
              transition: "background 0.2s",
              maxWidth: "90vw",
              whiteSpace: "nowrap",
            }}
            onClick={onComplete}
          >
            Continue
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default GiftUnwrap;
