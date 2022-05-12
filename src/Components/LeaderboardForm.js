// LeaderboardForm.js

// Utilities
import firebase from "../utils/Firebase";
// Modules
import { useState } from "react";
import {getDatabase, ref, push} from "firebase/database"

const LeaderboardForm = (props) => {
    const { 
        setScoreSubmitted,
        score, 
        setUsernameDeclined
    } = props;

    const [userInput, setUserInput] = useState("")

    const handleUserInput = (event) => {
        setUserInput(event.target.value);
        console.log(userInput)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        if(userInput.trim() === ""){
            alert("Oops! Please enter a username to submit your score.")
            setUserInput("")
        } else if(userInput.trim()[0] === "<"){
            alert(`Sorry, usernames can't begin with a "<" character, please try a different username.`)
        } else {
            const leaderboardEntry = {
                username: userInput,
                score: score
            }
            push(dbRef, leaderboardEntry)
            setUserInput("")
            setScoreSubmitted((prevState) => {
                return true;
            })
        }
    }
    const handleAnonSubmit = (event) => {
        event.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        const leaderboardEntry = {
            username: "Anonymous",
            score: score
        }
        push(dbRef, leaderboardEntry)
        setUserInput("")
        setScoreSubmitted((prevState) => {
            return true;
        })
    }
    const handleDeclineSubmit = () => {
        // setScoreSubmitted((prevState) => {
        //     return true;
        // })
        setUsernameDeclined((true))
    }

    return (
        <form>
            <label name="leaderboardForm" htmlFor="userNameInput">Please enter a username for the Leaderboard. Caution: your username will be visible to all users.</label>
            <input onChange={handleUserInput} value={userInput} name="leaderboardForm" type="text" id="usernameInput" placeholder="Please enter a leaderboard name"/>
            <button onClick={handleSubmit} type="submit">Submit score</button>
            <button onClick={handleAnonSubmit}>Submit Anonymous Score</button>
            <button onClick={handleDeclineSubmit}>No, thank you!</button>
        </form>
    )
}

export default LeaderboardForm;