import React, { useState } from "react";

const noMessages = [
  "What?",
  "Why?",
  "I thought you loved me ;(",
  "Please?",
  "Are you sure?",
  "Try again!",
  "Nooooo!",
  "You can't say no!",
];

const BigQuestion = ({ onComplete }) => {
  const [noTries, setNoTries] = useState(0);
  const [noText, setNoText] = useState("No");
  const [showYesOnly, setShowYesOnly] = useState(false);
  // No more showLetter state; love letter is now a separate scene

  const handleNo = () => {
    if (noTries >= noMessages.length - 1) {
      setShowYesOnly(true);
    } else {
      setNoTries(noTries + 1);
      setNoText(noMessages[noTries % noMessages.length]);
    }
  };

  const handleYes = () => {
    onComplete();
  };

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .bq-title { font-size: 1.2rem !important; }
          .bq-btn { font-size: 1rem !important; padding: 0.7rem 1.2rem !important; min-width: 70px !important; }
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
          boxSizing: "border-box",
          maxWidth: "100vw",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <>
          <img
            src="/strawberry.svg"
            alt="strawberry"
            style={{ width: 64, height: 64, marginBottom: 8 }}
          />
          <h2
            className="bq-title"
            style={{
              color: "#e83e3e",
              fontFamily: "sans-serif",
              fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
              marginBottom: 24,
              textAlign: "center",
              maxWidth: 600,
              textShadow: "0 2px 8px #fff6e9",
            }}
          >
            Will you be my Strawberry? 🍓
          </h2>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              className="bq-btn"
              style={{
                padding: "1rem 2.5rem",
                fontSize: "clamp(1rem, 3vw, 1.3rem)",
                background: "#fc3d3d",
                color: "#fff6e9",
                border: "none",
                borderRadius: "2rem",
                boxShadow: "0 4px 16px #e83e3e44",
                cursor: "pointer",
                fontFamily: "sans-serif",
                transition: "background 0.2s",
                minWidth: 100,
                marginBottom: 8,
              }}
              onClick={handleYes}
            >
              Yes
            </button>
            {!showYesOnly && (
              <button
                className="bq-btn"
                style={{
                  padding: "1rem 2.5rem",
                  fontSize: "clamp(1rem, 3vw, 1.3rem)",
                  background: "#fff6e9",
                  color: "#e83e3e",
                  border: "2px solid #fc3d3d",
                  borderRadius: "2rem",
                  boxShadow: "0 4px 16px #e83e3e44",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  transition: "background 0.2s",
                  minWidth: 100,
                  marginBottom: 8,
                }}
                onClick={handleNo}
              >
                {noText}
              </button>
            )}
            {showYesOnly && (
              <button
                className="bq-btn"
                style={{
                  padding: "1rem 2.5rem",
                  fontSize: "clamp(1rem, 3vw, 1.3rem)",
                  background: "#fc3d3d",
                  color: "#fff6e9",
                  border: "none",
                  borderRadius: "2rem",
                  boxShadow: "0 4px 16px #e83e3e44",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  minWidth: 200,
                  fontWeight: 700,
                  marginLeft: 16,
                  marginBottom: 8,
                }}
                onClick={handleYes}
              >
                YES
              </button>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default BigQuestion;
