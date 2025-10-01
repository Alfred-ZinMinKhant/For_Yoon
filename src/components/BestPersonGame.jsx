import React, { useState } from "react";

import herImg from "../assets/her.jpeg";
import duckImg from "../assets/duck.jpg";
import lanaImg from "../assets/lana.jpg";
import vaderImg from "../assets/vader.jpg";
import robinImg from "../assets/robin.jpg";
import funnyImg from "../assets/funny.jpg";

const her = { label: "Her", src: herImg, isHer: true };
const candidates = [
  { label: "Duck", src: duckImg },
  { label: "Darth Vader", src: vaderImg },
  { label: "Robin Williams", src: robinImg },
  { label: "Funny Pic", src: funnyImg },
  { label: "Lana Del Ray", src: lanaImg },
];

const BestPersonGame = ({ onComplete }) => {
  const [error, setError] = useState("");
  const [round, setRound] = useState(0); // which candidate is being compared
  const [winner, setWinner] = useState(null); // null, 'her', or 'other'

  const handleChoice = (chosen) => {
    if (chosen === "her") {
      if (round < candidates.length - 1) {
        setRound(round + 1);
        setError("");
      } else {
        setWinner("her");
        setTimeout(() => onComplete(), 1200);
      }
    } else {
      setError("Nope! Only one right answer!");
      setTimeout(() => setError(""), 1000);
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #ffe0ec 0%, #fcf6e9 60%, #c2e9fb 100%)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 10,
          padding: "4vw 2vw",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "rgba(255,246,233,0.97)",
            borderRadius: 32,
            boxShadow: "0 8px 32px #ffb6d5",
            padding: "2.5rem 2rem 2.2rem 2rem",
            maxWidth: "95vw",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            boxSizing: "border-box",
            overflowWrap: "break-word",
          }}
        >
          <div style={{ fontSize: "2.2rem", marginBottom: 8 }}>🏆</div>
          <h2
            className="bpg-title"
            style={{
              color: "#fc3d3d",
              fontFamily: '"Pacifico", "Comic Sans MS", cursive, sans-serif',
              fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
              marginBottom: 8,
              textAlign: "center",
              maxWidth: 600,
              textShadow: "0 2px 8px #fff6e9, 0 1px 4px #fc3d3d33",
              letterSpacing: 1,
            }}
          >
            Best Person in the World Competition
          </h2>
          <div
            style={{
              color: "#e83e3e",
              fontSize: "1.1rem",
              marginBottom: 18,
              fontFamily: "sans-serif",
              textAlign: "center",
            }}
          >
            Only one can win the title... Who is the best person in the world?
            (Hint: It’s you!)
          </div>
          <div
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "center",
              alignItems: "center",
              margin: "2rem 0 1rem 0",
              flexWrap: "wrap",
            }}
          >
            {/* Her card */}
            <div
              className="bpg-card"
              style={{
                border: "3px solid #fc3d3d",
                borderRadius: 20,
                boxShadow: "0 2px 12px #fc3d3d33",
                width: "min(160px, 40vw)",
                height: "min(160px, 40vw)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff6e9",
                position: "relative",
                overflow: "hidden",
                margin: "0.5vw",
                padding: 0,
                cursor: winner ? "not-allowed" : "pointer",
                opacity: winner === "her" ? 0.7 : 1,
                transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
              }}
              onClick={() => handleChoice("her")}
            >
              <img
                className="bpg-img"
                src={her.src}
                alt={her.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 20,
                  margin: 0,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 0,
                  width: "100%",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#fc3d3d",
                  fontSize: "1.1rem",
                  background: "#fff6e9cc",
                  borderRadius: "0 0 20px 20px",
                  padding: "2px 0",
                }}
              >
                {her.label}
              </span>
            </div>
            {/* Candidate card */}
            <div
              className="bpg-card"
              style={{
                border: "3px solid #fc3d3d",
                borderRadius: 20,
                boxShadow: "0 2px 12px #fc3d3d33",
                width: "min(160px, 40vw)",
                height: "min(160px, 40vw)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff6e9",
                position: "relative",
                overflow: "hidden",
                margin: "0.5vw",
                padding: 0,
                cursor: winner ? "not-allowed" : "pointer",
                opacity: winner === "her" ? 0.7 : 1,
                transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
              }}
              onClick={() => handleChoice("other")}
            >
              <img
                className="bpg-img"
                src={candidates[round].src}
                alt={candidates[round].label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 20,
                  margin: 0,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 0,
                  width: "100%",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#fc3d3d",
                  fontSize: "1.1rem",
                  background: "#fff6e9cc",
                  borderRadius: "0 0 20px 20px",
                  padding: "2px 0",
                }}
              >
                {candidates[round].label}
              </span>
            </div>
          </div>
          {error && (
            <div
              style={{
                marginTop: 32,
                color: "#fc3d3d",
                fontWeight: 700,
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
                minHeight: 40,
                textAlign: "center",
                wordBreak: "break-word",
                textShadow: "0 2px 8px #fff6e9",
                letterSpacing: 1,
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BestPersonGame;
