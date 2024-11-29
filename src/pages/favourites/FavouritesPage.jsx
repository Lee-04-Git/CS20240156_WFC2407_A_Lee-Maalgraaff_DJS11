import React, { useState, useEffect } from "react";
import Favourites from "../../components/Favourites";

const FavouritePage = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Load favourites from localStorage
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    console.log("saved Favourites", savedFavourites);
    // Ensure the data format matches the expected structure
    const validFavourites = Array.isArray(savedFavourites)
      ? savedFavourites.filter(
          (season) =>
            season &&
            Array.isArray(season.episodes) && // Ensure episodes is an array
            season.episodes.length > 0 // Avoid empty seasons
        )
      : [];
    console.log("valid favourites", validFavourites);
    setFavourites(savedFavourites);
  }, []);

  return (
    <div className="favourite-page">
      <h2>Your Favourite Podcasts</h2>
      <div className="podcast-cards-container">
        {favourites.length === 0 ? (
          <p>No favourites added yet. Start exploring!</p>
        ) : (
          //   favourites.map((season, seasonIndex) =>
          //     Array.isArray(season.episodes)
          //       ? season.episodes.map((episode, episodeIndex) => (
          //           <Favourites
          //             key={`season-${seasonIndex}-episode-${episode.episode}`}
          //             podcast={episode} // Pass the episode details
          //           />
          //         ))
          //       : null
          favourites.map((episode, episodeIndex) => (
            <Favourites
              key={`season-${episodeIndex}-episode-${episode.episode}`}
              episode={episode} // Pass the episode details
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FavouritePage;