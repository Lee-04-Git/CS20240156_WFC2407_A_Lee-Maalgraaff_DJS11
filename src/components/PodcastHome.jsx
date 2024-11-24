import React, {useEffect, useState} from "react";

const DisplayPodcastData = () => {
    const [podcastsData, setPodcastsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        const data = await response.json();

        console.log("Fetched data:", data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    const sections = Array.from({ length: 6 }, (_, index) =>
      podcastsData.slice(index * 9, index * 9 + 9)
    );

    return (
        <div>
          {sections.map((section, index) => (
            <div key={index}>
              <h1>Recommended Podcasts {index + 1}</h1>
              <div>
                {section.map((podcast) => (
                  <div key={podcast.id}>
                    <img
                      src={podcast.image}
                      alt={`Podcast ${podcast.id}`}
                    />
                    <div>
                      <h3>{podcast.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );      

}