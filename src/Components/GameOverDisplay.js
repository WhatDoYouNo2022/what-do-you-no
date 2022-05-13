// GameOverDisplay.js

// Modules
import { useState } from "react";
// react confetti found here: https://www.npmjs.com/package/react-confetti
import Confetti from "react-confetti"
// Components
import LeaderboardForm from "./LeaderboardForm";
import useWindowSize from "../Hooks/useWindowSize";

const GameOverDisplay = (props) => {
    const { scoreSubmitted, setScoreSubmitted, score } = props;
    const [usernameDeclined, setUsernameDeclined] = useState(false);
    const { width, height } = useWindowSize();

    const refreshPage = () => {
        window.location.reload(false);
    }
    const confettiColors = ['#6056f9', '#fff', '#cfff31']
    return (
        <>
            <Confetti
                width={width}
                height={height}
                colors={confettiColors}
                numberOfPieces={200}
            />
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

export default GameOverDisplay;