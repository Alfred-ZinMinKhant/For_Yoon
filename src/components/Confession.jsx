import React, { useRef, useState, useEffect } from "react";

const Confession = ({ name, onAnswer }) => {
  // Playful No button state
  // Start No button next to Yes button (left: 140px, top: 0)
  const [noBtnPos, setNoBtnPos] = useState({ top: 15, left: 250 });
  const [hoverCount, setHoverCount] = useState(0);
  const containerRef = useRef(null);

  // Move the No button to a random position within the container
  const moveNoButton = () => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    // Button size ~120x48
    const maxLeft = width - 140;
    const maxTop = height - 70;
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    setNoBtnPos({ top, left });
    setHoverCount(h => h + 1);
  };

  // Typewriter effect for the confession message
  const confessionText = `Yoon ako koh tay char pyan sin sar kine htar tar koh ako tay char think kyi tot I really want to be with you and continue to be in your life. I love you and I don't want to lose you. Yoon bawa htae mar shi chin tl. Yoon face lay koh outside mar ma myin ya pay mae, Yoon everyday photo send pay tar yal weekends kya videos call tar tway nae tin pyor nay p. Fik nai yin outside mar twae chin tl. Yoon nae shote twar p mote tway tu tu sar chin tl. Yoon koh a kyarrrr gyi chit twar chin tl.\nI love you a lot.`;
  const [typedText, setTypedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(confessionText.slice(0, i + 1));
      i++;
      if (i >= confessionText.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  // Floating hearts animation
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 90 + 5,
          size: Math.random() * 18 + 18,
          duration: Math.random() * 2 + 3,
        },
      ].slice(-12));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: "#fff6e9cc",
        padding: "2.5rem 2.5rem 2rem 2.5rem",
        borderRadius: "2.5rem",
        boxShadow: "0 4px 32px #e83e3e22",
        textAlign: "center",
        maxWidth: 350,
        width: "90vw",
        minWidth: 0,
        margin: "0 auto",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "hidden",
      }}
    >
      {/* Floating hearts */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {hearts.map((h) => (
          <span
            key={h.id}
            style={{
              position: "absolute",
              left: `${h.left}%`,
              bottom: 0,
              fontSize: h.size,
              opacity: 0.7,
              animation: `floatUp ${h.duration}s linear forwards`,
              filter: "drop-shadow(0 2px 8px #e83e3e55)",
              userSelect: "none",
            }}
          >
            ❤️
          </span>
        ))}
        <style>{`
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            80% { opacity: 1; }
            100% { transform: translateY(-420px) scale(1.2); opacity: 0; }
          }
        `}</style>
      </div>
      <h2
        style={{
          color: "#fc3d3d",
          fontFamily: 'Pacifico, cursive',
          fontSize: "2.2rem",
          marginBottom: 16,
          wordBreak: "break-word",
          textAlign: "left",
          width: "100%",
          marginLeft: 0,
        }}
      >
        {`To ${name || "Yoon"},`}
      </h2>
         
      <p style={{ color: "#333", fontSize: "1.2rem", textAlign:'left', marginBottom: 24, lineHeight: 1.7, minHeight: 180, whiteSpace: "pre-line", zIndex: 1 }}>
        {typedText}
        {typedText.length === confessionText.length && (
          <>
            <br /><br />
            <span style={{ color: "#e83e3e", fontWeight: 600, fontSize: "1.3rem", textShadow: "0 2px 8px #fff6e9" }}>
              Will you be my girlfriend?
              <span style={{ marginLeft: 8, fontSize: "1.5rem" }}>💖</span>
            </span>
          </>
        )}
      </p>
  <div style={{ position: "relative", width: 320, minHeight: 80, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button
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
            zIndex: 2,
          }}
          onClick={() => onAnswer && onAnswer("yes")}
        >
          Yes
        </button>
        <button
          style={{
            background: "#fff6e9",
            color: "#fc3d3d",
            border: "1.5px solid #fc3d3d",
            borderRadius: "1.2rem",
            padding: "0.8rem 1.5rem",
            fontSize: "1.1rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px #e83e3e22",
            position: "absolute",
            left: noBtnPos.left,
            top: noBtnPos.top,
            zIndex: 1,
            transition: "left 0.2s, top 0.2s",
            pointerEvents: hoverCount > 0 ? "auto" : "auto",
          }}
          tabIndex={-1}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
        >
          No
        </button>
      </div>
      {hoverCount > 0 && (
        <div style={{ color: "#e83e3e", marginTop: 12, fontWeight: 500 }}>
          Oops! You can't say No 😜
        </div>
      )}
    </div>
  );
};

export default Confession;
