import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './meetList.module.css';
import { FaArrowRight } from 'react-icons/fa';
import {useNavigate, useParams } from 'react-router-dom';
import Meet from '../meet/meet';
import getData from '../../service/getData';
import LocationSearchBox from '../locationSearchBox/locationSearchBox';
import { getAllMeetData } from '../../apis/firebase';


function MeetList(props) {

  const navigate = useNavigate();

  const [meetList, setMeetList] = useState([]);
  let params = useParams();
  const depLoc = params.departure;
  const arrLoc = params.arrival;

  useEffect(() => {
      getAllMeetData()
      .then(setMeetList)
  }, []);

  
  return (
    <div className={styles.meetList}>
      <div className={styles.location}>
        <div className={styles.locationDeparture}>
          <label className={styles.meetListLabel} htmlFor='departure'>출발</label>
          <LocationSearchBox className={styles.locInfoBox} locParam={depLoc}/>
        </div>
        <FaArrowRight className={styles.locationArrow}/>
        <div className={styles.locationArrival}>
          <label className={styles.meetListLabel} htmlFor='arrival'>도착</label>
          <LocationSearchBox className={styles.locInfoBox} locParam={arrLoc}/>
        </div>    
        <button className={styles.btn_create} onClick={(e) => {
        navigate(`/create/${depLoc}/${arrLoc}`);
      }}>모집하기</button>
      </div>
      <ul className={styles.meetUl}>
        {let meets = meetList ? meetList : []
          meets.map((meet) => {
          if(meet.departure === depLoc && meet.arrival === arrLoc){
            return (
              <Meet
                key={meet.meetId}            
                meetId={meet.meetId}
                host={meet.host}
                title={meet.title}
                departure={meet.departure}
                arrival={meet.arrival}
                recruitment={meet.recruitment}
                meetTime={meet.meetTime}
                transport={meet.transport}
               />
              ) 
          }
        })}
      </ul>
    </div>
  );
}

export default MeetList;