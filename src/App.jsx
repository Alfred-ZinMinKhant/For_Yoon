import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingScene from "./scenes/LandingScene";
import Confession from "./components/Confession";
import WouldYouRatherGame from "./components/WouldYouRatherGame";
import CatchTheHeartsGame from "./components/CatchTheHeartsGame";
import PhotoGallery from "./components/PhotoGallery";

function App() {
  const [name, setName] = useState("");
  const [confessionAnswered, setConfessionAnswered] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingScene
            onNameSubmit={(userName) => {
              setName(userName);
              navigate("/confession");
            }}
          />
        }
      />
      <Route
        path="/confession"
        element={
          <Confession
            name={name}
            onAnswer={(answer) => {
              setConfessionAnswered(answer);
              navigate("/would-you-rather");
            }}
          />
        }
      />
      <Route
        path="/would-you-rather"
        element={
          <WouldYouRatherGame
            name={name}
            onComplete={() => navigate("/catch-the-hearts")}
          />
        }
      />
      <Route
        path="/catch-the-hearts"
        element={<CatchTheHeartsGame onWin={() => alert("You caught my heart! 💖")}/>} 
      />
      <Route
        path="/gallery"
        element={<PhotoGallery />}
      />
    </Routes>
  );
}

export default App;
