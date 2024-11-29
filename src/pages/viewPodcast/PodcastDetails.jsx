import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddToFavourites from "../../components/AddToFavourites";
import "./PodcastDetails.css";

const DisplayPodcastDetails = () => {
  const { id } = useParams(); // Get the podcast ID from the URL parameters
  const navigateTo = useNavigate(); // For navigation between routes
  const audioRef = useRef(null); // Reference for controlling the audio element

  const [podcastFileUrl, setPodcastFileUrl] = useState(null); // URL of the selected audio file
  const [podcastDataDetails, setPodcastDataDetails] = useState(null); // Podcast details fetched from the API
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0); // Index of the currently selected season
  const [favourites, setFavourites] = useState(() => {
    // Retrieve saved favourites from local storage
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  // Fetch podcast details when the component mounts or the podcast ID changes
  useEffect(() => {
    const fetchPodcastDataDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        const data = await response.json();
        console.log("podcastdetails", data); // Debugging: Log fetched podcast details
        setPodcastDataDetails(data);
      } catch (error) {
        console.error("Error fetching podcast data details:", error);
      }
    };

    fetchPodcastDataDetails();
  }, [id]);

  // Save favourites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Handle season selection change
  const handleSeasonChange = (event) => {
    setSelectedSeasonIndex(Number(event.target.value));
  };

  // Play the selected episode audio
  const playAudio = (fileUrl) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPodcastFileUrl(fileUrl);
  };

  // Pause the audio playback
  const pauseAudio = () => {
    setPodcastFileUrl();
  };

  // Add an episode to the favourites list
  const handleAddToFavourites = (episode) => {
    const isAlreadyFavourite = favourites.some(
      (fav) => fav.title === episode.title
    );

    if (!isAlreadyFavourite) {
      const updatedFavourites = [...favourites, episode];
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
    console.log(favourites); // Debugging: Log updated favourites
  };

  // Format the "last updated" date
  const formatUpdatedDate = (updatedDate) => {
    const date = new Date(updatedDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Show a loading message until podcast data is fetched
  if (!podcastDataDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      {/* Back button to navigate to the home page */}
      <button className="back-button" onClick={() => navigateTo("/")}>
        Back
      </button>

      {/* Podcast header details */}
      <div className="podcast-header">
        <img
          className="podcast-image"
          src={podcastDataDetails.image}
          alt={podcastDataDetails.title}
        />
        <div className="podcast-details">
          <p className="podcast-label">Podcast</p>
          <h2 className="podcast-title">{podcastDataDetails.title}</h2>
          <h4 className="podcast-description">
            {podcastDataDetails.description}
          </h4>
          <p className="podcast-meta">
            <b>Platform</b> - <b>{podcastDataDetails.seasons.length} seasons</b>
          </p>
          <p className="podcast-meta">
            <b>Last Updated</b> -{" "}
            {formatUpdatedDate(podcastDataDetails.updated)}
          </p>
        </div>
      </div>

      {/* Season dropdown selector */}
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

      {/* Display episodes for the selected season */}
      <div key={selectedSeasonIndex}>
        <h3>{podcastDataDetails.seasons[selectedSeasonIndex].title}</h3>
        <div className="episode-list">
          {podcastDataDetails.seasons[selectedSeasonIndex].episodes.map(
            (episode, episodeIndex) => {
              const seasonNumber = String(selectedSeasonIndex + 1).padStart(
                2,
                "0"
              );
              const episodeNumber = String(episodeIndex + 1).padStart(2, "0");

              return (
                <div key={episodeIndex} className="episode">
                  {/* Episode title with play functionality */}
                  <p
                    className="episode-title"
                    onClick={() => playAudio(episode.file)}
                  >
                    <b className="episode-index">
                      S{seasonNumber}E{episodeNumber}
                    </b>
                    {episode.title}
                  </p>
                  <p className="episode-file">File: {episode.file}</p>
                  {/* Add to favourites button */}
                  <AddToFavourites
                    episode={episode}
                    handleAddToFavourites={handleAddToFavourites}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Audio player for the selected episode */}
      <div className="audio-footer">
        <audio ref={audioRef} src={podcastFileUrl} controls>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default DisplayPodcastDetails;