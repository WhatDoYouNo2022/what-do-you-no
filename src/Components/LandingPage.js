//LandingPage.js

//Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const LandingPage = (props) => {
  const { 
    handleAboutButtonClick,
    setGameIsStarted,
  } = props;

  
  const handleStartGame = () => {
    setGameIsStarted(true);
  };

  return (
    <div className="wrapper">
      <div className="bookCover">
        <div className="pagesContainer">
          <div className="topPages"></div>
          <div className="sidePages"></div>
        </div>
        <div className="bookCoverContent">
          <h2 className="bookTitle">What Do You No?</h2>
          <div className="bookTitleUnderline"></div>
          <h3 className="firstEdition">First Edition</h3>
          <h3 className="volumeOne">Volume 1</h3>
          <div className="flexContainer">
            <button
              className="mainMenuControls"
              onClick={handleAboutButtonClick}
            >
              <FontAwesomeIcon
                className="buttonIcon"
                icon={faChevronRight}
                aria-hidden="true"
              />
              <p>Instructions</p>
            </button>
            <button
              className="mainMenuControls"
              onClick={handleStartGame}
            >
              <FontAwesomeIcon
                className="buttonIcon"
                icon={faBookOpen}
                aria-hidden="true"
              />
              <p>Start</p>
            </button>
          </div>
          <h3 className="junoPress">
            <a
              href="https://junocollege.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Juno College Press
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
