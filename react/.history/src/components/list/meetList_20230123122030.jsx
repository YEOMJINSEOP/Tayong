import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './meetList.module.css';
import { FaArrowRight } from 'react-icons/fa';
import {useNavigate, useParams } from 'react-router-dom';
import Meet from '../meet/meet';
import getData from '../../service/getData';
import LocationSearchBox from '../locationSearchBox/locationSearchBox';


function MeetList(props) {


  const navigate = useNavigate();

  const [meetList, setMeetList] = useState([]);
  let params = useParams();
  const depLoc = params.departure;
  const arrLoc = params.arrival;

  const meetUrl = 'data/meet.json';
  useEffect(() => {
      getData(meetUrl)
      .then(data => {
      setMeetList(data['data']);
  })
  }, []);

  
  return (
    <div className={styles.meetList}>
      <div className={styles.location}>
        <div className={styles.locationDeparture}>
          <label className={styles.meetListLabel} htmlFor='departure'>출발</label>
          <LocationSearchBox className={styles.locInfoBox} location={depLoc}/>
        </div>
        <FaArrowRight className={styles.locationArrow}/>
        <div className={styles.locationArrival}>
          <label className={styles.meetListLabel} htmlFor='arrival'>도착</label>
          <LocationSearchBox className={styles.locInfoBox} location={arrLoc}/>
        </div>    
      </div>

      <button className={styles.btn_create} onClick={(e) => {
        navigate(`/create`);
      }}>모집하기</button>
      <ul className={styles.meetUl}>
        {meetList.map((item) => {
          if(item.departure === depLoc && item.arrival === arrLoc){
            return (
              <Meet            
                key={item.id}
                id={item.id}
                title={item.title}
                departure={item.departure}
                arrival={item.arrival}
                recruitment={item.recruitment}
                remainingTime={item.remainingTime}
                transport={item.transport}
               />
              ) 
          }
        })}
      </ul>
    </div>
  );
}

export default MeetList;