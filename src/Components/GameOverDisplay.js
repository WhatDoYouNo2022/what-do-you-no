import LeaderboardForm from "./LeaderboardForm";

const GameOverDisplay = (props) => {
    const { scoreSubmitted, setScoreSubmitted } = props;

    const refreshPage = () => {
        window.location.reload(false);
    }

    return (
        <>
            <p>Game Over!</p>
            {scoreSubmitted ? 
            <p>Your score has been submitted</p>
            : <LeaderboardForm scoreSubmitted={scoreSubmitted} setScoreSubmitted={setScoreSubmitted}/>
            }
            <button onClick={refreshPage}>Restart Game</button>
        </>
    )
}

export default GameOverDisplay