import React, { useState } from "react";

// Replace these with your actual image URLs or import statements
const images = [
  { src: "/src/assets/her.jpeg", isHer: true },
  { src: "/src/assets/duck.jpg" },
  { src: "/src/assets/lana.jpg" },
  { src: "/src/assets/vader.jpg" },
  { src: "/src/assets/robin.jpg" },
  { src: "/src/assets/funny.jpg" },
];

const BestPersonGame = ({ onComplete }) => {
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(Array(images.length).fill(false));

  const handleClick = (idx, isHer) => {
    if (blocked[idx]) return;
    if (isHer) {
      onComplete();
    } else {
      setError("Nope! Only one right answer!");
      setBlocked((prev) => {
        const copy = [...prev];
        copy[idx] = true;
        return copy;
      });
      setTimeout(() => setError(""), 1000);
    }
  };

  return (
    <React.Fragment>
      <style>{`
        .bpg-img-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 18px;
          justify-items: center;
        }
        @media (max-width: 600px) {
          .bpg-title { font-size: 1.2rem !important; }
          .bpg-img { width: 90px !important; height: 90px !important; }
          .bpg-card { width: 100px !important; height: 100px !important; }
          .bpg-img-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
        }
        @media (min-width: 601px) {
          .bpg-img { width: 140px !important; height: 140px !important; }
          .bpg-card { width: 160px !important; height: 160px !important; }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background:
            "linear-gradient(135deg, #ffe0ec 0%, #fcf6e9 60%, #c2e9fb 100%)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 10,
          padding: "2vw",
        }}
      >
        <div
          style={{
            background: "rgba(255,246,233,0.97)",
            borderRadius: 32,
            boxShadow: "0 8px 32px #ffb6d5",
            padding: "2.5rem 2rem 2.2rem 2rem",
            maxWidth: 600,
            width: "90vw",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
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
            className="bpg-img-grid"
            style={{
              gap: 18,
              maxWidth: 700,
              width: "100%",
              margin: "0 auto",
            }}
          >
            {images.map((img, idx) => (
              <div
                className="bpg-card"
                key={img.label}
                onClick={() => handleClick(idx, !!img.isHer)}
                style={{
                  border: blocked[idx]
                    ? "3px solid #ffb6b6"
                    : "3px solid #fc3d3d",
                  borderRadius: 20,
                  boxShadow: blocked[idx]
                    ? "0 0 16px #ffb6b6"
                    : "0 2px 12px #fc3d3d33",
                  cursor: blocked[idx] ? "not-allowed" : "pointer",
                  opacity: blocked[idx] ? 0.5 : 1,
                  transform: blocked[idx]
                    ? "scale(0.95) rotate(-5deg)"
                    : "scale(1)",
                  transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                  width: 160,
                  height: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: blocked[idx] ? "#ffe0ec" : "#fff6e9",
                  position: "relative",
                  overflow: "hidden",
                  margin: "0.5vw",
                  padding: 0,
                }}
              >
                <img
                  className="bpg-img"
                  src={img.src}
                  alt={img.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 20,
                    filter: blocked[idx] ? "grayscale(1)" : "none",
                    margin: 0,
                  }}
                />
                {blocked[idx] && (
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 12,
                      fontSize: 22,
                      animation: "popIn 0.7s cubic-bezier(.4,2,.6,1)",
                    }}
                  >
                    🚫
                  </span>
                )}
              </div>
            ))}
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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
          @keyframes popIn {
            0% { transform: scale(0.7); opacity: 0; }
            60% { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </React.Fragment>
  );
};

export default BestPersonGame;
