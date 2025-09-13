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

function LoveLetter() {
  const [showBigTitle, setShowBigTitle] = useState(false);
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
  }, []);

  // Show only two paragraphs at a time
  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    if (showBigTitle) return;
    if (currentIdx < poem.length - 1) {
      const timer = setTimeout(() => setCurrentIdx((idx) => idx + 1), 6000);
      return () => clearTimeout(timer);
    } else {
      // Show big title after last paragraph
      const timer = setTimeout(() => setShowBigTitle(true), 6000);
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
      {!showBigTitle && (
        <div className="poem">
          <h1 className="title">I love you, Yoon</h1>
          {poem.map((estrofe, i) => {
            // Always show the current paragraph, and the previous one if fading out
            if (i === currentIdx) {
              return (
                <div className={"estrofe fade-in"} key={i}>
                  {estrofe.map((verse, j) => (
                    <p className="verse" key={j}>
                      {verse}
                    </p>
                  ))}
                </div>
              );
            } else if (i === currentIdx - 1) {
              return (
                <div className={"estrofe fade-out"} key={i}>
                  {estrofe.map((verse, j) => (
                    <p className="verse" key={j}>
                      {verse}
                    </p>
                  ))}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
      {showBigTitle && (
        <div className="poem poem-big-title" style={{ textAlign: "center" }}>
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
          <button
            className="loveletter-btn"
            style={{
              marginTop: 24,
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
              alignSelf: "center",
            }}
            onClick={() => alert("Yay! Happy Birthday! 🎂🎉")}
          >
            Yes, I love it! 💖
          </button>
        </div>
      )}
    </div>
  );
}

export default LoveLetter;
