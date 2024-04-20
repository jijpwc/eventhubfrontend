import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../../design/Addform.module.css";
import { useNavigate } from "react-router-dom";
import MyCreatedevent from "./MyCreatedevent";
import { AuthContext } from "../../shared/AuthContext";
import Subsevent from "./Subsevent";
import Modal from "../Common/Modal";
import Spinner from "./Spinner";
import {toast } from 'react-toastify';

const Addform = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [venueList, setVenueList] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    locationId: "",
  });
  const [createdEvents, setCreatedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editEventData, setEditEventData] = useState({});
  const [isspinning, setisspinning] = useState(false);
  const [refresh,setRefresh]=useState(false);
  

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };
  const handUpdate = async (e) => {
    e.preventDefault();
    toast.success("Succesfully Updated ")
    const data = new FormData();
    data.append("title", editEventData.title);
    data.append("description", editEventData.description);
    data.append("date", editEventData.date);
    data.append("locationId", editEventData.location);
    data.append("eventId",editEventData._id);
    console.log(editImageRef.current.files.length===0);
    if(editImageRef.current.files.length!==0)
    {
      data.append("imageDetails", editImageRef.current.files[0]);
      data.append("imagechanged",true);
    }else{
      data.append("imagechanged",false);
    }
    const res = await fetch(`${process.env.SERVER_URL}:5000/api/events/updateEvents`,{
      method:"PATCH",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      body: data,
    })
    setShowModal(false);
    if(res.ok)
    {
      setRefresh(!refresh);
    }
  };

  const handleEdit = (editData) => {
    setShowModal(true);
    setEditEventData(editData);
  };

  const handleDelete=async(id)=>{
    toast.success("Succesfully Deleted the Event");
    const res = await fetch(`${process.env.SERVER_URL}:5000/api/events/deleteEvents`,{
      method:"DELETE",
      headers:{
        "content-type":"application/json",
        "Authorization":`Bearer ${auth.token}`
      },
      body:JSON.stringify({"eventId":id})
    })
    if(res.ok)
    {
      setRefresh(!refresh);
    }
  }

  const imageRef = useRef(null);
  const editImageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Event Added Succesfully")
    const data = new FormData();
    data.append("title", eventData.title);
    data.append("description", eventData.description);
    data.append("date", eventData.date);
    data.append("locationId", eventData.locationId);
    data.append("imageDetails", imageRef.current.files[0]);

    //const data={...eventData,imageDetails:imageRef.current.files[0],authorId:"6616cb4f2b543fd062acffab"}
    //Do something with the form data, like sending it to a server
    const res = await fetch(`${process.env.SERVER_URL}:5000/api/events/createEvent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      body: data,
    });
    if (res) {
      navigate("/");
    }
  };

  useEffect(() => {
    //console.log(auth);
    if (auth.token !== "") {
      const fetchVenue = async () => {
        const res = await fetch(
          `${process.env.SERVER_URL}:5000/api/location/getlocation`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const data = await res.json();
        setVenueList(data);
      };
      const fetchCreatedEvents = async () => {
        setisspinning(true);
        const res = await fetch(
          `${process.env.SERVER_URL}:5000/api/events/myCreatedEvents`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const data = await res.json();
        setCreatedEvents(data);
        setisspinning(false);
      };
      fetchVenue();
      fetchCreatedEvents();
    } else {
      auth.login();
    }
  }, [auth.token,refresh]);

  return (
    <>
      <Modal
        show={showModal}
        setShowModal={setShowModal}
        eventData={editEventData}
        setEditEventData={setEditEventData}
        venueList={venueList}
        handUpdate={handUpdate}
        editImageRef={editImageRef}
      />
      {isspinning && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.inpLabel} htmlFor="eventName">
          Name of Event:
        </label>
        <input
          className={styles.formInput}
          type="text"
          id="eventName"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          required
        />

        <label className={styles.inpLabel} htmlFor="description">
          Description:
        </label>
        <textarea
          className={styles.formInput}
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label className={styles.inpLabel} htmlFor="dateTime">
          Date/Time:
        </label>
        <input
          className={styles.formInput}
          type="datetime-local"
          id="dateTime"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />

        <label className={styles.inpLabel} htmlFor="venue">
          Venue:
        </label>
        <select
          className={styles.formSelect}
          id="venue"
          name="locationId"
          value={eventData.locationId}
          onChange={handleChange}
          required
        >
          <option value="">Select Venue</option>
          {venueList.map((option) => (
            <option key={option._id} value={option._id}>
              {option.location}
            </option>
          ))}
        </select>
        <label className={styles.inpLabel}>Select Image:</label>
        <input className={styles.formInput} type="file" ref={imageRef}></input>

        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
      {/* <MyCreatedevent /> */}
      <br />
      <Subsevent events={createdEvents} handleEdit={handleEdit} title={"Created Events"} createPage={3} handleDelete={handleDelete} />
    </>
  );
};

export default Addform;
