import React from "react";
import { Routes, Route } from "react-router-dom";
import DisplayPodcastData from "./PodcastHome";
import "./DisplayPodcast.css";
import DisplayPodcastDetails from "./PodcastDetails";

const DisplayPodcast = () => {
  return (
    <div className="podcast-display-container">
      <Routes>
        <Route path="/" element={<DisplayPodcastData />} />
        <Route path="/podcast/:id" element={<DisplayPodcastDetails />} />
      </Routes>
    </div>
  );
};

export default DisplayPodcast;
