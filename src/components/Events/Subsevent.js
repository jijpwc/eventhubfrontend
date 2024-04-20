import React, { useContext } from "react";
import "../../design/Subsevent.css";
import { AuthContext } from "../../shared/AuthContext";

const Subsevent = ({ events, handleEdit, title, createPage,handleDelete }) => {
  const auth=useContext(AuthContext);
  const handleUnSubscribe = async (id) => {
    const res = await fetch(`${process.env.SERVER_URL}:5000/api/events/subscribeEvent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ eventId: id }),
    });
    if (res.ok) {
      window.location.reload();
    }
  };
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
  return (
    <div className="subscribed-events-page">
      <h1>{title}</h1>
      <div className="event-cards">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <img
                src={`http:///eventhubbackend.eastus.cloudapp.azure.com:5000/api/events/getEventImage/${event.titleImage}`}
                alt={event.title}
              />
              <h2>{event.title}</h2>
              <p>{formatDate(event.date)}</p>
              {/* <p>{event.description}</p> */}
              <p>Venue : {event.locatio[0].location}</p>
              {createPage ? (
                <div className="btnDiv">
                  <button
                    className="read-more-button"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button className="read-more-button" onClick={()=>handleDelete(event._id)}>Delete</button>
                </div>
              ) : (
                <>
                  <button className="read-more-button" onClick={() => handleUnSubscribe(event._id)}>UnSubscribe</button>
                </>
              )}
            </div>
          ))
        ) : (
          <h3>
            There is No Events.
          </h3>
        )}
      </div>
    </div>
  );
};

export default Subsevent;
