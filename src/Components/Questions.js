import { useState, useEffect } from "react";
import axios from "axios";

const Questions = () => {
  //Examples of Homophone Pairs https://www.englishclub.com/pronunciation/homophones-list.htm
  const words = ["flour", "break", "aisle"];

  //store data from API
  const [data, setData] = useState([]);

  //store random word from words array
  const [randomWord, setRandomWord] = useState("");

  //store homophone generated from API
  // const [homophone, setHomophone] = useState("");

  const [userAnswer, setUserAnswer] = useState("");

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
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [randomWord]);

  //Choose random word from words array function
  useEffect(() => {
    const createRandomWord = () => {
      const randomNumber = Math.floor(Math.random() * words.length);
      setRandomWord(words[randomNumber]);
    };

    createRandomWord();
  }, []);

  useEffect(() => {
    correctAnswerChecker();
  },[userAnswer])

  const correctAnswerChecker = () => {
    // Need to add logic in here to check if answer is correct or not
    console.log(userAnswer);
    if (userAnswer === homophone) {
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }
  }

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(userAnswer);
    // correctAnswerChecker();
  }

  const handleUserAnswerSelection = (event) => {
    setUserAnswer(event.target.value);
  }

  return (
    <div className="App">
      <h2>Question 1:</h2>
      {data.map((item, index) => {
        homophone = item.word;
        return (
          <div key={index}>
            <p>{item.defs[0]}</p>
            <form action="#" onSubmit={handleSubmit}>
              <fieldset onChange={(event) => handleUserAnswerSelection(event)}>
                <legend>Click on the word that matches the definition</legend>
                <label htmlFor="wordOne">{randomWord}</label>
                <input type="radio" id="wordOne" name="homophone" value={randomWord} />
                <label htmlFor="wordTwo">{item.word}</label>
                <input type="radio" id="wordTwo" name="homophone" value={item.word}/>
              </fieldset>
            </form>      
            <button type="submit">Next</button>      
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
