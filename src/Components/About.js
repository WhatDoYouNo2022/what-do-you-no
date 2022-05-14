// About.js

// Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// Components

//Styling
import Image from "../assets/aboutSectionImage.jpg";

const About = (props) => {
  const { handleAboutButtonClick } = props;
  return (
    <section className="aboutSection" id="about">
      <div className="wrapper">
        <div className="aboutTopMenu">
          <div className="instructions">
            <h2>What Do You No?</h2>
            <h3>proper noun</h3>
            <ol>
              <li>A fun and educational word game designed to test your knowledge of homophonous words, e.g. piece and peace.</li>
              <li>A quiz <span className="strikethrough">maid</span> made <span className="strikethrough">two</span> to enhance your vocabulary buy by offering a definition and the choice between <span className="strikethrough">too</span> two different spellings.</li>
              <li>For each of the 10 questions, you will be given a definition of a word and you must select the word that matches the definition. Once the game ends, you can add your score to the leaderboard. Good luck!</li>
            </ol>
          </div>
          <hr />
          <p>
            <strong>What Do You No?</strong> was created by <a href="https://www.alexandrafriedman.ca/"
            target="_blank"
            rel="noopener noreferrer"
            >Alex</a>, <a 
            href="https://www.benbourgon.com/"
            target="_blank"
            rel="noopener noreferrer"
            >Ben</a>, <a 
            href="https://www.madalinacodes.com/"
            target="_blank"
            rel="noopener noreferrer">Madalina</a> and <a href="https://www.mwazir.com/"
            target="_blank"
            rel="noopener noreferrer">Muhammad</a> using data from the <a
              href="https://www.datamuse.com/api/"
              target="_blank"
              rel="noopener noreferrer"
            >Datamuse API
            </a>
          </p>
          <img
            src={Image}
            alt="Dictionaries sit on a table with an apple and a dip pen amongst foliage"
          />
          <p>
            Photo by <a
              href="https://unsplash.com/@ohlmanphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
            > Laura Ohlman
            </a> on <a
              href="https://unsplash.com/s/photos/dictionary?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          </p>
        </div>
        <div className="lowerMenu">
          <button onClick={handleAboutButtonClick} className="hideMenuButton">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="hideMenuIcon"
              aria-hidden="true"
            />
            <p>Hide Menu</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
