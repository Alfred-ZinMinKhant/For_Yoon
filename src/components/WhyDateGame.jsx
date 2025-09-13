import React, { useState } from "react";

const qualities = [
  // 9 positive
  { text: "Kind", positive: true },
  { text: "Funny", positive: true },
  { text: "Smart", positive: true },
  { text: "Beautiful", positive: true },
  { text: "Caring", positive: true },
  { text: "Adventurous", positive: true },
  { text: "Supportive", positive: true },
  { text: "Creative", positive: true },
  { text: "Loyal", positive: true },
  // 6 negative
  { text: "Always Late", positive: false },
  { text: "Forgets Birthdays", positive: false },
  { text: "Eats My Fries", positive: false },
  { text: "Steals Blankets", positive: false },
  { text: "Snores Loudly", positive: false },
  { text: "Leaves Dishes", positive: false },
];

const WhyDateGame = ({ onComplete }) => {
  const [selected, setSelected] = useState([]);
  const [faded, setFaded] = useState([]);
  const [message, setMessage] = useState("");

  const handleClick = (idx, positive) => {
    if (selected.includes(idx) || faded.includes(idx)) return;
    if (positive) {
      setSelected([...selected, idx]);
      setMessage("");
    } else {
      setFaded([...faded, idx]);
      setMessage(
        ["Whoops!", "Nope!", "Try again!"][Math.floor(Math.random() * 3)]
      );
      setTimeout(() => setMessage(""), 1000);
    }
  };

  React.useEffect(() => {
    if (selected.length === qualities.filter((q) => q.positive).length) {
      setTimeout(() => onComplete(), 800);
    }
  }, [selected, onComplete]);

  return (
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
      }}
    >
      <div
        style={{
          background: "rgba(255,246,233,0.95)",
          borderRadius: 32,
          boxShadow: "0 8px 32px #ffb6d5",
          padding: "2.5rem 2rem 2.2rem 2rem",
          maxWidth: 520,
          width: "90vw",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ fontSize: "2.2rem", marginBottom: 8 }}>💘</div>
        <h2
          style={{
            color: "#fc3d3d",
            fontFamily: '"Pacifico", "Comic Sans MS", cursive, sans-serif',
            fontSize: "2.2rem",
            marginBottom: 8,
            textShadow: "0 2px 8px #fff6e9, 0 1px 4px #fc3d3d33",
            letterSpacing: 1,
          }}
        >
          Why I Fall In Love With You?
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
          Pick all the reasons why <b>I</b> fall in love with you!
          <br />
          (But beware of the silly ones 😉)
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            maxWidth: 600,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {qualities.map((q, idx) => (
            <button
              key={q.text}
              onClick={() => handleClick(idx, q.positive)}
              style={{
                opacity: faded.includes(idx) ? 0.3 : 1,
                background: selected.includes(idx)
                  ? "#fc3d3d"
                  : q.positive
                  ? "#fff6e9"
                  : "#ffd6e0",
                color: selected.includes(idx)
                  ? "#fff6e9"
                  : q.positive
                  ? "#e83e3e"
                  : "#fc3d3d",
                border: selected.includes(idx)
                  ? "2.5px solid #fc3d3d"
                  : "2px solid #ff69b4",
                borderRadius: 18,
                fontSize: "1.1rem",
                padding: "1rem 1.2rem",
                minWidth: 90,
                minHeight: 48,
                boxShadow: selected.includes(idx)
                  ? "0 0 16px #fc3d3d55"
                  : "0 2px 8px #eee",
                cursor: faded.includes(idx) ? "not-allowed" : "pointer",
                transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                position: "relative",
                fontWeight: 600,
                letterSpacing: 0.5,
                wordBreak: "break-word",
              }}
              disabled={faded.includes(idx)}
            >
              {q.text}
              {selected.includes(idx) && (
                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    fontSize: 20,
                    animation: "popIn 0.7s cubic-bezier(.4,2,.6,1)",
                  }}
                >
                  💖
                </span>
              )}
            </button>
          ))}
        </div>
        {message && (
          <div
            style={{
              marginTop: 32,
              color: "#fc3d3d",
              fontWeight: 700,
              fontSize: "1.5rem",
              minHeight: 40,
              textShadow: "0 2px 8px #fff6e9",
              letterSpacing: 1,
            }}
          >
            {message}
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
        @media (max-width: 600px) {
          .whydate-container {
            padding: 1.2rem 0.2rem !important;
          }
          .whydate-btns {
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WhyDateGame;
