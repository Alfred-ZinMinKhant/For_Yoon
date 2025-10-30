import React, { useState } from "react";

const QUESTIONS = [
  {
    q: "Would you rather go on a picnic or a fancy dinner with me?",
    a: "Picnic",
    b: "Fancy dinner"
  },
  {
    q: "Would you rather watch a movie at home or go to the cinema together?",
    a: "Movie at home",
    b: "Cinema"
  },
  {
    q: "Would you rather get a cute handwritten letter or a surprise gift?",
    a: "Handwritten letter",
    b: "Surprise gift"
  },
  {
    q: "Would you rather travel to the beach or the mountains with me?",
    a: "Beach",
    b: "Mountains"
  },
  {
    q: "Would you rather have a day full of silly jokes or deep conversations?",
    a: "Silly jokes",
    b: "Deep conversations"
  },
  {
    q: "Would you rather take cute selfies together or record funny videos?",
    a: "Cute selfies",
    b: "Funny videos"
  },
  {
    q: "Would you rather have a surprise date planned by me or plan one together?",
    a: "Surprise me!",
    b: "Let's plan together"
  },
  {
    q: "Would you rather get a good morning text or a good night call?",
    a: "Good morning text",
    b: "Good night call"
  },
  {
    q: "Would you rather dance in the rain or stargaze at night with me?",
    a: "Dance in the rain",
    b: "Stargaze at night"
  },
  {
    q: "Would you rather share a dessert or have your own?",
    a: "Share!",
    b: "All mine 😋"
  },
  {
    q: "Would you rather go on a spontaneous adventure or have a cozy day in?",
    a: "Adventure!",
    b: "Cozy day in"
  },
  {
    q: "Would you rather get a bouquet of flowers or a playlist made just for you?",
    a: "Bouquet of flowers",
    b: "Personal playlist"
  }
];

const WouldYouRatherGame = ({ onComplete, name }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [formSent, setFormSent] = useState(false);

  const handleAnswer = (choice) => {
    setAnswers([...answers, choice]);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      if (onComplete) onComplete(answers.concat(choice));
    }
  };

  // Netlify form submission handler
  const handleSubmit = (e) => {
    setFormSent(true);
  };

  if (step >= QUESTIONS.length) {
    return (
      <div
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
        }}
      >
        <h2 style={{ color: "#fc3d3d", fontFamily: 'Pacifico, cursive', fontSize: "2.2rem", marginBottom: 16 }}>
          Thanks for playing!
        </h2>
        <p style={{ color: "#333", fontSize: "1.2rem", marginBottom: 24, lineHeight: 1.7 }}>
          Here are your choices:
        </p>
        <ul style={{ textAlign: "left", color: "#fc3d3d", fontWeight: 600, fontSize: "1.1rem" }}>
          {QUESTIONS.map((q, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              <span style={{ color: "#333" }}>{q.q}</span><br />
              <span style={{ color: "#fc3d3d" }}>→ {answers[i]}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 24, color: "#e83e3e", fontWeight: 700, fontSize: "1.2rem" }}>
          No matter what you choose, I just want to make you happy!
        </div>
        {!formSent ? (
          <form
            name="would-you-rather"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}
          >
            <input type="hidden" name="form-name" value="would-you-rather" />
            <input type="hidden" name="name" value={name || ""} />
            {QUESTIONS.map((q, i) => (
              <input
                key={i}
                type="hidden"
                name={`q${i + 1}`}
                value={answers[i] || ""}
              />
            ))}
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
              Send to Zin
            </button>
            <div style={{ fontSize: "0.95rem", color: "#888", marginTop: 4 }}>
              (Your answers will be sent securely!)
            </div>
          </form>
        ) : (
          <div style={{ marginTop: 24, color: "#2e7d32", fontWeight: 600 }}>
            Your answers have been sent! Thank you 💌
          </div>
        )}
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div
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
      }}
    >
      <h2 style={{ color: "#fc3d3d", fontFamily: 'Pacifico, cursive', fontSize: "2.2rem", marginBottom: 16 }}>
        Would You Rather?
      </h2>
      <p style={{ color: "#333", fontSize: "1.2rem", marginBottom: 24, lineHeight: 1.7 }}>
        {q.q}
      </p>
      <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
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
          }}
          onClick={() => handleAnswer(q.a)}
        >
          {q.a}
        </button>
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
          }}
          onClick={() => handleAnswer(q.b)}
        >
          {q.b}
        </button>
      </div>
      <div style={{ marginTop: 32, color: "#e83e3e", fontWeight: 500, fontSize: "1rem" }}>
        Question {step + 1} of {QUESTIONS.length}
      </div>
    </div>
  );
};

export default WouldYouRatherGame;
