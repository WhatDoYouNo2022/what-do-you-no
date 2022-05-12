import { useState, useEffect } from "react";
import axios from "axios";
import GameOverDisplay from "./GameOverDisplay";
import QuestionsDisplay from "./QuestionsDisplay";
import Score from "./Score";

const Game = (props) => {
  //Examples of Homophone Pairs https://www.englishclub.com/pronunciation/homophones-list.htm
  
  const { initialWords } = props;

  //store data from API
  const [data, setData] = useState([]);

  //store random word from words array
  const [randomWord, setRandomWord] = useState("");
  
  const [userAnswer, setUserAnswer] = useState("");
  
  const [questionNumber, setQuestionNumber] = useState(1);

  const [scoreDenominator, setScoreDenominator] = useState(-1);
  
  const [wordOneChecked, setWordOneChecked] = useState(false);
  
  const [wordTwoChecked, setWordTwoChecked] = useState(false);
  
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);

  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const [randomQuestionPosition, setRandomQuestionPosition] = useState(1);
  
  //store homophone generated from API
  let homophone;

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
        // console.log(err);
      });
  }, [randomWord]);

  const createRandomWord = () => {

      const randomIndex = Math.floor(Math.random() * initialWords.length);
      const randomlyGeneratedWord = initialWords[randomIndex];
      initialWords.splice(randomIndex, 1)
      console.log(initialWords);
      setRandomWord(randomlyGeneratedWord);      
  }

  //Choose random word from words array function
  useEffect(() => {
    createRandomWord();
  }, []);
  

  const handleUserAnswerSelection = (event) => {
    setUserAnswer(event.target.value);
    if (wordOneChecked === false && wordTwoChecked === false) {
      if (event.target.id === "wordOne") {
        setWordOneChecked(true);
        setWordTwoChecked(false);
      } else if (event.target.id === "wordTwo") {
        setWordOneChecked(false);
        setWordTwoChecked(true);
      }
    }
  }

  const handleNextQuestion = () => {
    // check to see there are unused words remaining (game to continue)
    if (initialWords.length > 0) {
      if (wordOneChecked || wordTwoChecked) {
        // randomly generates position index for correct answer location
        setRandomQuestionPosition((prevState) => {
          return Math.floor((Math.random() * 2) + 1)
        })
        //run API call
        createRandomWord();
        //increase question number
        setQuestionNumber(questionNumber + 1);
        //reset radio buttons
        setWordOneChecked(false);
        setWordTwoChecked(false);
      } else {
        alert("Please select a word")
      }
    } else {
      setIsGameOver(prevState => {
        return true;
      });      
    }
  }

  const handleChange = (event) => {
    // console.log(event.target);
  }

  return (
    <div>
      <Score score={score} setScore={setScore} scoreDenominator={scoreDenominator} />
      { isGameOver ? <GameOverDisplay scoreSubmitted={scoreSubmitted} setScoreSubmitted={setScoreSubmitted}/> : 
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
      /> }
      
    </div>
  );
}

export default Game;
