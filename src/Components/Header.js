// Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = (props) => {
  const {
    handleLeaderboardClick,
    handleAboutButtonClick,
    leaderboardOpen,
    aboutOpen,
  } = props;
  
  return (
    <header>
      <div className="wrapper flexContainer">
        <Link to="/">
            <h1>What Do You No?</h1>
        </Link>
        <nav className="headerNav">
          <ul className="headerNavList">
            <li>
              <button
                onClick={handleLeaderboardClick}
                className={leaderboardOpen ? "tabActive" : ""}
              >
                <FontAwesomeIcon
                  icon={faMedal}
                  className="leaderboardIcon"
                  aria-hidden="true"
                />
                <p>Leaderboard</p>
              </button>
            </li>
            <li>
              <button
                onClick={handleAboutButtonClick}
                className={aboutOpen ? "tabActive" : ""}
              >
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="aboutIcon"
                  aria-hidden="true"
                />
                <p>About</p>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
