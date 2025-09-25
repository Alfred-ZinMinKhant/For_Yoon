import React, { useEffect, useState } from "react";

const letterLines = [
  "Yoon sin sar pho time ma pay nai tay poo so tar ll ako nar ll par tl",
  "Ba lout kyar kyar ako wait pay mal",
  "Yoon a nar mar d lo shi nay ya tar koh ka pyor nay p",
  "Yoon nae weekend tine video call tar koh ll sate htae ka amyel auto wait nay tl",
  "Yoon school twar kan nee photo lay tway send tar koh ll amyel wait nay mi tl",
  "Ako atwat pyor shwin chin ka Yoon nae a myarr gyi sine lar tl",
  "Yoon message send yin koh pyor tat lar tl",
  "I love you a lot and Wish you the happiness birthday",
  "I pray that starting from today, Yoon life become better and all your prayers and wishes got answered.",
];

export default function LetterScene() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (currentLine >= letterLines.length) return;
    let charIdx = 0;
    setTyped("");
    const typeChar = () => {
      if (charIdx < letterLines[currentLine].length) {
        setTyped((prev) => prev + letterLines[currentLine][charIdx]);
        charIdx++;
        setTimeout(typeChar, 35); // typing speed
      } else {
        setTimeout(() => {
          setDisplayedLines((prev) => [...prev, letterLines[currentLine]]);
          setCurrentLine((prev) => prev + 1);
        }, 400); // pause before next line
      }
    };
    typeChar();
    // eslint-disable-next-line
  }, [currentLine]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #ffe0ec 0%, #fcf6e9 60%, #c2e9fb 100%)",
        padding: "2vw",
      }}
    >
      <div
        style={{
          background: "#fff6e9",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 24px #e83e3e22",
          padding: "2.2rem 1.5rem",
          maxWidth: 500,
          width: "100%",
          margin: "0 auto",
          color: "#e83e3e",
          fontSize: "1.15rem",
          fontFamily: "sans-serif",
          lineHeight: 1.7,
          textAlign: "left",
        }}
      >
        <h2
          style={{
            color: "#fc3d3d",
            fontFamily: "cursive",
            marginBottom: 18,
            textAlign: "center",
          }}
        >
          A Letter for Yoon
        </h2>
        {displayedLines.map((line, idx) => (
          <p key={idx} style={{ margin: "0 0 10px 0" }}>
            {line}
          </p>
        ))}
        {currentLine < letterLines.length && (
          <p style={{ margin: "0 0 10px 0" }}>
            {typed}
            <span style={{ opacity: 0.5 }}>|</span>
          </p>
        )}
        {currentLine === letterLines.length && (
          <div
            style={{
              marginTop: 40,
              textAlign: "center",
              fontSize: "2rem",
              color: "#fc3d3d",
              fontFamily: "Pacifico, cursive",
              textShadow: "0 4px 24px #fff6e9, 0 2px 8px #fc3d3d55",
              letterSpacing: 2,
              fontWeight: 700,
            }}
          >
            🎂 Happy Birthday,Yoon!🍓
          </div>
        )}
      </div>
    </div>
  );
}
