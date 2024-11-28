import React, { useState, useEffect } from 'react';
import GenreDropdown from '../components/GenreDropdown';

const GenrePage = () => {
  const [podcastGenre, setPodcastGenre] = useState([]); // List of genres
  const [selectedPodcastGenre, setSelectedPodcastGenre] = useState(null); // Selected genre ID
  const [genrePodcastDetails, setPodcastGenreDetails] = useState(null); // Details of the selected genre

  useEffect(() => {
    const fetchPodcastGenres = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/genres');
        const data = await response.json();
        setPodcastGenre(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchPodcastGenres();
  }, []);

  const fetchGenreDetails = async (genreId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
      const data = await response.json();
      setPodcastGenreDetails(data);
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
  };

  const handleGenreChange = (e) => {
    const selectedId = e.target.value;
    setSelectedPodcastGenre(selectedId);

    if (selectedId) {
      fetchGenreDetails(selectedId);
    } else {
      setPodcastGenreDetails(null);
    }
  };

  return (
    <div>
      <h1>Select a Genre</h1>
      <GenreDropdown genres={podcastGenre} onChange={handleGenreChange} />
      {genrePodcastDetails ? (
        <div>
          <h2>{genrePodcastDetails.title}</h2>
          <p>{genrePodcastDetails.description}</p>
          <h3>Related Podcasts</h3>
          <ul>
            {genrePodcastDetails.showIds.map((showId) => (
              <li key={showId}>Show ID: {showId}</li>
            ))}
          </ul>
        </div>
      ) : (
        selectedPodcastGenre && <p>Loading genre details...</p>
      )}
    </div>
  );
};

export default GenrePage;