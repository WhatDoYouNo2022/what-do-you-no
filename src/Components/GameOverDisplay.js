// GameOverDisplay.js

// Modules
import { useState } from "react";
// react confetti module sourced from: https://www.npmjs.com/package/react-confetti
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

// Components
import LeaderboardForm from "./LeaderboardForm";
import useWindowSize from "../Hooks/useWindowSize";

const GameOverDisplay = (props) => {
  const {
    scoreSubmitted,
    setScoreSubmitted,
    score,
    setModalIsOpen,
    setModalMessage,
    setModalTitle,
  } = props;
  const [usernameDeclined, setUsernameDeclined] = useState(false);
  const { width, height } = useWindowSize();
  // An array to hold the colors for the confetti.
  const confettiColors = ["#6056f9", "#fff", "#cfff31"];

  return (
    <>
      <Confetti width={width} height={height} colors={confettiColors} />
      <h2>Thanks for playing!</h2>
      {scoreSubmitted && usernameDeclined === false ? (
        <p>Your score has been submitted</p>
      ) : usernameDeclined ? (
        <p>Ok, we won't submit your score. Thanks for playing!</p>
      ) : (
        <LeaderboardForm
          scoreSubmitted={scoreSubmitted}
          setScoreSubmitted={setScoreSubmitted}
          score={score}
          setUsernameDeclined={setUsernameDeclined}
          setModalIsOpen={setModalIsOpen}
          setModalMessage={setModalMessage}
          setModalTitle={setModalTitle}
        />
      )}
      {scoreSubmitted || usernameDeclined ? (
        <Link to="/">Restart Game</Link>
      ) : null}
    </>
  );
};

export default GameOverDisplay;
