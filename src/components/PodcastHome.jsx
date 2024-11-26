import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./PodcastHome.css";
import Navbar from "./Navbar";

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
    const [search, setSearch] = useState('')

    useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        const data = await response.json();

        console.log("Fetched data:", data);
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

    const filteredPodcastData = podcastsData.filter(podcastData =>
      podcastData.title.toLowerCase().includes(search.toLowerCase())
    );    

    return (
      <div>
        {/* Pass search props to the Navbar */}
        <Navbar search={search} setSearch={setSearch} />
    
        {/* Map through filtered data */}
        {filteredPodcastData.length > 0 ? (
          sections.map((section, index) => (
            <div key={index} className="podcast-display-container">
              <h1 className="podcast-section-title">Recommended Podcasts {index + 1}</h1>
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
  }

export default DisplayPodcastData;