import React, { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import Cat from "../components/Cat";
import Heart from "../components/Heart";
import WhyDateGame from "../components/WhyDateGame";
import BestPersonGame from "../components/BestPersonGame";
import BigQuestion from "../components/BigQuestion";
import GiftUnwrap from "../components/GiftUnwrap";

// Scene steps: 'landing', 'why-date', 'best-person', 'big-question', 'love-letter'
const LandingScene = () => {
  const [scene, setScene] = useState("landing");
  const [hearts, setHearts] = useState([]);
  const [catBounce, setCatBounce] = useState(false);

  // Drop a heart at a random x position above the cat
  const handleDropHeart = useCallback((e) => {
    // Only drop if click is not on UI
    if (e.target.tagName === "CANVAS") {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          position: [Math.random() * 0.8 - 0.4, 1.5, 0],
        },
      ]);
    }
  }, []);

  // Remove heart when it reaches the cat
  const handleHeartReachCat = useCallback((id) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setCatBounce(true);
    setTimeout(() => setCatBounce(false), 400); // bounce duration
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #ffe0ec 0%, #c2e9fb 100%)",
      }}
    >
      {scene === "landing" && (
        <>
          <style>{`
            @media (max-width: 600px) {
              .bdc-title { font-size: 1.5rem !important; }
              .bdc-sub { font-size: 1rem !important; }
              .bdc-btn { font-size: 1rem !important; padding: 0.7rem 1.5rem !important; }
            }
          `}</style>
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Canvas
            camera={{ position: [0, 1.5, 5], fov: 60 }}
            onClick={handleDropHeart}
            style={{
              width: "100vw",
              height: "100vh",
              maxWidth: "100vw",
              maxHeight: "100vh",
            }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            <Stars
              radius={50}
              depth={50}
              count={2000}
              factor={4}
              saturation={0.5}
              fade
            />
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <Cat position={[0, 0, 0]} bounce={catBounce} turning={false} />
            </Float>
            {/* Render all hearts */}
            {hearts.map((heart) => (
              <Heart
                key={heart.id}
                position={heart.position}
                onReachCat={() => handleHeartReachCat(heart.id)}
              />
            ))}
            <OrbitControls enableZoom={false} />
          </Canvas>
          <div
            className="bdc-title"
            style={{
              position: "absolute",
              top: "20%",
              width: "100%",
              textAlign: "center",
              color: "#ff69b4",
              fontFamily: "cursive",
              fontSize: "2.5rem",
              textShadow: "0 2px 8px #fff",
              pointerEvents: "none",
              zIndex: 2,
              maxWidth: "95vw",
              left: 0,
              right: 0,
              margin: "0 auto",
            }}
          >
            Happy Birthday!
            <br />
            <span
              className="bdc-sub"
              style={{
                fontSize: "1.5rem",
                color: "#333",
                textShadow: "none",
                wordBreak: "break-word",
              }}
            >
              Click to feed the cat a heart!
            </span>
          </div>
          <button
            className="bdc-btn"
            style={{
              position: "absolute",
              left: "50%",
              top: "65%",
              transform: "translate(-50%, -50%)",
              padding: "1rem 2.5rem",
              fontSize: "1.5rem",
              background: "#ff69b4",
              color: "#fff",
              border: "none",
              borderRadius: "2rem",
              boxShadow: "0 4px 16px #ffb6d5",
              cursor: "pointer",
              zIndex: 3,
              fontFamily: "cursive",
              transition: "background 0.2s",
              maxWidth: "90vw",
              whiteSpace: "nowrap",
            }}
            onClick={() => setScene("why-date")}
          >
            Start
          </button>
        </>
      )}
      {/* Scene transitions */}
      {scene === "why-date" && (
        <WhyDateGame onComplete={() => setScene("best-person")} />
      )}
      {scene === "best-person" && (
        <BestPersonGame onComplete={() => setScene("gift-unwrap")} />
      )}
      {scene === "gift-unwrap" && (
        <GiftUnwrap onComplete={() => setScene("big-question")} />
      )}
      {scene === "big-question" && (
        <BigQuestion onComplete={() => setScene("love-letter")} />
      )}
      {scene === "love-letter" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255,255,255,0.85)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2vw",
          }}
        >
          <div
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
              width: "100%",
              margin: "0 auto",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            <div
              style={{
                fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                marginBottom: 18,
              }}
            >
              ❤️
            </div>
            <div
              style={{
                fontSize: "clamp(1.2rem, 4vw, 1.7rem)",
                marginBottom: 18,
              }}
            >
              My dearest love,
            </div>
            <div
              style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", marginBottom: 18 }}
            >
              You make every day brighter and my heart so full.
              <br />
              Thank you for being you, and for letting me share this special
              moment with you.
            </div>
            <div
              style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", marginBottom: 18 }}
            >
              Happy Birthday!
              <br />I love you so much!
            </div>
            <div
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                color: "#ff69b4",
                fontWeight: 600,
              }}
            >
              Yours forever.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingScene;
