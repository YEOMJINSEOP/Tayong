import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import {useNavigate, useParams } from 'react-router-dom';
import { getAllMeetData, onUserStateChange } from '../../apis/firebase';
import styles from './meetList.module.css';
import Meet from '../meet/Meet';
import LocationSearchBox from '../locationSearchBox/LocationSearchBox';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../recoil/user';

function MeetList(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const userState = useRecoilValue(currentUserState);
  useEffect(() => {
    setUser(userState);
  }, []);

  const [meetList, setMeetList] = useState([]);
  let params = useParams();
  const depLoc = params.departure;
  const arrLoc = params.arrival;

  async function getMeets(){
    let meets;
    try{
      meets = await getAllMeetData();
    } catch{
      meets = [];
    }
    return meets
  }

  useEffect(() => {
    getMeets()
      .then((data) => {
        setMeetList(data);
        return data;
      })
      .catch(
        console.error
      )
  }, []);

  const createBtnHandler = () => {
    if(!user){
      alert('로그인이 필요합니다.');
      return;
    }
    else{
      navigate(`/create/${depLoc}/${arrLoc}`);
    }
  }
  
  return (
    <div className={styles.meetList}>
      <div className={styles.locInfo}>
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
        </div>
        <button className={styles.btn_create} onClick={createBtnHandler}>모집하기</button>
      </div>
      <ul className={styles.meetUl}>
        {meetList.map((meet) => {
          if(meet.departure === depLoc && meet.arrival === arrLoc){
            const {arrival, departure, host, meetId, meetTime, recruitment, title, transport, participant} = meet;
            return (
              <Meet
                key={meetId}            
                meetId={meetId}
                host={host}
                title={title}
                departure={departure}
                arrival={arrival}
                recruitment={recruitment}
                meetDate={meetTime.date}
                meetTime={meetTime.time}
                transport={transport}
                participant={participant}
               />
            ); 
          }
          return null;
        })}
      </ul>
    </div>
  );
}

export default MeetList;