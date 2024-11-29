import React from "react";
import { useNavigate } from "react-router-dom";
import "./Favourites.css";

const Favourites = ({ episode }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="favourites-container">
      {/* Back to Home Button (Only one occurrence here) */}
      <button onClick={() => navigate("/")} className="back-to-home-button">
        Back to Home
      </button>

      {episode ? (
        <div className="favourite-item">
          <h3>Title: {episode.title}</h3>
          <p>Description: {episode.description}</p>
          <p>Episode: {episode.episode}</p>
          <audio controls>
            <source src={episode.file} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <p>No episode selected.</p>
      )}
    </div>
  );
};

export default Favourites;