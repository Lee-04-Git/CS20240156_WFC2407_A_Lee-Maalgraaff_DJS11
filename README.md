# Podcast App - README

Welcome to the Podcast App! This app allows you to explore and interact with podcasts. You can browse by genre, sort podcasts alphabetically or by updated date, view detailed podcast episodes, and store your favorite episodes in the Favorites page.

### Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
  - [Home Page](#home-page)
  - [Podcast Cards](#podcast-cards)
  - [Details Page](#details-page)
  - [Favorites Page](#favorites-page)
- [App Structure](#app-structure)
- [Troubleshooting](#troubleshooting)

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool to develop and bundle the app.
- **React Router**: To handle navigation and routing between different pages.
- **CSS**: For styling the app components.

## Getting Started

Follow the steps below to get the app up and running on your local machine.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-app-directory>
```

### 2. Install Dependencies

Install the dependencies using npm.

```bash
npm install
```

### 3. Run the Development Server

Start the development server using Vite.

```bash
npm run dev
```

This will start the app on your local machine. Open `http://localhost:3000` in your browser to view the app.

## Features

### Home Page

- **Genre Button**: Click on the "Genre" dropdown button to filter podcasts by genre. This allows you to view only podcasts that match the selected genre.
- **Sort Alphabetically**: Click the "Sort Alphabetically" button to toggle sorting between A-Z and Z-A for podcast titles.
- **Sort by Oldest/Newest**: Click the "Sort by Updated" button to toggle sorting between the newest and oldest podcasts based on their last updated date.

### Podcast Cards

Each podcast is displayed in a card format on the home page. You can interact with the cards as follows:

- **Click the Card**: Click on any podcast card to be directed to the details page for that specific podcast, where you can view its seasons and episodes.

### Details Page

Once you are on the details page for a specific podcast, here’s what you can do:

- **Episode Info**: Click on the `<p>` tags to expand more details about each episode.
- **Play Audio**: After expanding the episode details, click on the audio link or player to start playing the episode.
- **Toggle Seasons**: Use the toggle button to show or hide the list of seasons for the podcast.
- **Add to Favorites**: Click on the "Add to Favourites" button to store the episode in your local storage and add it to the Favorites page.

### Favorites Page

The **Favorites Page** displays all the episodes that you have marked as favorites. Episodes are stored in the browser’s local storage for persistent access.

- **Stored Episodes**: All episodes that you have clicked "Add to Favourites" will appear here, so you can easily access your favorite episodes.

## App Structure

```plaintext
src/
├── components/
│   ├── GenreDropdown.js
│   ├── Navbar.js
│   └── PodcastItem.js
├── pages/
│   ├── Home.js
│   ├── Details.js
│   └── Favorites.js
├── App.js
└── index.js
```

- **`components/`**: Contains reusable components like `Navbar`, `GenreDropdown`, and `PodcastItem`.
- **`pages/`**: Contains the page components for `Home`, `Details`, and `Favorites` views.
- **`App.js`**: Main app entry point where routing is configured.

## Troubleshooting

If you encounter any issues, try the following steps:

1. **Check for missing dependencies**: Make sure all dependencies are correctly installed by running `npm install`.
2. **Clear local storage**: If the Favorites page isn't showing the correct data, try clearing your browser’s local storage.

If you still face issues, check the console for any error messages and feel free to reach out with details.

---

Enjoy using the Podcast App, and feel free to contribute or make improvements!