// MainComponent.js

// Components
import LandingPage from "./LandingPage.js";
import Game from "./Game.js";

const MainComponent = (props) => {
  const { handleAboutButtonClick, gameIsStarted, setGameIsStarted } = props;

  let initialWords = [];
  let updatedIconsColourArray = [];
  // variable to hold an array of initial words to find their homophones
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
    "whiteProgressIcon",
    "whiteProgressIcon",
    "whiteProgressIcon",
    "whiteProgressIcon",
    "whiteProgressIcon",
    "whiteProgressIcon",
    "whiteProgressIcon",
    "whiteProgressIcon",
    "whiteProgressIcon",
    "whiteProgressIcon"
  );

  return (
    <>
      {gameIsStarted ? (
        <Game
          initialWords={initialWords}
          updatedIconsColourArray={updatedIconsColourArray}
          setGameIsStarted={setGameIsStarted}
        />
      ) : (
        <LandingPage
          initialWords={initialWords}
          setGameIsStarted={setGameIsStarted}
          handleAboutButtonClick={handleAboutButtonClick}
          updatedIconsColourArray={updatedIconsColourArray}
        />
      )}
    </>
  );
};

export default MainComponent;
