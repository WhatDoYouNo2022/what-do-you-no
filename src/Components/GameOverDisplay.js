// GameOverDisplay.js

// Modules
import { useState } from "react";
// Components
import LeaderboardForm from "./LeaderboardForm";

const GameOverDisplay = (props) => {
    const { scoreSubmitted, setScoreSubmitted, score } = props;
    const [usernameDeclined, setUsernameDeclined] = useState(false);

    const refreshPage = () => {
        window.location.reload(false);
    }

    return (
        <>
            <p>Game Over!</p>
            {scoreSubmitted && usernameDeclined === false ? 
                <p>Your score has been submitted</p>
            : usernameDeclined ?
                <p>Ok, we won't submit your score. Thanks for playing!</p>
            :
            <LeaderboardForm 
                scoreSubmitted={scoreSubmitted} 
                setScoreSubmitted={setScoreSubmitted}
                score={score}
                setUsernameDeclined={setUsernameDeclined}
            />
            }
            <button onClick={refreshPage}>Restart Game</button>
        </>
    )
}

export default GameOverDisplay