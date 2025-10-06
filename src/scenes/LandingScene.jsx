import React, { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import Cat from "../components/Cat";
import LetterScene from "../components/LetterScene";
import Heart from "../components/Heart";
import WhyDateGame from "../components/WhyDateGame";
import BestPersonGame from "../components/BestPersonGame";
import BigQuestion from "../components/BigQuestion";
import GiftUnwrap from "../components/GiftUnwrap";
import LoveLetter from "../components/LoveLetter";

// Scene steps: 'landing', 'why-date', 'best-person', 'big-question', 'love-letter'
const LandingScene = () => {
  const [scene, setScene] = useState("landing");
  const [hearts, setHearts] = useState([]);
  const [catBounce, setCatBounce] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);

  // Drop a heart at a random x position above the cat
  const handleDropHeart = useCallback(
    (e) => {
      // Only drop if click is not on UI
      if (e.target.tagName === "CANVAS") {
        setHearts((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            position: [Math.random() * 0.8 - 0.4, 1.5, 0],
          },
        ]);
        if (!showBirthday) {
          setTimeout(() => setShowBirthday(true), 700); // reveal after a short delay
        }
      }
    },
    [showBirthday]
  );

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
        background:
          "linear-gradient(135deg, #ffe0ec 0%, #fcf6e9 60%, #c2e9fb 100%)",
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
              top: showBirthday ? "16%" : "30%",
              width: "100%",
              textAlign: "center",
              color: showBirthday ? "#fc3d3d" : "#333",
              fontFamily: showBirthday
                ? '"Pacifico", "Comic Sans MS", cursive, sans-serif'
                : "sans-serif",
              fontSize: showBirthday ? "3.2rem" : "1.7rem",
              textShadow: showBirthday
                ? "0 4px 24px #fff6e9, 0 2px 8px #fc3d3d55"
                : "none",
              pointerEvents: "none",
              zIndex: 2,
              maxWidth: "95vw",
              left: 0,
              right: 0,
              margin: "0 auto",
              opacity: showBirthday ? 1 : 0.95,
              letterSpacing: showBirthday ? 2 : 0,
              transition: "all 0.7s cubic-bezier(.4,2,.6,1)",
              animation: showBirthday
                ? "popIn 1.2s cubic-bezier(.4,2,.6,1)"
                : "none",
            }}
          >
            {showBirthday ? (
              <>
                <span
                  role="img"
                  aria-label="heart"
                  style={{
                    fontSize: "2.2rem",
                    verticalAlign: "middle",
                    marginRight: 8,
                  }}
                >
                  ❤️
                </span>
                Happy Birthday, My Strawberry!
                <span
                  role="img"
                  aria-label="strawberry"
                  style={{
                    fontSize: "2.2rem",
                    verticalAlign: "middle",
                    marginLeft: 8,
                  }}
                >
                  🍓
                </span>
                <br />
                <span
                  className="bdc-sub"
                  style={{
                    fontSize: "1.5rem",
                    color: "#333",
                    textShadow: "none",
                    wordBreak: "break-word",
                    fontFamily: "sans-serif",
                  }}
                >
                  You made Ozzy happy! Ready for your surprise?
                </span>
              </>
            ) : (
              <span
                className="bdc-sub"
                style={{
                  fontSize: "1.5rem",
                  color: "#333",
                  textShadow: "none",
                  wordBreak: "break-word",
                }}
              >
                Click to feed "Ozzy" a heart
              </span>
            )}
          </div>
          {showBirthday && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "78%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                textAlign: "center",
                zIndex: 3,
              }}
            >
              <div
                style={{
                  marginBottom: 16,
                  color: "#e83e3e",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                  textShadow: "0 2px 8px #fff6e9",
                }}
              >
                Click below to begin your special journey!
              </div>
              <button
                className="bdc-btn"
                style={{
                  padding: "1.1rem 2.8rem",
                  fontSize: "1.3rem",
                  background: "#fc3d3d",
                  color: "#fff6e9",
                  border: "none",
                  borderRadius: "2rem",
                  boxShadow: "0 4px 16px #ffb6d5",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  transition: "background 0.2s",
                  maxWidth: "90vw",
                  whiteSpace: "nowrap",
                  letterSpacing: 1,
                }}
                onClick={() => setScene("why-date")}
              >
                Open my surprise
              </button>
            </div>
          )}
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
        @keyframes popIn {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
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
        <LoveLetter onShowLetter={() => setScene("letter")} />
      )}
      {scene === "letter" && <LetterScene />}
    </div>
  );
};

export default LandingScene;
