import React from "react";
import "./Navbar.css";
import searchIcon from "../assets/search.png";

const Navbar = ({search, setSearch}) => {
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
