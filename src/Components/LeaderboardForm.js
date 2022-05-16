// LeaderboardForm.js

// Utilities
import firebase from "../utils/Firebase";
// Modules
import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCircleXmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
    <form className="leaderboardForm">
      <label name="leaderboardForm" htmlFor="userNameInput">
        <ul>
          <li>Please enter a username for the Leaderboard</li>
          <li>Note: Your username will be visible to all users</li>
        </ul>
      </label>
      <input
        onChange={handleUserInput}
        value={userInput}
        name="leaderboardForm"
        type="text"
        className="usernameInput"        
        id="usernameInput"
        placeholder="Please enter a username"
      />
      <button onClick={handleSubmit} type="submit" className="mainMenuControls">
        <FontAwesomeIcon 
          icon={faStar}
          className="buttonIcon"
        />
        <p>Submit Score</p>
      </button>
      <button onClick={handleAnonSubmit} className="mainMenuControls">
        <FontAwesomeIcon 
          icon={faEyeSlash}
          className="buttonIcon"
        />
        <p>Anonymous Submit</p>
      </button>
      <button onClick={handleDeclineSubmit} className="mainMenuControls">
        <FontAwesomeIcon 
          icon={faCircleXmark}
          className="buttonIcon"
        />
        <p>No, thanks!</p>
      </button>
    </form>
  );
};

export default LeaderboardForm;
