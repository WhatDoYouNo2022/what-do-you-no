import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";


const Score = (props) => {

    const { score, scoreDenominator } = props

    return (
        <h2>
            <FontAwesomeIcon
                icon={faRankingStar}
                className="scoreIcon"
                aria-hidden="true"
            />
            Score: {score} / {scoreDenominator}
        </h2>
    )

}

export default Score;