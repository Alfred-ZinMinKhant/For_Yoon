import React, { useState } from "react";

// Replace these with your actual image URLs or import statements
const images = [
  { label: "Her", src: "/src/assets/best/her.jpg", isHer: true },
  { label: "Duck", src: "/src/assets/best/duck.jpg" },
  { label: "Odeya", src: "/src/assets/best/odeya.jpg" },
  { label: "Darth Vader", src: "/src/assets/best/vader.jpg" },
  { label: "Danny Kushmaro", src: "/src/assets/best/danny.jpg" },
  { label: "Funny Pic", src: "/src/assets/best/funny.jpg" },
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
        @media (max-width: 600px) {
          .bpg-title { font-size: 1.2rem !important; }
          .bpg-img { width: 70px !important; height: 70px !important; }
          .bpg-card { width: 80px !important; height: 80px !important; }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "rgba(255,255,255,0.7)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 10,
          padding: "2vw",
        }}
      >
        <h2
          className="bpg-title"
          style={{
            color: "#ff69b4",
            fontFamily: "cursive",
            fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
            marginBottom: 24,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          Best Person in the World Competition
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            maxWidth: 700,
            width: "100%",
            justifyContent: "center",
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
                  : "3px solid #ff69b4",
                borderRadius: 18,
                boxShadow: blocked[idx]
                  ? "0 0 16px #ffb6b6"
                  : "0 2px 12px #eee",
                cursor: blocked[idx] ? "not-allowed" : "pointer",
                opacity: blocked[idx] ? 0.5 : 1,
                transform: blocked[idx]
                  ? "scale(0.95) rotate(-5deg)"
                  : "scale(1)",
                transition: "all 0.3s",
                width: 140,
                height: 140,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                position: "relative",
                overflow: "hidden",
                margin: "0.5vw",
              }}
            >
              <img
                className="bpg-img"
                src={img.src}
                alt={img.label}
                style={{
                  width: 110,
                  height: 110,
                  objectFit: "cover",
                  borderRadius: 12,
                  marginBottom: 8,
                  filter: blocked[idx] ? "grayscale(1)" : "none",
                }}
              />
              <span style={{ fontWeight: 600, color: "#ff69b4", fontSize: 16 }}>
                {img.label}
              </span>
              {blocked[idx] && (
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 12,
                    fontSize: 22,
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
              color: "#ff69b4",
              fontWeight: 600,
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              minHeight: 40,
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default BestPersonGame;
