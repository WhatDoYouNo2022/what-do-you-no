import { useState, useEffect } from "react";
import axios from "axios";

const FetchData = () => {
  //Examples of Homophone Pairs https://www.englishclub.com/pronunciation/homophones-list.htm
  const words = ["flour", "break", "aisle"];

  //store data from API
  const [data, setData] = useState([]);

  //store random word from words array
  const [randomWord, setRandomWord] = useState("");

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

  return (
    <div className="App">
      {data.map((item, index) => {
        return (
          <div key={index}>
            <p>{randomWord}</p>
            <p>{item.word}</p>
            <p>{item.defs[0]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FetchData;
