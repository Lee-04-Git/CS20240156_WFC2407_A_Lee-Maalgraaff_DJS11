// src/components/Favourites.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
    const navigateTo = useNavigate();
  // Dummy favourite podcasts data
  const favouritePodcasts = [
    { id: 1, title: "Tech Talk", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Health Matters", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Daily News", image: "https://via.placeholder.com/150" },
  ];

  return (
    <>
      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigateTo("/")} // Navigate back to home page (DisplayHome)
      >
        <img
          src="src\assets\back_arrow_icon.png"
          alt="Back"
          className="back-icon"
        />
        Back
      </button>
    <div className="favourites-container">
      <h1>My Favourite Podcasts</h1>
      <div className="favourites-list">
        {favouritePodcasts.map((podcast) => (
          <div key={podcast.id} className="favourite-card">
            <img
              src={podcast.image}
              alt={`Podcast ${podcast.title}`}
              className="favourite-thumbnail"
            />
            <h3>{podcast.title}</h3>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Favourites;