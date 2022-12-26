import React, { useEffect, useState } from 'react';
import styles from './locationSelector.module.css';

import { FaArrowRight } from 'react-icons/fa';

import Departure from '../departure/departure';
import Arrival from '../arrival/arrival';
import { useNavigate, useParams } from 'react-router-dom';
import getData from '../../service/getData';



function LocationSelector(props) {


  const [loginId, setLoginId] = useState("로그인");
  useEffect(() => {
    const getUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue';
    getData(getUrl)
      .then(data => {
        console.log(data);
        const isLoginSucceed = data.data[0]['loginSuccess'];
        const loginId = data.data[0]['loginId'];
        console.log(isLoginSucceed);
        setLoginId(loginId);
      })  
  }, []);

  const navigate = useNavigate();
  
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');


  const departureHandler = (departure) => {
    setDeparture(departure);
  };

  const arrivalHandler = (arrival) => {
    setArrival(arrival);
  };

  const submitHandler = () => {
    if(departure === ""){
      alert('지정된 출발지로 설정하세요');
      return
    }
    else if(arrival === ""){
      alert('지정된 도착지로 설정하세요');
      return
    }
    navigate(`/list/${departure}/${arrival}`);
  }

  return (
    <div className={styles.locationSelector}>
      <div className={styles.location}>
        <div className={styles.departure}>
          <div className={styles.info}><span className={styles.ocos}>"</span><span>출발지</span><span className={styles.ocos}>"</span>를 입력해 주세요</div>
          <Departure className={styles.departureInput} departure={departure} onSet={departureHandler}/>
        </div>
        <FaArrowRight className={styles.arrow}/>
        <div className={styles.arrival}>
          <div className={styles.info}><span className={styles.ocos}>"</span><span>도착지</span><span className={styles.ocos}>"</span>를 입력해 주세요</div>
          <Arrival className={styles.arrivalInput} arrival = {arrival} onSet={arrivalHandler}/>
        </div>
      </div>
      <button 
        className={styles.submitBtn}
        onClick={submitHandler}
          >
        같이 이동할 사람 찾기
      </button>
    </div>
  );
  
}

export default LocationSelector;