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

  // Create a function that takes the leaderboard entries, already sorted by score and attaches a rank number to each entry.
  const getRank = (leaderBoardData) => {
    // set the initial rank to start at 1
    let rankNumber = 1;
    // map over the score sorted array and return a new one with ranks added
    const newRankedArray = leaderBoardData.map((currentEntry, index, array) => {
      // if we are not on the first entry in the array
      if(index > 0){
        // Get the previous entry object
        const previousEntry = array[index - 1]
        // If the current entry's score is equal to the previous entry's score, make the rank equivalent
        if(previousEntry.score === currentEntry.score){
          currentEntry.rank = previousEntry.rank
        } else {
          // Because our scores are already sorted, if the previous entry's score is not equal to the current entry's score, give the current entry a higher ranking
          rankNumber++
          currentEntry.rank = rankNumber;
        }
      }
      // return a new object in the array of leaderboard entries with the rank included.
      return {
        key: currentEntry.key,
        rank: rankNumber,
        score: currentEntry.score,
        username: currentEntry.username,
      };
    });
    // return a new array of leaderboard entries with the ranks included.
    return newRankedArray;
  };

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const sortScore = (data) => {
          const sortedScores = data.sort(
            (firstEntry, secondEntry) => secondEntry.score - firstEntry.score
          );
          return getRank(sortedScores);
    };
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
        const sortedData = sortScore(leaderboardEntries);
        setDbData(sortedData);
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
