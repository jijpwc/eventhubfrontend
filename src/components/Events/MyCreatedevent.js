import React, { useState } from 'react';  
import styles from '../../design/cardcontainer.module.css';  
  
const Addevent = () => {  
  const data = [  
    {  
      id: 1,  
      name: 'Event 1',  
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',  
      venue: 'Venue 1',  
    },  
    {  
      id: 2,  
      name: 'Event 2',  
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',  
      venue: 'Venue 2',  
    },  
    {  
      id: 3,  
      name: 'Event 3',  
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',  
      venue: 'Venue 3',  
    },  
    // Add more data objects as needed  
  ];  
  
  const [hoveredCard, setHoveredCard] = useState(null);  
  
  const handleCardHover = (cardId) => {  
    setHoveredCard(cardId);  
  };  
  
  const handleCardLeave = () => {  
    setHoveredCard(null);  
  };  
  
  return (  
    <div className={styles.cardcontainer}>  
      {data.map((item) => (  
        <div  
          className={`${styles.card} ${hoveredCard ===` ${styles.item} ? ${styles.hovered} : ''`}`}  
          key={item.id}  
          onMouseEnter={() => handleCardHover(item.id)}  
          onMouseLeave={handleCardLeave}  
        >  
          <img src="image.jpg" alt="Event" className={styles.cardimage} />  
          <div className={styles.cardcontent}>  
            <h3 className={styles.cardtitle}>{item.name}</h3>  
            <p className={styles.carddescription}>{item.description}</p>  
            <p className={styles.cardvenue}>Venue: {item.venue}</p>  
            {hoveredCard === item.id && (  
              <div className={styles.cardbuttons}>  
                <button className={styles.editbutton}>Edit</button>  
                <button className={styles.deletebutton}>Delete</button>  
              </div>  
            )}  
          </div>  
        </div>  
      ))}  
    </div>  
  );  
};  
  
export default Addevent;  
