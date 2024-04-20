import React, { useContext } from "react";
import styles from "../../design/Eventcard.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/AuthContext";

const Eventcard = (props) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const dateTimeString = props.dateTime;
    const dateTime = new Date(dateTimeString);

    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
    const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);
    const handlereadmore = () => {
        if (auth.token === "") {
            navigate("/login");
        } else {
            
            navigate(`/event/${props.id}`);
        }
    }
    return (

        <div className={styles.card}>
            <img src={`http://eventhubbackend.eastus.cloudapp.azure.com:5000/api/events/getEventImage/${props.titleImage}`} alt="Img" className={styles.cardimg} />
            <div className={styles.cardbody}>
                <h2 className={styles.cardtitle}>{props.title}</h2>
                {/* <p className={styles.carddescription}>{props.description}</p> */}
                <br />
                <h4 className={styles.cardpricing}>Date : {formattedDate} </h4>
                <h4 className={styles.cardpricing}>Time : {formattedTime}</h4>
                <h4 className={styles.cardpricing}><span>Venue :</span> {props.location[0].location}</h4>
                <h4 className={styles.cardpricing}><span>Organised By : </span>{props.author.name}</h4>
                <button className={styles.cardbtn} onClick={handlereadmore}>Read More</button>
            </div>
        </div>
    );
};

export default Eventcard;  
