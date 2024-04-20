import React, { useContext, useEffect, useState } from 'react';  
import styles from "../../design/Filter.module.css"
import { AuthContext } from '../../shared/AuthContext';
import {toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
  
const Filter = ({filters,setFilters}) => { 

  const auth=useContext(AuthContext);
  const [venueList, setVenueList] = useState([]);
  const [location, setLocation] = useState('');  
  const [selectedDate, setSelectedDate] = useState('');  
  
  const handleLocationChange = (event) => {  
    setLocation(event.target.value);  
  };  
  
  const handleDateChange = (event) => {  
    setSelectedDate(event.target.value);  
  };  
  
  const handleFilter = () => {  
    // Perform filtering logic here  
    toast.success("Succesfully applied filter");
    setFilters({...filters,location:location,date:selectedDate})
    
  };  
  const handleRemoveFilter=()=>{
    toast.success("Succesfully Removed filter");
    setFilters({...filters,date:"",location:"",})
    setLocation("");
    setSelectedDate("");
  }
  useEffect(()=>{
    console.log(auth);
    if(auth.token!=="")
    {
      const fetchVenue = async () => {
        const res = await fetch(`${process.env.SERVER_URL}:5000/api/location/getlocation`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${auth.token}`
          }
        });
        const data = await res.json();
        setVenueList(data);
      }
      fetchVenue();
    }
    else{
      auth.login();
    }
  },[auth.login])
  return (  
    <div className={styles.filtercontainer}>  
      <div className={styles.filterbox}>  
        <div className={styles.filterfields}>  
          <div className={styles.locationinput}>  
            <label htmlFor="location">Location:</label>  
            <select id="location" value={location} onChange={handleLocationChange}>  
            <option value="">Select Location</option>  
            {
              
              venueList.map((venue)=>{
                return <option value={venue.location}>{venue.location}</option>  
              })
            }
            </select>  
          </div>  
          <div className={styles.dateinput}>  
            <label htmlFor="date">Select Date:</label>  
            <input  
              type="date"  
              id="date"  
              value={selectedDate}  
              onChange={handleDateChange} 
              className={styles.dateinp} 
            />  
          </div> 
         
        </div>  
        <button className={styles.filterbutton} onClick={handleFilter}>Apply Filter</button>
        <button className={styles.filterbutton} onClick={handleRemoveFilter}>Remove Filter</button>  
        {/* <ToastContainer /> */}
      </div>  
    </div>  
  );  
};  
  
export default Filter;  
