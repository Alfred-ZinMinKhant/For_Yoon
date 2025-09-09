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
        background: "rgba(255,255,255,0.7)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 10,
      }}
    >
      <h2
        style={{
          color: "#ff69b4",
          fontFamily: "cursive",
          fontSize: "2.2rem",
          marginBottom: 24,
        }}
      >
        Why Should I Date You?
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          maxWidth: 600,
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
                ? "#b2f7ef"
                : q.positive
                ? "#fff"
                : "#ffe0ec",
              color: q.positive ? "#333" : "#ff69b4",
              border: "2px solid #ff69b4",
              borderRadius: 16,
              fontSize: "1.1rem",
              padding: "1.1rem 1.7rem",
              minWidth: 120,
              minHeight: 60,
              boxShadow: selected.includes(idx)
                ? "0 0 12px #b2f7ef"
                : "0 2px 8px #eee",
              cursor: faded.includes(idx) ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              position: "relative",
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
                  fontSize: 18,
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
            color: "#ff69b4",
            fontWeight: 600,
            fontSize: "1.5rem",
            minHeight: 40,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default WhyDateGame;
