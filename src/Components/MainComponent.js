// MainComponent.js

// Modules
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Components
import LandingPage from "./LandingPage.js";
import Game from "./Game.js";

const MainComponent = (props) => {

    const { 
        handleAboutButtonClick,
        gameIsStarted,
        setGameIsStarted
    } = props

    let initialWords = [];
    let updatedIconsColourArray = [];
    // state variable to hold an array of initial words
    // const [ initialWords, setInitialWords ] = useState([])
    initialWords.push(
            "flour",
            "break",
            "aisle",
            "tail",
            "maid",
            "waist",
            "pray",
            "some",
            "ate",
            "son"
    );

    // empties out icons colour array
    updatedIconsColourArray.splice(0, 10);
    
    // resets array to have only white icons
    updatedIconsColourArray.push(
        "white-progress-icon",
        "white-progress-icon",
        "white-progress-icon",
        "white-progress-icon",
        "white-progress-icon",
        "white-progress-icon",
        "white-progress-icon",
        "white-progress-icon",
        "white-progress-icon",
        "white-progress-icon",
    );

    return (
        <>
            {
                gameIsStarted ? 
                    <Game 
                        initialWords={initialWords}
                        updatedIconsColourArray={updatedIconsColourArray}
                        setGameIsStarted={setGameIsStarted}
                    /> 
                    :
                    <LandingPage 
                        initialWords={initialWords}
                        setGameIsStarted={setGameIsStarted}
                        handleAboutButtonClick={handleAboutButtonClick}
                        updatedIconsColourArray={updatedIconsColourArray}
                    />
            }
        </>
    )
}

export default MainComponent;