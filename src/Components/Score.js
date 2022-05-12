import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRankingStar,
} from "@fortawesome/free-solid-svg-icons";


const Score = (props) => {

    const { score } = props

    return (
        <h2>
            <FontAwesomeIcon
                icon={faRankingStar}
                className="scoreIcon"
                aria-hidden="true"
            />
            Score: {score}
        </h2>
    )

}

export default Score