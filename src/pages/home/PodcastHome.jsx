import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PodcastHome.css";
import Navbar from "../../components/Navbar";
import GenreDropDown from "../../components/GenreDropdown";

// PodcastItem component displays each podcast's image and title
const PodcastItem = ({ onClick, title, id, image }) => (
  <div className="podcast-card" onClick={onClick}>
    <img className="podcast-thumbnail" src={image} alt={`Podcast ${id}`} />
    <div className="podcast-info">
      <h3 className="podcast-title">{title}</h3>
    </div>
  </div>
);

const DisplayPodcastData = () => {
  const navigateTo = useNavigate();

  // State variables to manage data, loading, and error
  const [podcastsData, setPodcastsData] = useState([]);
  const [unfilteredPodcastData, setUnfilteredPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [sortOrderByUpdated, setSortOrderByUpdated] = useState("newest");
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    // Fetch podcast data from API
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        const data = await response.json();
        console.log("Fetched data:", data);

        // Sort podcasts alphabetically by title
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcastsData(sortedData);
        setUnfilteredPodcastData(sortedData);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  // Toggle sort order by title (A-Z or Z-A)
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "A-Z" ? "Z-A" : "A-Z";
    const sortedData = [...podcastsData].sort((a, b) =>
      newSortOrder === "A-Z"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    setSortOrder(newSortOrder);
    setPodcastsData(sortedData);
  };

  // Toggle sort order by updated date (newest or oldest)
  const toggleSortOrderByUpdated = () => {
    const newSortOrder = sortOrderByUpdated === "newest" ? "oldest" : "newest";
    const sortedData = [...podcastsData].sort((a, b) =>
      newSortOrder === "newest"
        ? new Date(b.updated) - new Date(a.updated)
        : new Date(a.updated) - new Date(b.updated)
    );
    setSortOrderByUpdated(newSortOrder);
    setPodcastsData(sortedData);
  };

  // Navigate to the selected podcast page
  const routeToPodcast = (podcastId) => {
    console.log("Navigating to podcast:", podcastId);
    navigateTo(`/podcast/${podcastId}`);
  };

  // Filter podcasts by selected genre
  const filterPodcastsByGenre = (genreId) => {
    setSelectedGenre(genreId);
  };

  // Display loading or error messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Split podcasts into sections for display
  const sections = Array.from({ length: 6 }, (_, index) =>
    podcastsData.slice(index * 9, index * 9 + 9)
  );

  // Filter podcasts based on search text and selected genre
  const filterPodcastData = podcastsData.filter((podcast) => {
    const matchesSearch = podcast.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre = selectedGenre
      ? podcast.genreIds && podcast.genreIds.includes(selectedGenre)
      : true;
    return matchesSearch && matchesGenre;
  });

  // Genre selection handler
  const selectGenre = (genre) => {
    if (genre) {
      setSelectedGenre(genre);
      const filteredPodcastData = unfilteredPodcastData.filter((podcast) => {
        return podcast.genres.includes(genre);
      });
      console.log("filteredPodcastData", filteredPodcastData);
      setPodcastsData(filteredPodcastData);
    } else {
      setSelectedGenre(genre);
      setPodcastsData(unfilteredPodcastData);
    }
    console.log(genre);
  };

  return (
    <div className="home-container">
      {/* Pass search props to the Navbar */}
      <Navbar search={search} setSearch={setSearch} />
      {/* Add Genre dropdown */}
      <GenreDropDown
        selectedGenre={selectedGenre}
        onGenreSelect={selectGenre}
      />

      {/* Sort buttons for changing sorting options */}
      <div className="sort-buttons-container">
        <button className="sort-button" onClick={toggleSortOrder}>
          Sort {sortOrder === "A-Z" ? "Z-A" : "A-Z"}
        </button>

        <button className="sort-button" onClick={toggleSortOrderByUpdated}>
          Sort by Updated {sortOrderByUpdated === "newest" ? "Oldest" : "Newest"}
        </button>
      </div>

      {/* Map through podcasts and display them in sections */}
      {podcastsData.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} className="podcast-display-container">
            <div className="podcast-list">
              {section
                .filter((podcast) => podcastsData.includes(podcast))
                .map((podcast) => (
                  <PodcastItem
                    key={podcast.id}
                    onClick={() => routeToPodcast(podcast.id)}
                    title={podcast.title}
                    id={podcast.id}
                    image={podcast.image}
                  />
                ))}
            </div>
          </div>
        ))
      ) : (
        <p>No podcasts found.</p>
      )}
    </div>
  );
};

export default DisplayPodcastData;