import React, { useState } from "react";
import WouldYouRatherGame from "../components/WouldYouRatherGame";

// Scene steps: 'landing', 'why-date', 'best-person', 'big-question', 'love-letter'
const LandingScene = ({ onNameSubmit }) => {
  // Name entry state
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");

  // You can uncomment and reuse the fullscreen logic if needed
  // const [isFullscreen, setIsFullscreen] = useState(false);
  // const mainRef = React.useRef();

  return (
    <div
      // ref={mainRef}
      style={{
        width: "100vw",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ffe0ec 0%, #fcf6e9 60%, #c2e9fb 100%)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Commented out: Birthday and game content */}
      {/* ...existing code for games and birthday... */}

  {!submitted ? (
        <div style={{
          background: "#fff6e9cc",
          padding: "2.5rem 2.5rem 2rem 2.5rem",
          borderRadius: "2.5rem",
          boxShadow: "0 4px 32px #e83e3e22",
          textAlign: "center",
          maxWidth: 400,
        }}>
          <h2 style={{ color: "#fc3d3d", fontFamily: 'Pacifico, cursive', fontSize: "2.2rem", marginBottom: 16 }}>
            Before we continue...
          </h2>
          <p style={{ color: "#333", fontSize: "1.1rem", marginBottom: 12 }}>
            Please enter your name:
          </p>
          <div style={{ color: "#e83e3e", fontSize: "1rem", marginBottom: 8 }}>
            (Hint: Your name must include <b>Yoon</b> 😉)
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!/yoon/i.test(name)) {
                setNameError("Your name must include 'Yoon'!");
                return;
              }
              setNameError("");
              setSubmitted(true);
              if (onNameSubmit) onNameSubmit(name);
            }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <input
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
                setNameError("");
              }}
              placeholder="Your name..."
              style={{
                padding: "0.8rem 1.2rem",
                borderRadius: "1.2rem",
                border: "1.5px solid #fc3d3d",
                fontSize: "1.1rem",
                outline: "none",
                marginBottom: 8,
              }}
              required
            />
            {nameError && (
              <div style={{ color: "#e83e3e", fontSize: "1rem", marginBottom: -8 }}>
                {nameError}
              </div>
            )}
            <button
              type="submit"
              style={{
                background: "#fc3d3d",
                color: "#fff6e9",
                border: "none",
                borderRadius: "1.2rem",
                padding: "0.8rem 1.5rem",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 8px #e83e3e33",
                marginTop: 8,
              }}
            >
              Continue
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default LandingScene;
