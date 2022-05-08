// About.js

// Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
// Components

const About =  (props) => {
    const { handleAboutButtonClick } = props;
    return (
        <section className="aboutSection" id="about">
                <div className="wrapper">
                    <div className="aboutTopMenu">
                        <p>What Do You No? was created by Alex, Ben, Madalina and Muhammad using data from the <a href="https://www.datamuse.com/api/" target="_blank" rel="noopener">Datamuse API</a></p>
                        <img src="../assets/laura-ohlman-x-VVJtAIPmk-unsplash.jpg" alt="Dictionaries sit on a table with an apple and a dip pen amongst foliage"/>
                        <p>
                            Photo by 
                            <a href="https://unsplash.com/@ohlmanphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener"> Laura Ohlman 
                            </a> on 
                            <a href="https://unsplash.com/s/photos/dictionary?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener"> Unsplash
                            </a>
                        </p>
                    </div>
                    <div className="lowerMenu">
                        <button
                        onClick={handleAboutButtonClick}className="hideMenuButton"
                        >
                            <FontAwesomeIcon icon={faCircleXmark} className="hideMenuIcon" />
                            <p>Hide Menu</p>
                        </button>
                    </div>
                </div>
            </section>
        
    )
}

export default About;