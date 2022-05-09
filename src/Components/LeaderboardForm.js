// LeaderboardForm.js

// Utilities
import firebase from "../utils/Firebase";
// Modules
import { useState } from "react";
import {getDatabase, ref, push} from "firebase/database"

const LeaderboardForm = () => {

    const [userInput, setUserInput] = useState("")

    const handleUserInput = (event) => {
        setUserInput(event.target.value);
        console.log(userInput)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        const leaderboardEntry = {
            username: userInput,
            score: (Math.floor(Math.random() * 10))
        }
        push(dbRef, leaderboardEntry)
        setUserInput("")
    }

    return (
        <form onSubmit={handleSubmit} type="submit">
            <label name="leaderboardForm" htmlFor="userNameInput">Please enter a name for the Leaderboard</label>
            <input onChange={handleUserInput} value={userInput} name="leaderboardForm" type="text" id="usernameInput" placeholder="Please enter a leaderboard name"/>
            <button type="submit">Submit score</button>
        </form>
    )
}

export default LeaderboardForm;