import React, { useEffect, useState } from "react";

const DisplayPodcastDetails = () => {
    const [podcastDataDetails, setPodcastDataDetails] = useState(null);
    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

    // Fetch data when the component mounts
    useEffect(() => {
    const fetchPodcastDataDetails = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/podcasts");
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
      <div>
        <img src={podcastDataDetails.image} alt={podcastDataDetails.title} />
        <div>
          <p>Podcast</p>
          <h2>{podcastDataDetails.title}</h2>
          <h4>{podcastDataDetails.description}</h4>
          <p>
            <b>Platform</b> - <b>{podcastDataDetails.seasons.length} seasons</b>
          </p>
        </div>
      </div>
  
      <div>
        <p>
          <b>#</b> Title
        </p>
        <p>Season</p>
        <p>Episodes</p>
      </div>
      <hr />
  
      {/* Season Dropdown */}
      <div>
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
        <div>
          {podcastDataDetails.seasons[selectedSeasonIndex].episodes.map((episode, episodeIndex) => (
            <div key={episodeIndex}>
              <p>
                <b>{episodeIndex + 1}</b>
                {episode.title}
              </p>
              <p>File: {episode.file}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );  
}