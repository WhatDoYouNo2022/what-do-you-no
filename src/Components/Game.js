import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import GameOverDisplay from "./GameOverDisplay";
import QuestionsDisplay from "./QuestionsDisplay";
import Score from "./Score";
import ProgressBar from "./ProgressBar";
import { faBook, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import ModalWindow from "./ModalWindow";

const Game = (props) => {

  const { 
    initialWords,
    updatedIconsColourArray,
    setGameIsStarted
  } = props;

  //store data from API
  const [data, setData] = useState([]);

  //store random word from words array
  const [randomWord, setRandomWord] = useState("");

  const [userAnswer, setUserAnswer] = useState("");

  const [questionNumber, setQuestionNumber] = useState(1);

  const [scoreDenominator, setScoreDenominator] = useState(0);

  const [wordOneChecked, setWordOneChecked] = useState(false);

  const [wordTwoChecked, setWordTwoChecked] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);

  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const [randomQuestionPosition, setRandomQuestionPosition] = useState(1);

  const [answerCorrect, setAnswerCorrect] = useState("");

  // array to store initial progress bar icons
  const [progressBarIconArray, setProgressBarIconArray] = useState([
    faBookOpen,
    faBook,
    faBook,
    faBook,
    faBook,
    faBook,
    faBook,
    faBook,
    faBook,
    faBook,
  ]);

  // array to store icon classes
  const [progressBarIconColourArray, setProgressBarIconColourArray] = useState([
    "white-progress-icon",
    "white-progress-icon",
    "white-progress-icon",
    "white-progress-icon",
    "white-progress-icon",
    "white-progress-icon",
    "white-progress-icon",
    "white-progress-icon",
    "white-progress-icon",
    "white-progress-icon",
  ]);

  //modal window state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //modal title
  const [modalTitle, setModalTitle] = useState("");

  //modal message
  const [modalMessage, setModalMessage] = useState("");

  let updatedIconsArray = [];

  //store homophone generated from API
  let homophone;

  let onFinalQuestion = false;

  //close modal window function
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  //Api call
  useEffect(() => {
    axios({
      url: "https://api.datamuse.com/words",
      method: "GET",
      dataResponse: "json",
      params: {
        //param for homophones
        rel_hom: randomWord,
        //param for definition
        md: "d",
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setModalIsOpen(true);
        setModalTitle("Error");
        setModalMessage(
          "We're having trouble reaching the data right now. Please try again later."
        );
      });
  }, [randomWord]);

  const createRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * initialWords.length);
    const randomlyGeneratedWord = initialWords[randomIndex];
    initialWords.splice(randomIndex, 1);
    setRandomWord(randomlyGeneratedWord);
  }, [initialWords]);

  // Choose random word from words array function
  useEffect(() => {
    createRandomWord();
  }, [createRandomWord]);

  const handleUserAnswerSelection = (event) => {
    if (wordOneChecked === false && wordTwoChecked === false) {
      setUserAnswer(event.target.value);
      if (event.target.id === "wordOne") {
        setWordOneChecked(true);
        setWordTwoChecked(false);
      } else if (event.target.id === "wordTwo") {
        setWordOneChecked(false);
        setWordTwoChecked(true);
      }
    }
  };

  const handleNextQuestion = () => {
    // check to see there are unused words remaining (game to continue)
    if (initialWords.length > 0) {
      if (initialWords.length === 1) {
        onFinalQuestion = true;
        console.log(onFinalQuestion);
      }
      setAnswerCorrect((prevState) => {
        return "";
      });
      if (wordOneChecked || wordTwoChecked) {
        // randomly generates position index for correct answer location
        setRandomQuestionPosition((prevState) => {
          return Math.floor(Math.random() * 2 + 1);
        });
        //run API call
        createRandomWord();
        //increase question number
        setQuestionNumber(questionNumber + 1);
        //reset radio buttons
        setWordOneChecked(false);
        setWordTwoChecked(false);

        handleIconUpdate();
      } else {
        setModalIsOpen(true);
        setModalMessage("Please select a word before clicking Next");
        setModalTitle("Try Your Best!");
      }
    } else {
      handleIconUpdate();
      setIsGameOver((prevState) => {
        return true;
      });
    }
  };

  const handleIconUpdate = () => {
    progressBarIconArray.map((item, index) => {
      if (index <= questionNumber) {
        updatedIconsArray.push(faBookOpen);
      } else {
        updatedIconsArray.push(faBook);
      }
      return updatedIconsArray;
    });

    setProgressBarIconArray((prevState) => {
      return updatedIconsArray;
    });
  };

  const handleChange = (event) => {
    // console.log(event.target);
  };

  return (
    <div className="wrapper">
      {modalIsOpen ? (
        <ModalWindow
          modalIsOpen={modalIsOpen}
          setModalIsOpen={modalIsOpen}
          modalMessage={modalMessage}
          modalTitle={modalTitle}
          handleCloseModal={handleCloseModal}
        />
      ) : null}
      {isGameOver ? null :
        <ProgressBar
          questionNumber={questionNumber}
          progressBarIconArray={progressBarIconArray}
          progressBarIconColourArray={progressBarIconColourArray}
        />
      }
      <Score
        score={score}
        setScore={setScore}
        scoreDenominator={scoreDenominator}
      />
      {isGameOver ? (
        <GameOverDisplay
          scoreSubmitted={scoreSubmitted}
          setScoreSubmitted={setScoreSubmitted}
          score={score}
          setModalIsOpen={setModalIsOpen}
          setModalMessage={setModalMessage}
          setModalTitle={setModalTitle}
          setGameIsStarted={setGameIsStarted}
        />
      ) : (
        <QuestionsDisplay
          questionNumber={questionNumber}
          data={data}
          homophone={homophone}
          handleUserAnswerSelection={handleUserAnswerSelection}
          randomWord={randomWord}
          wordOneChecked={wordOneChecked}
          wordTwoChecked={wordTwoChecked}
          handleChange={handleChange}
          handleNextQuestion={handleNextQuestion}
          userAnswer={userAnswer}
          score={score}
          setScore={setScore}
          setScoreDenominator={setScoreDenominator}
          scoreDenominator={scoreDenominator}
          randomQuestionPosition={randomQuestionPosition}
          progressBarIconColourArray={progressBarIconColourArray}
          setProgressBarIconColourArray={setProgressBarIconColourArray}
          updatedIconsColourArray={updatedIconsColourArray}
          answerCorrect={answerCorrect}
          setAnswerCorrect={setAnswerCorrect}
          onFinalQuestion={onFinalQuestion}
        />
      )}
    </div>
  );
};

export default Game;