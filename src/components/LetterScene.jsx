import React, { useEffect, useState, useRef } from "react";

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
  const timersRef = useRef([]);

  useEffect(() => {
    // Cleanup timers on unmount or before next effect
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
    if (currentLine >= letterLines.length) return;
    setTyped("");
    if (currentLine === 0) {
      // First, type 'Yoon' letter by letter
      const name = "Yoon";
      let nameIdx = 0;
      let restIdx = 0;
      const typeName = () => {
        setTyped(name.slice(0, nameIdx + 1));
        if (nameIdx < name.length - 1) {
          nameIdx++;
          timersRef.current.push(setTimeout(typeName, 180));
        } else {
          timersRef.current.push(setTimeout(typeRest, 600)); // pause after 'Yoon'
        }
      };
      const typeRest = () => {
        setTyped(
          name + letterLines[0].slice(name.length, name.length + restIdx + 1)
        );
        if (restIdx < letterLines[0].length - name.length - 1) {
          restIdx++;
          timersRef.current.push(setTimeout(typeRest, 32));
        } else {
          timersRef.current.push(
            setTimeout(() => {
              setDisplayedLines((prev) => [...prev, letterLines[0]]);
              setCurrentLine((prev) => prev + 1);
            }, 500)
          );
        }
      };
      typeName();
    } else {
      let charIdx = 0;
      const typeChar = () => {
        setTyped(letterLines[currentLine].slice(0, charIdx + 1));
        if (charIdx < letterLines[currentLine].length - 1) {
          charIdx++;
          timersRef.current.push(setTimeout(typeChar, 32));
        } else {
          timersRef.current.push(
            setTimeout(() => {
              setDisplayedLines((prev) => [...prev, letterLines[currentLine]]);
              setCurrentLine((prev) => prev + 1);
            }, 500)
          );
        }
      };
      typeChar();
    }
    // Cleanup timers if currentLine changes
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
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
        padding: "4vw 2vw",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#fff6e9",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 24px #e83e3e22",
          padding: "2.2rem 1.5rem",
          maxWidth: "95vw",
          width: "100%",
          margin: "0 auto",
          color: "#e83e3e",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          fontFamily: "sans-serif",
          lineHeight: 1.7,
          textAlign: "left",
          boxSizing: "border-box",
          overflowWrap: "break-word",
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
