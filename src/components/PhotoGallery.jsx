import React, { useState } from "react";
import "../styles/gallery.css";

import photo1 from "../assets/her.webp";
import photo2 from "../assets/her.webp";

const photos = [
  { src: photo1, caption: "Your beautiful smile" },
  { src: photo2, caption: "That silly face!" },
  { src: photo1, caption: "Your beautiful smile" },
  { src: photo2, caption: "That silly face!" },
  { src: photo1, caption: "Your beautiful smile" },
  { src: photo2, caption: "That silly face!" },
  { src: photo1, caption: "Your beautiful smile" },
  { src: photo2, caption: "That silly face!" },
];

function GalleryItem({ src, caption }) {
  const [showCaption, setShowCaption] = useState(false);
  return (
    <div
      className="gallery-item animated"
      tabIndex={0}
      onClick={() => setShowCaption((v) => !v)}
      onBlur={() => setShowCaption(false)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") setShowCaption((v) => !v);
      }}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <img src={src} alt={caption || "Photo"} />
      <div
        className={`gallery-tooltip${showCaption ? " show" : ""}`}
        aria-hidden={!showCaption}
      >
        {caption}
      </div>
    </div>
  );
}

const PhotoGallery = () => (
  <div className="gallery-container">
    <h2>Our Memories</h2>
    <div className="gallery-grid">
      {photos.length === 0 ? (
        <div className="gallery-placeholder">Add your favorite photos here!</div>
      ) : (
        photos.map((p, i) => (
          <GalleryItem key={i} src={p.src} caption={p.caption} />
        ))
      )}
    </div>
  </div>
);

export default PhotoGallery;
