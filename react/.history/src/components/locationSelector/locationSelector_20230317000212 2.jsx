import React, {useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './locationSelector.module.css';
import Departure from '../departure/departure';
import Arrival from '../arrival/arrival';
import { FaArrowRight } from 'react-icons/fa';
import getData from '../../service/getData';


function LocationSelector(props) {

  const [location, setLocation] = useState([]);

  useEffect(() => {
    const urlLocation = 'data/location.json';
    getData(urlLocation)
    .then(res => setLocation(res['data']));
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

  const getLocation = (location) => {
    return location.map((loc) => {
      return loc.name
    } )
  }
  
  const submitHandler = () => {
    if(departure === ""){
      console.log(location);
      alert(`지정된 출발지로 설정하세요\n: ${getLocation(location)}`);
      return
    }
    else if(arrival === ""){
      alert('지정된 출발지로 설정하세요\n: 디지털미디어시티, 한국항공대학교, 행신, 홍대, 신촌, 기타');
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