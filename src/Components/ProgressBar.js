import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProgressBar = (props) => {
    
    const { 
        progressBarIconArray, 
        progressBarIconColourArray
    } = props;


    return (
        <>
            <div className="progress-bar">
                <ul>
                    {progressBarIconArray.map((item, index) => {
                        return (
                            <li key={index}><FontAwesomeIcon icon={item} className={progressBarIconColourArray[index]} /></li>
                        )
                    })}
                </ul>
            </div>
            
        </>
    )
}

export default ProgressBar