import { useEffect } from 'react'

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
        setScore
    } = props;

    let homophone;

    let wordType;
    let definition;


    const correctAnswerChecker = () => {
        // Logic to check if answer is correct or not
        console.log("user answer", userAnswer);
        console.log("API answer", homophone);
        
        if (userAnswer === "") {
            console.log("User Answer is Empty");
        } else if (userAnswer === homophone) {
            console.log("Correct");
            setScore((prevState) => {
                return prevState + 1;
            })
        } else {
            console.log("Incorrect");
        }
    }

    useEffect(() => {
        correctAnswerChecker();
    }, [userAnswer])

    const evaluateWordType = (item) => {
        const wordTypeSymbol = item.defs[0].split("\t")[0];
        
        definition = item.defs[0].substring(item.defs[0].indexOf("\t"));
        
        if (wordTypeSymbol === "n") {
            wordType = "noun"
        } else if (wordTypeSymbol === "v") {
            wordType = "verb"
        } else if (wordTypeSymbol === "adj") {
            wordType = "adjective"
        } else if (wordTypeSymbol === "adv") {
            wordType = "adverb"
        } else {
            return null;
        }
    }

    return (
        <div className="App">
            <h2>Question {questionNumber}:</h2>
            {data.map((item, index) => {
                homophone = item.word;
                return (
                    <div key={index}>
                        {evaluateWordType(item)}
                        <p><em>{wordType} - </em>{definition}</p>
                        <form action="#">
                            <fieldset onChange={(event) => handleUserAnswerSelection(event)}>
                                <legend>Click on the word that matches the definition</legend>
                                <label htmlFor="wordOne">{randomWord}</label>
                                <input type="radio" id="wordOne" name="homophone" value={randomWord} checked={wordOneChecked} onChange={(event) => handleChange(event)} />
                                <label htmlFor="wordTwo">{item.word}</label>
                                <input type="radio" id="wordTwo" name="homophone" value={item.word} checked={wordTwoChecked} onChange={(event) => handleChange(event)} />
                            </fieldset>
                        </form>
                        <button onClick={handleNextQuestion}>Next</button>
                    </div>
                );
            })}
        </div>
    )
}

export default QuestionsDisplay;

