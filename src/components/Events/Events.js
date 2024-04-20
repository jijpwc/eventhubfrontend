import React, { useState, useEffect } from "react";
import "../../design/Events.module.css";
import Eventcard from "./Eventcard"
import EventBar from "./EventBar";
import Filter from "./Filter";
import Spinner from "./Spinner";
const Events = () => {
  const [eventData, setEventData] = useState([]);
  const [filters, setFilters] = useState({ date: "", location: "", IsEventOver: 'upcoming' })
  const [isspinning, setisspinning] = useState(false);
  useEffect(() => {
    const fetchEventData = async () => {
      setisspinning(true);
      const res = await fetch(`${process.env.SERVER_URL}:5000/api/events/getEvents`, {
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify({ "filters": filters }),
      });
      const data = await res.json();

      const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEventData(sortedData);

      setisspinning(false);
    }
    fetchEventData();

  }, [filters])


  return (
    <>
      {isspinning && <Spinner />}
      <EventBar filters={filters} setFilters={setFilters} />
      <Filter filters={filters} setFilters={setFilters} />

      {eventData.map((card) => (
        <Eventcard
          key={card._id}
          id={card._id}
          title={card.title}
          titleImage={card.titleImage}  
          description={card.description}  
          dateTime={card.date}  
          location={card.locatio} 
          author={card.authors[0]} 
        />  
      ))}  
    {/* </div>  */}
    </> 
  );  
};  
  
export default Events;  
