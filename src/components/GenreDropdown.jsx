import React from 'react';

const GenreDropdown = ({genres, onChange}) => {
    return (
        <div>
          <label htmlFor="genre">Choose a Genre: </label>
          <select id="genre" onChange={onChange}>
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
      );
    };

export default GenreDropdown;