import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PodcastDetails.css";

const DisplayPodcastDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const audioRef = useRef(null);
  const [podcastFileUrl, setPodcastFileUrl] = useState(null);
  const [podcastDataDetails, setPodcastDataDetails] = useState(null);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchPodcastDataDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        const data = await response.json();
        setPodcastDataDetails(data);
      } catch (error) {
        console.error("Error fetching podcast data details:", error);
      }
    };

    fetchPodcastDataDetails();
  }, []);

  if (!podcastDataDetails) {
    return <div>Loading...</div>;
  }

  const handleSeasonChange = (event) => {
    setSelectedSeasonIndex(Number(event.target.value));
  };

  const playAudio = (fileUrl) => {
    console.log("fileUrl: ", fileUrl);
    setPodcastFileUrl(fileUrl);
    audioRef.current.play();
  };

  const pauseAudio = () => {
    // audioRef.current.pause();
    setPodcastFileUrl();
  };

  return (
    <div className="details-container">
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

      <div className="podcast-header">
        <img className="podcast-image" src={podcastDataDetails.image} alt={podcastDataDetails.title} />
        <div className="podcast-details">
          <p className="podcast-label">Podcast</p>
          <h2 className="podcast-title">{podcastDataDetails.title}</h2>
          <h4 className="podcast-description">
            {podcastDataDetails.description}
          </h4>
          <p className="podcast-meta">
            <b>Platform</b> - <b>{podcastDataDetails.seasons.length} seasons</b>
          </p>
        </div>
      </div>

      <div className="podcast-grid-header">
        <p>
          <b className="grid-index">#</b> Title
        </p>
        <p>Season</p>
        <p className="grid-date">Episodes</p>
      </div>
      <hr />

{/* Season Dropdown */}
<div className="season-dropdown">
  <label htmlFor="season-select">Select Season:</label>
  <select
    id="season-select"
    value={selectedSeasonIndex}
    onChange={handleSeasonChange}
  >
    {podcastDataDetails.seasons.map((season, index) => (
      <option key={index} value={index}>
        {season.title}
      </option>
    ))}
  </select>
</div>

{/* Render selected season's episodes */}
<div key={selectedSeasonIndex}>
  <h3>{podcastDataDetails.seasons[selectedSeasonIndex].title}</h3>
  <div className="episode-list">
    {podcastDataDetails.seasons[selectedSeasonIndex].episodes.map(
      (episode, episodeIndex) => {
        // Get the season and episode numbers
        const seasonNumber = String(selectedSeasonIndex + 1).padStart(2, '0');
        const episodeNumber = String(episodeIndex + 1).padStart(2, '0');

        return (
          <div key={episodeIndex} className="episode" onClick={() => playAudio(episode.file)}>
            <p className="episode-title">
              <b className="episode-index">S{seasonNumber}E{episodeNumber}</b>
              {episode.title}
            </p>
            <p className="episode-file">File: {episode.file}</p> {/* This will be hidden */}
            
            {/* Add Button */}
            <button 
              className="add-episode-button" >
              Add to favourites
            </button>
          </div>
        );
      }
    )}
  </div>
</div>

      <div className="audio-footer">
        <audio ref={audioRef} src={podcastFileUrl} controls>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default DisplayPodcastDetails;