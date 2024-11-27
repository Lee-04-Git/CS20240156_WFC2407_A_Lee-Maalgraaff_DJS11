import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PodcastDetails.css";

const DisplayPodcastDetails = () => {

    const { id } = useParams();
    const navigateTo = useNavigate();

    const [podcastDataDetails, setPodcastDataDetails] = useState(null);
    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

    // Fetch data when the component mounts
    useEffect(() => {
    const fetchPodcastDataDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
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

  return (
    <>

      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigateTo("/")} // Navigate back to home page (DisplayHome)
      >
        <img src="src\assets\back_arrow_icon.png" alt="Back" className="back-icon" />
        Back
      </button>

      <div className="podcast-header">
        {/* <img className="podcast-image" src={podcastDataDetails.image} alt={podcastDataDetails.title} /> */}
        <div className="podcast-details">
          <p className="podcast-label">Podcast</p>
          <h2 className="podcast-title">{podcastDataDetails.title}</h2>
          <h4 className="podcast-description">{podcastDataDetails.description}</h4>
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
          {podcastDataDetails.seasons[selectedSeasonIndex].episodes.map((episode, episodeIndex) => (
            <div key={episodeIndex}>
              <p className="episode-title">
                <b className="episode-index">{episodeIndex + 1}</b>
                {episode.title}
              </p>
              <p className="episode-file">File: {episode.file}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );  
}

export default DisplayPodcastDetails;