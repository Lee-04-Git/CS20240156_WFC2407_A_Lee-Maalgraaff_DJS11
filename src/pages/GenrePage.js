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
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  export default GenrePage
