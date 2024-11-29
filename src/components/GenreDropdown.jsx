import React from "react";
import "./GenreDropdown.css";

const genreMapping = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

const GenreDropDown = ({ selectedGenre, onGenreSelect }) => {
  const handleGenreChange = (event) => {
    const selectedValue =
      event.target.value === "all" ? null : parseInt(event.target.value);
    onGenreSelect(selectedValue); // Pass the selected genre ID or null for "All Genres"
  };

  return (
    <div className="genre-dropdown">
      <label htmlFor="genre-select">Select Genre:</label>
      <select
        id="genre-select"
        value={selectedGenre ?? "all"} // Use "all" when no genre is selected
        onChange={handleGenreChange}
      >
        <option value="all">All Genres</option>
        {Object.entries(genreMapping).map(([id, title]) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreDropDown;
