import { Route, Routes } from "react-router-dom";
import "./App.css";
import DisplayPodcastDetails from "./pages/viewPodcast/PodcastDetails";
import DisplayPodcastData from "./pages/home/PodcastHome";
import FavouritesPage from "./pages/favourites/FavouritesPage";

function App() {
  return (
    <div className="podcast-display-container">
      <Routes>
        <Route path="/" element={<DisplayPodcastData />} />
        <Route path="/podcast/:id" element={<DisplayPodcastDetails />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
