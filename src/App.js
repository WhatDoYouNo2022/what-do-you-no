// Modules
import { useState, useEffect } from "react";
// Components
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import LeaderboardForm from "./Components/LeaderboardForm.js";
import FetchData from "./Components/FetchData.js";

// Utilities
import firebase from "./utils/Firebase.js";
// Styling
import "./styles/sass/App.scss";
import SlideOutNav from "./Components/SlideOutNav.js";

function App() {
  // state variables
  // state of whether the slide out menu is open or closed
  const [navOpen, setNavOpen] = useState(false);
  // state of whether the leaderboard is to be displayed
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  // state of whether the about section is to be displayed.
  const [aboutOpen, setAboutOpen] = useState(false);

  // Event handler

  // Event handler for the About navigation button
  const handleAboutButtonClick = () => {
    // changes the state of the the slide out menu depending on the current state of the menu
    if (navOpen && leaderboardOpen) {
      // if the slide out is already open showing the leaderboard, switch to the about section view
      setLeaderboardOpen(false);
      setAboutOpen(true);
    } else if (!navOpen) {
      // if the slide out is closed, open the slide out menu showing the about section
      setAboutOpen(true);
      setNavOpen(true);
      setLeaderboardOpen(false);
    } else if (aboutOpen) {
      // if the about section is already open close the slide out on button click
      setNavOpen(false);
      setAboutOpen(false);
      setLeaderboardOpen(false);
    }
  };
  // Event handler for the Leaderboard navigation button
  const handleLeaderboardClick = () => {
    // Changes the state of the slide out depending on its current state
    if (navOpen && aboutOpen) {
      // if the slide out is already open showing the about section, switch to the leaderboard view
      setAboutOpen(false);
      setLeaderboardOpen(true);
    } else if (!navOpen) {
      // if the slide out is closed, open the slide out menu showing the leaderboard section
      setLeaderboardOpen(true);
      setNavOpen(true);
      setAboutOpen(false);
    } else if (leaderboardOpen) {
      // if the leaderboard section is already open, close the slide out on button click
      setNavOpen(false);
      setLeaderboardOpen(false);
      setAboutOpen(false);
    }
  };
  return (
    <div className="App">
      <Header
        handleLeaderboardClick={handleLeaderboardClick}
        handleAboutButtonClick={handleAboutButtonClick}
        leaderboardOpen={leaderboardOpen}
        aboutOpen={aboutOpen}
      />
      <main>
        <FetchData />
        {navOpen ? (
          <SlideOutNav
            navOpen={navOpen}
            leaderboardOpen={leaderboardOpen}
            aboutOpen={aboutOpen}
            handleLeaderboardClick={handleLeaderboardClick}
            handleAboutButtonClick={handleAboutButtonClick}
          />
        ) : null}
        <div className="wrapper">
          <h2>What Do You No?</h2>
          <LeaderboardForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
