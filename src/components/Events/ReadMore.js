import React, { useContext, useEffect, useState } from "react";
import styles from "../../design/ReadMore.module.css";
import { AuthContext } from "../../shared/AuthContext";
import {toast } from 'react-toastify';

const ReadMore = () => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} at ${formattedTime}`;
  };
  const auth = useContext(AuthContext);
  const [eventData, setEventData] = useState({});
  const handleClick = async () => {
    if(eventData.isSubscribed)
    {
        toast.success("You UnSubscribed the event");
    }
    else
    {
        toast.success("You Subscribed The Event");
    }
    const res = await fetch(
      `${process.env.SERVER_URL}:5000/api/events/subscribeEvent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ eventId: eventData._id }),
      }
    );
    if(res.ok)
    {
        window.location.reload();
    }
  };

  useEffect(() => {
    if (auth.token !== "") {
      const path = window.location;
      const eventId = path.pathname.split("/")[2];
      const getEventDetails = async () => {
        const res = await fetch(
          `http://eventhubbackend.eastus.cloudapp.azure.com:5000/api/events/getspecificevent/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const data = await res.json();
        // console.log(data);
        setEventData(data[0]);
      };
      getEventDetails();
    } else {
      auth.login();
    }
  }, [auth.token]);

  return (
    <div className={styles.eventdescriptionpage}>
      <div className={styles.eventimage}>
        <img
          src={`http://eventhubbackend.eastus.cloudapp.azure.com:5000/api/events/getEventImage/${eventData.titleImage}`}
          alt="Event"
        />
      </div>
      <div className={styles.eventdetails}>
        <h1>{eventData.title}</h1>
        <p>
          <span></span> {formatDate(eventData.date)}
        </p>
        <p>
          <span>
            <h4 style={{ display: "inline" }}>Venue : </h4>
          </span>{" "}
          {eventData.locatio && eventData.locatio[0].location}
        </p>
        <div className={styles.descdetails}>
          <p>
            <span>
              <h3>Description:</h3>
            </span>{" "}
            {eventData.description}
          </p>
        </div>
        <button className={styles.subevnt} onClick={handleClick}>
          {eventData.isSubscribed ? "UnSubscribe Event" : "Subscribe Event"}
        </button>
      </div>
    </div>
  );
};

export default ReadMore;
