import React from "react";

const AddToFavourites = ({ episode, handleAddToFavourites }) => {
  return (
    <button className="add-episode-button" onClick={() => handleAddToFavourites(episode)}>
      Add to Favourites
    </button>
  );
};

export default AddToFavourites;