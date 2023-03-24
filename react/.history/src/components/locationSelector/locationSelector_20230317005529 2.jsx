import React, {useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './locationSelector.module.css';
import Departure from '../departure/departure';
import Arrival from '../arrival/arrival';
import { FaArrowRight } from 'react-icons/fa';
import getData from '../../service/getData';


function LocationSelector(props) {

  const [locationName, setLocationName] = useState([]);
  useEffect(() => {
    const urlLocation = 'data/location.json';
    getData(urlLocation)
    .then(res => {
      setLocationName(res['data'].map((loc) => loc.name));
    });
  }, []);

  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');


  const departureHandler = (departure) => {
    setDeparture(departure);
  };

  const arrivalHandler = (arrival) => {
    setArrival(arrival);
  };

  const navigate = useNavigate();
  
  const submitHandler = () => {
    console.log('departure: ', departure, 'arrival: ', arrival);
    if(!locationName.includes(departure) || !locationName.includes(arrival)){
      alert(`지원되는 지역으로 검색하세요\n: ${locationName}`);
      return
    }
    navigate(`/list/${departure}/${arrival}`);
  }

  return (
    <div className={styles.locationSelector}>
      <div className={styles.location}>
        <div className={styles.departure}>
          <div className={styles.info}><span>"출발지"</span>를 입력해 주세요</div>
          <Departure className={styles.departureInput} departure={departure} onSet={departureHandler} location={location}/>
        </div>
        <FaArrowRight className={styles.arrow}/>
        <div className={styles.arrival}>
          <div className={styles.info}><span>"도착지"</span>를 입력해 주세요</div>
          <Arrival className={styles.arrivalInput} arrival = {arrival} onSet={arrivalHandler} location={location}/>
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