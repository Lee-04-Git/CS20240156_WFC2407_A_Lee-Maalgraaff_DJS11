import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";

const Navbar = ({search, setSearch}) => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-search-bar">
            <img src={searchIcon} alt="Search-icon" className="search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Search podcast..."
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
           {/* Favourites Button */}
           <button
            className="favourites-button"
            onClick={() => navigate("/favourites")}
          >
            Favourites
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
