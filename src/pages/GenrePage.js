import React, { useState, useEffect } from 'react';

const GenrePage = () => {
    const [podcastGenre, setPodcastGenre] = useState([]);
    const [selectedPodcastGenre, setSelectedPodcastGenre] = useState(null);
    const [genrePopdcastDetails, setPopdcastGenreDetails] = useState(null);
}

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

    fetchGenres();
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
    setSelectedGenre(selectedId);

    if (selectedId) {
      fetchGenreDetails(selectedId);
    } else {
      setPodcastGenreDetails(null);
    }
  };

  export default GenrePage
