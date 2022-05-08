// Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faMedal, faRankingStar } from "@fortawesome/free-solid-svg-icons"
// Components

const Header = (props) => {
    const { 
        handleLeaderboardClick,
        handleAboutButtonClick
    } = props;
    return (
        <header>     
            <div className="wrapper flexContainer">
                <nav className="headerNav">
                    <ul className="headerNavList">
                        <li>
                            <button onClick={handleLeaderboardClick}>
                                <FontAwesomeIcon icon={faMedal} className="leaderboardIcon" /> <p>Leaderboard</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={handleAboutButtonClick}
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