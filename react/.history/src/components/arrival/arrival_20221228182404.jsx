import React, { useEffect, useRef, useState } from 'react';
import styles from './arrival.module.css';
import getData from '../../service/getData';

import { FaSearch } from 'react-icons/fa';

function Arrival({onSet}) {

  const [location, setLocation] = useState([]);
  const [inputStr, setInputStr] = useState('');
  const inputArrival = useRef('');

      //  ------파일에 있는 더미 데이터로 실행해볼 경우
      const url = 'data/location.json';
      useEffect(() => {
        getData(url)
        .then(res => setLocation(res['data']));
      }, []);
      // -----------------------------------------

  // const locationUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/getlocation';
  // useEffect(() => {
  //  getData(locationUrl)
  //   .then(res => res['data'])
  //   .then(data => {
  //     console.log("위치 데이터를 받아왔습니다🥕")
  //     setLocation(data);
  //   })
  // }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const autoComplete = (e) => {
    setInputStr(e.target.innerText);
    onSet(e.target.innerText);
    e.target.parentNode.style.visibility = 'hidden';
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.arrival}>     
          <div className={styles.inputBox}>
            <input
                className={styles.input}
                type="text"
                id='arrival'
                name='arrival'
                value = {inputStr}
                onChange = {
                  (e) => {
                    setInputStr(e.target.value);
                  }
                }
            />
            <FaSearch className={styles.searchIcon}/>
          </div>

          <div className={styles.searchDropDown}>
              <ul>
                {location.filter((loc) => {
                  if(inputStr == ""){return}
                  else if(loc.name.includes(inputStr)){
                    return loc
                  }
                })
                .map(
                  (loc) => {
                    return <li key={loc.id}><button onClick={autoComplete}>{loc.name}</button></li>
                  }
                )
                }
              </ul>
          </div>
      </div>
    </form>
  );
}

export default Arrival;