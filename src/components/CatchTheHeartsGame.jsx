import React, { useRef, useEffect, useState } from "react";
import BasketImg from "../assets/Basket.png";

const GAME_WIDTH = 360;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 90;
const PLAYER_HEIGHT = 38;
const HEART_SIZE = 32;
const HEART_FALL_SPEED = 3.2; // px per frame (faster for mobile)
const HEART_INTERVAL = 950; // ms
const WIN_SCORE = 10;

function randomX() {
  return Math.random() * (GAME_WIDTH - HEART_SIZE);
}

const CatchTheHeartsGame = ({ onWin }) => {
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef();
  const animationRef = useRef();

  // Move player with arrow keys (desktop)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        setPlayerX((x) => Math.max(0, x - 32));
      } else if (e.key === "ArrowRight") {
        setPlayerX((x) => Math.min(GAME_WIDTH - PLAYER_WIDTH, x + 32));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Touch controls for mobile (drag or tap left/right)
  useEffect(() => {
    const ref = gameRef.current;
    if (!ref) return;
    let dragging = false;

    const handleTouchStart = (e) => {
      dragging = true;
      handleTouchMove(e);
    };
    const handleTouchMove = (e) => {
      if (!dragging || e.touches.length !== 1) return;
      const rect = ref.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      setPlayerX(Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, touchX - PLAYER_WIDTH / 2)));
    };
    const handleTouchEnd = () => {
      dragging = false;
    };
    ref.addEventListener("touchstart", handleTouchStart);
    ref.addEventListener("touchmove", handleTouchMove);
    ref.addEventListener("touchend", handleTouchEnd);
    return () => {
      ref.removeEventListener("touchstart", handleTouchStart);
      ref.removeEventListener("touchmove", handleTouchMove);
      ref.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Heart falling logic
  useEffect(() => {
    if (gameOver) return;
    let running = true;
    function animate() {
      setHearts((prev) =>
        prev
          .map((h) => ({ ...h, y: h.y + HEART_FALL_SPEED }))
          .filter((h) => h.y < GAME_HEIGHT - PLAYER_HEIGHT + 8) // let hearts reach basket
      );
      if (running) animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(animationRef.current);
    };
  }, [gameOver]);

  // Add new hearts
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        { x: randomX(), y: -HEART_SIZE, id: Math.random() },
      ]);
    }, HEART_INTERVAL);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    if (gameOver) return;
    setHearts((prev) => {
      const caught = prev.filter(
        (h) =>
          h.y + HEART_SIZE > GAME_HEIGHT - PLAYER_HEIGHT - 8 &&
          h.y + HEART_SIZE < GAME_HEIGHT + 12 &&
          h.x + HEART_SIZE > playerX &&
          h.x < playerX + PLAYER_WIDTH
      );
      if (caught.length > 0) {
        setScore((s) => s + caught.length);
      }
      return prev.filter(
        (h) =>
          !(
            h.y + HEART_SIZE > GAME_HEIGHT - PLAYER_HEIGHT - 8 &&
            h.y + HEART_SIZE < GAME_HEIGHT + 12 &&
            h.x + HEART_SIZE > playerX &&
            h.x < playerX + PLAYER_WIDTH
          )
      );
    });
  }, [playerX, hearts, gameOver]);

  // Win condition
  useEffect(() => {
    if (score >= WIN_SCORE && !gameOver) {
      setGameOver(true);
    }
  }, [score, gameOver]);

  // After win message, navigate after a delay
  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        if (onWin) onWin();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameOver, onWin]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        background: "#fff6e900",
        overflow: "hidden",
      }}
    >
      <div
        ref={gameRef}
        style={{
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          background: "linear-gradient(180deg, #ffe0ec 0%, #fcf6e9 100%)",
          borderRadius: 0,
          boxShadow: "none",
          margin: 0,
          position: "relative",
          overflow: "hidden",
          touchAction: "none",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        tabIndex={0}
      >
      {/* Hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: `${(h.x / GAME_WIDTH) * 100}%`,
            top: `${(h.y / GAME_HEIGHT) * 100}%`,
            fontSize: `min(8vw, 48px)`,
            pointerEvents: "none",
            filter: "drop-shadow(0 2px 8px #e83e3e55)",
            transition: "top 0.1s",
          }}
        >
          ❤️
        </span>
      ))}
      {/* Player */}
      <div
        style={{
          position: "absolute",
          left: `${(playerX / GAME_WIDTH) * 100}%`,
          top: `${((GAME_HEIGHT - PLAYER_HEIGHT - 8) / GAME_HEIGHT) * 100}%`,
          width: `min(24vw, 120px)`,
          height: `min(10vw, 48px)`,
          background: "transparent",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <img
          src={BasketImg}
          alt="Basket"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            display: "block",
          }}
        />
      </div>
      {/* Score */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 0,
          width: "100%",
          textAlign: "center",
          color: "#fc3d3d",
          fontWeight: 700,
          fontSize: "min(7vw, 32px)",
          letterSpacing: 1,
          textShadow: "0 2px 8px #fff6e9",
        }}
      >
        {gameOver ? "You did it!" : `Hearts caught: ${score} / ${WIN_SCORE}`}
      </div>
      {/* Win message */}
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            transform: "translate(-50%, -50%)",
            background: "#fff6e9ee",
            color: "#fc3d3d",
            borderRadius: 18,
            padding: "0.5rem 1.5rem",
            fontSize: "min(5vw, 18px)",
            fontWeight: 700,
            boxShadow: "0 2px 8px #e83e3e33",
            zIndex: 10,
            textAlign: "left",
            animation: "popIn 0.7s cubic-bezier(.4,2,.6,1)",
          }}
        >
          You caught my heart!<br />
          Now it's yours forever.<br />
          Thank you for playing, my love! 💖
        </div>
      )}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.7) translate(-50%, -50%); opacity: 0; }
          60% { transform: scale(1.15) translate(-50%, -50%); opacity: 1; }
          100% { transform: scale(1) translate(-50%, -50%); opacity: 1; }
        }
      `}</style>
      </div>
    </div>
  );
};

export default CatchTheHeartsGame;
