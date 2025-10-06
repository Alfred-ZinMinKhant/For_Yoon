import React, { useEffect, useState } from "react";
import "../styles/loveletter.css";

const poem = [
  [
    "I know we haven’t known each other for long,",
    "but every time I see you post a new photo or video,",
    "I discover fresh and beautiful emotions,",
    "unique in every single moment.",
  ],
  [
    "Your beauty, your charm,",
    "the sweetness of your smile,",
    "makes my heart skip a beat,",
    "and calms the storm within me.",
  ],
  [
    "You are the best thing that happened to me this year,",
    "you inspire me to become a better version of myself.",
    "You’ve made me believe in love again,",
    "and I promise to love you more each day.",
  ],
  [
    "I want to hear your voice every night before I sleep,",
    "I want to see your smile,",
    "I wait for weekends just to see your face and share a video call,",
    "I love the way you talk, the way you smile, and the way you laugh.",
  ],
  [
    "I have fallen deeply in love with you,",
    "and I hope you feel the same way too.",
  ],
];

function LoveLetter({ onShowLetter }) {
  const [showBigTitle, setShowBigTitle] = useState(false);
  const [sceneOut, setSceneOut] = useState(false);

  // Animation for scene
  useEffect(() => {
    setTimeout(() => {
      const estrofes = document.querySelectorAll(".estrofe");
      const ground = document.querySelector(".ground");
      const heads = document.querySelectorAll(".head");
      const heart = document.querySelector(".heart");
      const minihearts = document.querySelector(".minihearts");
      const sky = document.querySelector(".sky");
      const stars = document.querySelectorAll(".star");
      const us = document.querySelector(".us");

      ground.classList.add("animate");
      heart.classList.add("animate");
      minihearts.classList.add("animate");
      sky.classList.add("animate");
      us.classList.add("animate");
      heads.forEach((head) => head.classList.add("animate"));
      estrofes.forEach((estrofe) => estrofe.classList.add("animate"));
      stars.forEach((star) => star.classList.add("animate"));
    }, 0);

    // On mobile, after 3.5s, animate scene out, then show poem only after animation ends
    if (window.innerWidth <= 600) {
      // After heart/us reach the top (5s after 4s delay = 9s), fade them out
      setTimeout(() => {
        const heart = document.querySelector(".heart");
        const us = document.querySelector(".us");
        if (heart) heart.classList.add("fade-out");
        if (us) us.classList.add("fade-out");
      }, 9000);
      // Only show poem after fade-out animation is done (9s + 0.7s = 9700ms)
      setTimeout(() => setSceneOut(true), 9700);
    }
  }, []);

  // Show only two paragraphs at a time
  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    if (showBigTitle) return;
    if (currentIdx < poem.length - 1) {
      const timer = setTimeout(() => setCurrentIdx((idx) => idx + 1), 16000); // 16 seconds per paragraph
      return () => clearTimeout(timer);
    } else {
      // Show big title after last paragraph
      const timer = setTimeout(() => setShowBigTitle(true), 16000); // 16 seconds for last paragraph
      return () => clearTimeout(timer);
    }
  }, [currentIdx, showBigTitle]);

  // Generate stars for the sky (balloons/stars effect)
  const skyStars = Array.from({ length: 40 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      position: "absolute",
      background: "#fff",
      borderRadius: "50%",
      opacity: Math.random() * 0.5 + 0.5,
      filter: "blur(0.5px)",
    };
    return <li className="star" key={i} style={style}></li>;
  });

  return (
    <div className="ground">
      <ul className="sky">{skyStars}</ul>
      <div className="heart"></div>
      <div className="us">
        <ul className="minihearts">
          <li className="miniheart"></li>
          <li className="miniheart"></li>
          <li className="miniheart"></li>
          <li className="miniheart"></li>
        </ul>
        <div className="me">
          <div className="head">
            <div className="hair"></div>
          </div>
          <div className="arm__left"></div>
          <div className="arm__right"></div>
          <div className="body"></div>
          <div className="leg__left"></div>
          <div className="leg__right"></div>
        </div>
        <div className="you">
          <div className="head">
            <div className="hair"></div>
          </div>
          <div className="arm__left"></div>
          <div className="arm__right"></div>
          <div className="body">
            <div className="dress"></div>
          </div>
          <div className="leg__left"></div>
          <div className="leg__right"></div>
        </div>
      </div>
      {!showBigTitle &&
        // On mobile, only show poem after sceneOut; on desktop, show as before
        (window.innerWidth > 600 || sceneOut) && (
          <div className="poem">
            <h1 className="title">I love you, Yoon</h1>
            <div className="estrofe fade-in" key={currentIdx}>
              {poem[currentIdx].map((verse, j) => (
                <p className="verse" key={j}>
                  {verse}
                </p>
              ))}
            </div>
          </div>
        )}
      {showBigTitle && (
        <div
          className="poem poem-big-title"
          style={{ textAlign: "center", position: "relative" }}
        >
          <h1 className="title big">I love you, Yoon</h1>
          <div
            style={{
              marginTop: 32,
              fontSize: "1.5rem",
              color: "#fc3d3d",
              fontFamily: "cursive",
              textShadow: "0 2px 8px #fff6e9",
            }}
          >
            Did you like your birthday present?
          </div>
          <div
            style={{
              position: "relative",
              height: 60,
              marginTop: 24,
              width: 350,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          >
            <button
              className="loveletter-btn"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                padding: "1.1rem 2.8rem",
                fontSize: "1.2rem",
                background: "#fc3d3d",
                color: "#fff6e9",
                border: "none",
                borderRadius: "2rem",
                boxShadow: "0 4px 16px #e83e3e44",
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontWeight: 700,
                transition: "background 0.2s",
                letterSpacing: 1,
                maxWidth: "90vw",
                whiteSpace: "nowrap",
                zIndex: 2,
              }}
              onClick={onShowLetter}
            >
              Yes, I love it! 💖
            </button>
            <NoButton onYes={onShowLetter} />
          </div>
        </div>
      )}
    </div>
  );

  function NoButton({ onYes }) {
    const [pos, setPos] = React.useState({ top: 100, left: 0 });
    const [clicks, setClicks] = React.useState(0);
    const [hide, setHide] = React.useState(false);
    const buttonRef = React.useRef();

    // Button text changes for fun
    const texts = [
      "No",
      "Are you sure?",
      "Really?",
      "Think again!",
      "Last chance!",
      "You can't say no!",
      "Okay, just kidding! 💖",
    ];
    const text = texts[Math.min(clicks, texts.length - 1)];

    // Move to a random position within the parent container, but never overlap the Yes button (left: 0, top: 0, width: 180)
    const moveButton = () => {
      const parent = buttonRef.current?.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const btnRect = buttonRef.current.getBoundingClientRect();
      // Yes button is at left: 0, width: 180px, height: 60px
      const yesWidth = 180;
      const yesHeight = 60;
      const minTop = 80; // minimum top for No button
      const padding = 10;
      const maxLeft = parentRect.width - btnRect.width;
      const maxTop = parentRect.height - btnRect.height;
      let left, top;
      let tries = 0;
      do {
        left = Math.random() * (maxLeft + 1);
        // Bias top to move further down on each try
        const bias = tries / 10;
        const range = maxTop - minTop + 1;
        top = Math.random() * range * (1 - bias) + minTop + range * bias;
        if (top > maxTop) top = maxTop;
        // Check for overlap with Yes button (left: 0, top: 0, width: yesWidth, height: yesHeight)
        const overlapsYes =
          left < yesWidth + padding &&
          top < yesHeight + padding &&
          left + btnRect.width > 0 &&
          top + btnRect.height > 0;
        // Check for out of bounds
        const outOfBounds =
          left < 0 ||
          top < minTop ||
          left + btnRect.width > parentRect.width ||
          top + btnRect.height > parentRect.height;
        if (!overlapsYes && !outOfBounds) break;
        tries++;
      } while (tries < 10);
      // Clamp to bounds just in case
      left = Math.max(0, Math.min(left, maxLeft));
      top = Math.max(minTop, Math.min(top, maxTop));
      setPos({ top, left });
    };

    // Move on hover or click, unless last text
    const handleMouseEnter = () => {
      if (clicks < texts.length - 1) moveButton();
    };
    const handleClick = () => {
      if (clicks < texts.length - 1) {
        setClicks((c) => c + 1);
        moveButton();
      } else {
        setHide(true);
        if (onYes) onYes();
      }
    };

    if (hide) return null;

    return (
      <button
        ref={buttonRef}
        className="loveletter-btn no-btn"
        style={{
          position: "absolute",
          top: pos.top,
          left: pos.left,
          background: "#fff6e9",
          color: "#fc3d3d",
          border: "2px solid #fc3d3d",
          fontWeight: 700,
          transition: "top 0.3s, left 0.3s, background 0.2s, color 0.2s",
          zIndex: 10,
          padding: "1.1rem 2.8rem",
          borderRadius: "2rem",
          cursor: "pointer",
          fontFamily: "sans-serif",
          fontSize: "1.2rem",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {text}
      </button>
    );
  }
}

export default LoveLetter;
