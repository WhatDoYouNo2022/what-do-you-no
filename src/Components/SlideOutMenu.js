// Modules

// Components
import Leaderboard from "./Leaderboard.js";
import About from "./About.js";

const SlideOutMenu = (props) => {
  const {
    menuOpen,
    leaderboardOpen,
    aboutOpen,
    handleLeaderboardClick,
    handleAboutButtonClick,
  } = props;

  return (
    <aside
      className={menuOpen ? "slideOutMenu slideOutMenuOpen" : "slideOutMenu"}
    >
      {leaderboardOpen ? (
        <Leaderboard handleLeaderboardClick={handleLeaderboardClick} />
      ) : aboutOpen ? (
        <About handleAboutButtonClick={handleAboutButtonClick} />
      ) : null}
    </aside>
  );
};

export default SlideOutMenu;
