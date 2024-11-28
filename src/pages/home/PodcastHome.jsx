import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PodcastHome.css";
import Navbar from "../../components/Navbar";

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

  const [podcastsData, setPodcastsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        const data = await response.json();

        console.log("Fetched data:", data);
        console.log()
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcastsData(sortedData);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

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

  // Navigate to the selected podcast
  const routeToPodcast = (podcastId) => {
    console.log("Navigating to podcast:", podcastId);
    navigateTo(`/podcast/${podcastId}`);
  };

  // dummy loader
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const sections = Array.from({ length: 6 }, (_, index) =>
    podcastsData.slice(index * 9, index * 9 + 9)
  );

  const filteredPodcastData = podcastsData.filter((podcastData) =>
    podcastData.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Pass search props to the Navbar */}
      <Navbar search={search} setSearch={setSearch} />

       {/* Add sort button */}
       <button className="sort-button" onClick={toggleSortOrder}>
        Sort {sortOrder === "A-Z" ? "Z-A" : "A-Z"}
      </button>

      {/* Map through filtered data */}
      {filteredPodcastData.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} className="podcast-display-container">
            <div className="podcast-list">
              {section
                .filter((podcast) => filteredPodcastData.includes(podcast))
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