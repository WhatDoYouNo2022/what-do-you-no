import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const Score = (props) => {

    const { score, scoreDenominator } = props

    return (
        <h2 className="score">
            <FontAwesomeIcon
                icon={faStar}
                className="scoreIcon"
                aria-hidden="true"
            />
            Score: {score} / {scoreDenominator}
        </h2>
    )

}

export default Score;