// Leaderboard.js
// Utilities
import firebase from "../utils/Firebase";
// Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
// Components

const Leaderboard = (props) => {
  const [dbData, setDbData] = useState([]);
  const { handleLeaderboardClick } = props;

  const getRank = (leaderBoardData) => {
    let rankNumber = 0;
    const newRankedArray = leaderBoardData.map((individualEntry) => {
      rankNumber++;
      return {
        key: individualEntry.key,
        rank: rankNumber,
        score: individualEntry.score,
        username: individualEntry.username,
      };
    });
    return newRankedArray;
  };

  const sortScore = (data) => {
    const sortedScores = data.sort(
      (firstEntry, secondEntry) => secondEntry.score - firstEntry.score
    );
    return getRank(sortedScores);
  };

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      if (response.exists()) {
        let dataResponse = response.val();
        const leaderboardEntries = [];
        for (let key in dataResponse) {
          leaderboardEntries.push({
            key: key,
            score: dataResponse[key].score,
            username: dataResponse[key].username,
          });
        }
        setDbData(sortScore(leaderboardEntries));
      } else {
        console.log("Can't retrieve data");
      }
    });
  }, []);

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
              {dbData.map((userEntry) => {
                return (
                  <tr key={userEntry.key}>
                    <td>{userEntry.rank}</td>
                    <td>{userEntry.username}</td>
                    <td>{userEntry.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="lowerMenu">
          <button onClick={handleLeaderboardClick} className="hideMenuButton">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="hideMenuIcon"
              aria-hidden="true"
            />
            <p>Hide Menu</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
