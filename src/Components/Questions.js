import { useState, useEffect } from "react";
import axios from "axios";

const Questions = (props) => {
  //Examples of Homophone Pairs https://www.englishclub.com/pronunciation/homophones-list.htm
  
  const {initialWords, setInitialWords, usedWords} = props;

  //store data from API
  const [data, setData] = useState([]);

  //store random word from words array
  const [randomWord, setRandomWord] = useState("");
  
  const [userAnswer, setUserAnswer] = useState("");
  
  const [questionNumber, setQuestionNumber] = useState(1);
  
  const [wordOneChecked, setWordOneChecked] = useState(false);
  
  const [wordTwoChecked, setWordTwoChecked] = useState(false);
  
  //store homophone generated from API
  let homophone;

  let randomlyGeneratedWord;


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
        // console.log(response.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [randomWord]);

  const createRandomWord = () => {
    // const generateRandomWord = () => {
      const randomNumber = Math.floor(Math.random() * initialWords.length);
      randomlyGeneratedWord = initialWords[randomNumber];
      console.log(randomlyGeneratedWord);
      checkForUsed();
    // }
  };
  
  const checkForUsed = () => {
    if (usedWords.length > 0) {
      usedWords.map((word) => {
        if (randomlyGeneratedWord === word) {
          createRandomWord();
          return;
        } else {
          setRandomWord(randomlyGeneratedWord);
          usedWords.push(randomlyGeneratedWord);
          console.log(usedWords);
        }
      })
    } else {
      setRandomWord(randomlyGeneratedWord);
      usedWords.push(randomlyGeneratedWord);
      console.log(usedWords);
    }

  }

  //Choose random word from words array function
  useEffect(() => {
    createRandomWord();
  }, []);

  useEffect(() => {
    correctAnswerChecker();
  },[userAnswer])

  const correctAnswerChecker = () => {
    // Logic to check if answer is correct or not
    console.log("user answer", userAnswer);
    console.log("API answer", homophone);
    if (userAnswer === homophone) {
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }
  }

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
    if (wordOneChecked || wordTwoChecked) {
      //function call to remove used word from array

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
  }

  const handleChange = (event) => {
    // console.log(event.target);
  }

  return (
    <div className="App">
      <h2>Question {questionNumber}:</h2>
      {data.map((item, index) => {
        homophone = item.word;
        return (
          <div key={index}>
            <p>{item.defs[0]}</p>
            <form action="#">
              <fieldset onChange={(event) => handleUserAnswerSelection(event)}>
                <legend>Click on the word that matches the definition</legend>
                <label htmlFor="wordOne">{randomWord}</label>
                <input type="radio" id="wordOne" name="homophone" value={randomWord} checked={wordOneChecked} onChange={ (event) => handleChange(event) }/>
                <label htmlFor="wordTwo">{item.word}</label>
                <input type="radio" id="wordTwo" name="homophone" value={item.word} checked={wordTwoChecked} onChange={ (event) => handleChange(event) }/>
              </fieldset>
            </form>      
            <button onClick={handleNextQuestion}>Next</button>      
            {/* {homophone = item.word} */}
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
