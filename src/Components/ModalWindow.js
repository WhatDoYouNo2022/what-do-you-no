//ModalWindow.js

//Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ModalWindow = (props) => {
  const { modalTitle, modalMessage, modalIsOpen, handleCloseModal } = props;

  return (
    <div className={modalIsOpen ? "modal modalOpen" : "modal"}>
      <div className="modalMessageBox">
        <h2 className="modalHeading">{modalTitle}</h2>
        <p className="modalText">{modalMessage}</p>
        <button className="hideMenuButton" onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faCircleXmark} className="hideMenuIcon" />
          Close Message
        </button>
      </div>
      <button
        className="closeModal"
        aria-label="Close message box"
        onClick={handleCloseModal}
      ></button>
    </div>
  );
};

export default ModalWindow;
