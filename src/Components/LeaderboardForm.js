// LeaderboardForm.js

// Utilities
import firebase from "../utils/Firebase";
// Modules
import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

const LeaderboardForm = (props) => {
  const {
    setScoreSubmitted,
    score,
    setUsernameDeclined,
    setModalIsOpen,
    setModalMessage,
    setModalTitle,
  } = props;

  const [userInput, setUserInput] = useState("");

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
    console.log(userInput);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    if (userInput.trim() === "") {
      setUserInput("");
      setModalIsOpen(true);
      setModalMessage("Please enter a username to submit your score.");
      setModalTitle("Oops!");
    } else if (userInput.trim()[0] === "<") {
      setModalIsOpen(true);
      setModalMessage(
        `Sorry, usernames can't begin with a "<" character, please try a different username.`
      );
      setModalTitle("Invalid Username");
    } else {
      const leaderboardEntry = {
        username: userInput,
        score: score,
      };
      push(dbRef, leaderboardEntry);
      setUserInput("");
      setScoreSubmitted((prevState) => {
        return true;
      });
    }
  };
  const handleAnonSubmit = (event) => {
    event.preventDefault();
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const leaderboardEntry = {
      username: "Anonymous",
      score: score,
    };
    push(dbRef, leaderboardEntry);
    setUserInput("");
    setScoreSubmitted((prevState) => {
      return true;
    });
  };
  const handleDeclineSubmit = () => {
    setUsernameDeclined(true);
  };

  return (
    <form>
      <label name="leaderboardForm" htmlFor="userNameInput">
        <ul>
          <li>Please enter a username for the Leaderboard</li>
          <li>Caution! Your username will be visible to all users</li>
        </ul>
      </label>
      <input
        onChange={handleUserInput}
        value={userInput}
        name="leaderboardForm"
        type="text"
        className="usernameInput"        
        id="usernameInput"
        placeholder="Leaderboard username"
      />
      <button onClick={handleSubmit} type="submit" className="mainMenuControls">
        Submit score
      </button>
      <button onClick={handleAnonSubmit} className="mainMenuControls">Submit Anonymously</button>
      <button onClick={handleDeclineSubmit} className="mainMenuControls">No, thanks!</button>
    </form>
  );
};

export default LeaderboardForm;
