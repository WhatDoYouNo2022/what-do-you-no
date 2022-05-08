// Leaderboard.js

// Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
// Components

const Leaderboard = (props) => {
    const { handleLeaderboardClick } = props;
    return (
            <section className="leaderboardSection" id="leaderboard">
                <div className="wrapper">
                    <div className="leaderTopMenu">
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Esther</td>
                                    <td>10/10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="lowerMenu">
                        <button
                        onClick={handleLeaderboardClick}className="hideMenuButton"
                        >
                            <FontAwesomeIcon icon={faCircleXmark} className="hideMenuIcon" />
                            <p>Hide Menu</p>
                        </button>
                    </div>
                </div>
            </section>
    )
}

export default Leaderboard;