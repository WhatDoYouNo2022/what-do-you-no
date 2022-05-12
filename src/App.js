// Modules
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Components
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import LeaderboardForm from "./Components/LeaderboardForm.js";
import Game from "./Components/Game.js";
import SlideOutMenu from "./Components/SlideOutMenu.js";
import LandingPage from "./Components/LandingPage.js";

// Utilities

// Styling
import "./styles/sass/App.scss";

function App() {
  // state variables
  // state of whether the slide out menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);
  // state of whether the leaderboard is to be displayed
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  // state of whether the about section is to be displayed.
  const [aboutOpen, setAboutOpen] = useState(false);

  

  // array to store initial list of words
  const initialWords = ["flour", "break", "aisle", "tail", "maid", "waist", "pray", "some", "ate", "son"];

  

  // Event handler for the About navigation button
  const handleAboutButtonClick = () => {
    // changes the state of the the slide out menu depending on the current state of the menu
    if (menuOpen && leaderboardOpen) {
      // if the slide out is already open showing the leaderboard, switch to the about section view
      setLeaderboardOpen(false);
      setAboutOpen(true);
    } else if (!menuOpen) {
      // if the slide out is closed, open the slide out menu showing the about section
      setAboutOpen(true);
      setMenuOpen(true);
      setLeaderboardOpen(false);
    } else if (aboutOpen) {
      // if the about section is already open close the slide out on button click
      setMenuOpen(false);
      setAboutOpen(false);
      setLeaderboardOpen(false);
    }
  };
  // Event handler for the Leaderboard navigation button
  const handleLeaderboardClick = () => {
    // Changes the state of the slide out depending on its current state
    if (menuOpen && aboutOpen) {
      // if the slide out is already open showing the about section, switch to the leaderboard view
      setAboutOpen(false);
      setLeaderboardOpen(true);
    } else if (!menuOpen) {
      // if the slide out is closed, open the slide out menu showing the leaderboard section
      setLeaderboardOpen(true);
      setMenuOpen(true);
      setAboutOpen(false);
    } else if (leaderboardOpen) {
      // if the leaderboard section is already open, close the slide out on button click
      setMenuOpen(false);
      setLeaderboardOpen(false);
      setAboutOpen(false);
    }
  }

  

  return (
    <div className="App">
      <Header
        handleLeaderboardClick={handleLeaderboardClick}
        handleAboutButtonClick={handleAboutButtonClick}
        leaderboardOpen={leaderboardOpen}
        aboutOpen={aboutOpen}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage handleAboutButtonClick={handleAboutButtonClick} />
            }
          />
          <Route path="/gamepage" element={<Game />} />
        </Routes>
        {menuOpen ? (
          <SlideOutMenu
            menuOpen={menuOpen}
            leaderboardOpen={leaderboardOpen}
            aboutOpen={aboutOpen}
            handleLeaderboardClick={handleLeaderboardClick}
            handleAboutButtonClick={handleAboutButtonClick}
          />
        ) : null}
        <div className="wrapper">
          <LeaderboardForm />
          <Game initialWords={initialWords} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
