// Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faMedal, faRankingStar } from "@fortawesome/free-solid-svg-icons"
import Leaderboard from "./Leaderboard";
// Components

const Header = (props) => {
    const { 
        handleLeaderboardClick,
        handleAboutButtonClick,
        leaderboardOpen,
        aboutOpen
    } = props;
    return (
        <header>     
            <div className="wrapper flexContainer">
                <nav className="headerNav">
                    <ul className="headerNavList">
                        <li>
                            <button onClick={handleLeaderboardClick} className={leaderboardOpen ? "tabActive": ""}>
                                <FontAwesomeIcon icon={faMedal} className="leaderboardIcon" /> <p>Leaderboard</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={handleAboutButtonClick}
                            className={aboutOpen ? "tabActive" : ""}
                            >
                                <FontAwesomeIcon icon={faCircleInfo} className="aboutIcon" /> <p>About</p>
                            </button>
                        </li>
                        <li>
                            <h2>
                                <FontAwesomeIcon icon={faRankingStar} className="scoreIcon" />Score:
                            </h2>
                        </li>
                    </ul>
                </nav>
                <h1>What Do You No?</h1>
            </div>
        </header>
    )
}

export default Header