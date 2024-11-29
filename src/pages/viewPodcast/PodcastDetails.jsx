import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import AddToFavourites from "../../components/AddToFavourites";
import "./PodcastDetails.css";

const DisplayPodcastDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const audioRef = useRef(null);
  const [podcastFileUrl, setPodcastFileUrl] = useState(null);
  const [podcastDataDetails, setPodcastDataDetails] = useState(null);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    const fetchPodcastDataDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        const data = await response.json();
        console.log("podcastdetails", data);
        setPodcastDataDetails(data);
      } catch (error) {
        console.error("Error fetching podcast data details:", error);
      }
    };

    fetchPodcastDataDetails();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  if (!podcastDataDetails) {
    return <div>Loading...</div>;
  }

  const handleSeasonChange = (event) => {
    setSelectedSeasonIndex(Number(event.target.value));
  };

  const playAudio = (fileUrl) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPodcastFileUrl(fileUrl);
  };

  const pauseAudio = () => {
    setPodcastFileUrl();
  };

  // Add episode to favourites
  const handleAddToFavourites = (episode) => {
    const isAlreadyFavourite = favourites.some(
      (fav) => fav.title === episode.title
    );

    if (!isAlreadyFavourite) {
      const updatedFavourites = [...favourites, episode];
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
    console.log(favourites);
  };

  const formatUpdatedDate = (updatedDate) => {
    const date = new Date(updatedDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigateTo("/")}>
        Back
      </button>

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

      <div className="podcast-grid-header">
        <p>
          <b className="grid-index">#</b> Title
        </p>
        <p>Season</p>
        <p className="grid-date">Episodes</p>
      </div>
      <hr />

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

      <div className="audio-footer">
        <audio ref={audioRef} src={podcastFileUrl} controls>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default DisplayPodcastDetails;
