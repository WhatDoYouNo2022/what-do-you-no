import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const QuestionsDisplay = (props) => {
  const {
    questionNumber,
    data,
    handleUserAnswerSelection,
    randomWord,
    wordOneChecked,
    wordTwoChecked,
    handleChange,
    handleNextQuestion,
    userAnswer,
    setScore,
    setScoreDenominator,
    scoreDenominator,
    randomQuestionPosition,
    progressBarIconColourArray,
    setProgressBarIconColourArray,
    updatedIconsColourArray,
    setAnswerCorrect,
  } = props;

  let homophone;
  let wordType;
  let definition;

  // function to change colour of icon in progress bar (takes in answerType parameter which tells function if answer in correct or incorrect)
  const handleIconColourUpdate = (answerType) => {
    progressBarIconColourArray.map((item, index) => {
      // checks to see if current index in array is equal to the question number user is currently on (since array index starts at zero and question number starts 1, check is for questionNumber - 1)
      if (index === questionNumber - 1) {
        if (answerType === "Incorrect") {
          updatedIconsColourArray[index] = "redProgressIcon";
        } else if (answerType === "Correct") {
          updatedIconsColourArray[index] = "greenProgressIcon";
        }
      }
      return updatedIconsColourArray;
    });

    // update progress bar colour state to updated array per above
    setProgressBarIconColourArray((prevState) => {
      return updatedIconsColourArray;
    });
  };

  const correctAnswerChecker = () => {
    // Logic to check if answer is correct or not
    if (wordOneChecked === true || wordTwoChecked === true) {
      if (userAnswer === homophone) {
        setScore((prevState) => {
          return prevState + 1;
        });
        handleIconColourUpdate("Correct");
        setAnswerCorrect((prevState) => {
          return true;
        });
      } else {
        handleIconColourUpdate("Incorrect");
        setAnswerCorrect((prevState) => {
          return false;
        });
      }
      setScoreDenominator(scoreDenominator + 1);
    }
  };

  useEffect(() => {
    correctAnswerChecker();
  }, [userAnswer]);

  const evaluateWordType = (item) => {
    const wordTypeSymbol = item.defs[0].split("\t")[0];

    definition = item.defs[0].substring(item.defs[0].indexOf("\t"));

    if (wordTypeSymbol === "n") {
      wordType = "noun";
    } else if (wordTypeSymbol === "v") {
      wordType = "verb";
    } else if (wordTypeSymbol === "adj") {
      wordType = "adjective";
    } else if (wordTypeSymbol === "adv") {
      wordType = "adverb";
    } else {
      return null;
    }
  };

  return (
    <div className="wrapper">
      <h2 className="questionNumber">Question {questionNumber}:</h2>
      {data.map((item, index) => {
        homophone = item.word;
        return (
          <div key={index}>
            {evaluateWordType(item)}
            <p className="definition">
              <span className="wordType">{wordType} </span>
              {definition}.
            </p>
            <form action="#" className="questionForm">
              <fieldset onChange={(event) => handleUserAnswerSelection(event)}>
                <legend className="sr-only">
                  Click on the word that matches the definition
                </legend>
                <div className="wordOneContainer">
                  <label htmlFor="wordOne">
                    <p className="squigglyText" aria-hidden="true">
                      Lorem lorem ipsum dolor sit amet consectetur
                    </p>
                    <div className="answerContainer">
                      {randomQuestionPosition === 1 ? randomWord : item.word}
                      {wordOneChecked ? (
                        randomQuestionPosition === 1 ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="incorrectIcon"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="correctIcon"
                          />
                        )
                      ) : null}
                    </div>
                    <p className="squigglyText" aria-hidden="true">
                      Lorem lorem ipsum dolor sit amet consectetur
                    </p>
                  </label>
                  <input
                    type="radio"
                    id="wordOne"
                    name="homophone"
                    value={
                      randomQuestionPosition === 1 ? randomWord : item.word
                    }
                    checked={wordOneChecked}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="wordTwoContainer">
                  <label htmlFor="wordTwo">
                    <p className="squigglyText" aria-hidden="true">
                      Lorem lorem ipsum dolor sit amet consectetur
                    </p>
                    <div className="answerContainer">
                      {randomQuestionPosition === 1 ? item.word : randomWord}
                      {wordTwoChecked ? (
                        randomQuestionPosition === 1 ? (
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="correctIcon"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="incorrectIcon"
                          />
                        )
                      ) : null}
                    </div>
                    <p className="squigglyText" aria-hidden="true">
                      Lorem lorem ipsum dolor sit amet consectetur
                    </p>
                  </label>
                  <input
                    type="radio"
                    id="wordTwo"
                    name="homophone"
                    value={
                      randomQuestionPosition === 1 ? item.word : randomWord
                    }
                    checked={wordTwoChecked}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </fieldset>
            </form>
            <button onClick={handleNextQuestion} className="nextQ">
              <FontAwesomeIcon
                className="buttonIcon"
                icon={faChevronRight}
                aria-hidden="true"
              />
              <p>Next</p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsDisplay;
