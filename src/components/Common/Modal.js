import styles from "../../design/Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = (props) => {
  const editFunction = (e) => {
    props.setEditEventData({ ...props.eventData, [e.target.name]: e.target.value });
  };
  const content = (
    <div className={styles.modal} style={props.style}>
      <header className={styles.modalheader}>
        <h2>{props.header}Update Event</h2>
        <span onClick={()=>props.setShowModal(false)} className={styles.crossBtn}>&#x2715;</span>
      </header>
      <form
        className={styles.form}
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={styles.modalcontent}>
          {props.children}
          <label className={styles.inpLabel}>Name of the Event:</label>
          <input
            type="text"
            className={styles.formInput}
            value={props.eventData.title}
            name="title"
            onChange={editFunction}
          />
          <label className={styles.inpLabel}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={props.eventData.description}
            onChange={editFunction}
            required
            className={styles.formInput}
          ></textarea>
          <label className={styles.inpLabel}>Date/Time:</label>
          <input
            type="datetime-local"
            className={styles.formInput}
            value={props.eventData.date}
            name="date"
            onChange={editFunction}
          />
          <label className={styles.inpLabel}>Venue:</label>
          <select
            className={styles.formSelect}
            value={props.eventData.location}
            name="location"
            onChange={editFunction}
          >
            <option>Select Venue</option>
            {props.venueList.map((option) => (
              <option key={option._id} value={option._id}>
                {option.location}
              </option>
            ))}
          </select>
          <label className={styles.inpLabel}>
            Upload If you want To change Image:
          </label>
          <input
            className={styles.formInput}
            type="file"
            ref={props.editImageRef}

          ></input>
          <button className={styles.updateBtn} onClick={props.handUpdate}>Update</button>
        </div>
        <footer className={styles.modalfooter}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && (
        <Backdrop onClick={() => props.setShowModal(false)}></Backdrop>
      )}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={styles.modal}
      >
        <ModalOverlay {...props}></ModalOverlay>
      </CSSTransition>
    </React.Fragment>
  );
};
export default Modal;
