// GameOverDisplay.js

// Modules
import { useState } from "react";
// react confetti module sourced from: https://www.npmjs.com/package/react-confetti
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
// Components
import LeaderboardForm from "./LeaderboardForm";
import useWindowSize from "../Hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
// Styling
import Barcode from "../assets/barcode-small.png"

const GameOverDisplay = (props) => {
  const {
    scoreSubmitted,
    setScoreSubmitted,
    score,
    setModalIsOpen,
    setModalMessage,
    setModalTitle,
    setGameIsStarted
  } = props;
  const [ usernameDeclined, setUsernameDeclined ] = useState(false);
  const { width, height } = useWindowSize();
  // An array to hold the colors for the confetti.
  const confettiColors = ["#6056f9", "#fff", "#cfff31"]

  const handleGameRestart = () => {
    setGameIsStarted(false);
  }

  return (
    <section className="gameOverDisplay">
      {/* confetti animation on game completion */}
        <Confetti 
          width={width}
          height={height}
          colors={confettiColors}
          numberOfPieces={1000}
          recycle={false}
        />
      <div className="bookCover backCover">
        <div className="pagesContainer">
          <div className="sideBackPages"></div>
          <div className="topBackPages"></div>
        </div>
        <div className="bookCoverContent">
          <h2>Thanks for playing!</h2>
          {scoreSubmitted && usernameDeclined === false ? (
            <>
              <p>Your score has been submitted.</p>
              <p>Play again?</p>
            </>
          ) : usernameDeclined ? (
            <>
              <p>No worries, we won't submit your score.</p>
              <p>Play again?</p>
            </>
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
          { scoreSubmitted || usernameDeclined ? (
            <button
              onClick={handleGameRestart}
              className="restartGame"
            >
              <FontAwesomeIcon 
              icon={faRotateRight}
              className="buttonIcon"
              />
              <p>Restart Game</p>
            </button>
          ) : null
          }
            <img
              src={Barcode}
              alt="A fake barcode for this dictionary-themed game completion screen"
              className="barcode"
            />
            <p className="backCoverJuno">Juno College Press</p>
        </div> {/* End of bookCoverContent*/}
      </div> {/* End of bookCover backCover*/}
    </section>
  );
};

export default GameOverDisplay;
