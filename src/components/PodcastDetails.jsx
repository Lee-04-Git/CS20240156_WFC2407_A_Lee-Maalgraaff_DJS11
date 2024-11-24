import React, { useEffect, useState } from "react";

const DisplayPodcastDetails = () => {
    const [podcastDataDetails, setPodcastDataDetails] = useState(null);
    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

    // Fetch data when the component mounts
    useEffect(() => {
    const fetchPodcastDataDetails = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/podcasts");
        const data = await response.json();
        setPodcastDataDetails(data);
      } catch (error) {
        console.error("Error fetching podcast data details:", error);
      }
    };

    fetchPodcastDataDetails();
  }, []);

}