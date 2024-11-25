import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-search-bar">
                    <img 
                    src='src/assets/search.png'
                    alt="Search-icon"
                    className='search-icon'
                    />
                    <input 
                    type="search"
                    className='search-input'
                    placeholder="Search podcast..."
                    aria-label="Search"
                    />
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar