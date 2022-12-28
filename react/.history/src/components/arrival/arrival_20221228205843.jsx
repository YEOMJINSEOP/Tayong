import React, { useEffect, useRef, useState } from 'react';
import styles from './arrival.module.css';
import getData from '../../service/getData';

import { FaSearch } from 'react-icons/fa';

function Arrival({onSet}) {


  const [location, setLocation] = useState([]);
  useEffect(() => {
    const urlLocation = 'data/location.json';
    getData(urlLocation)
    .then(res => setLocation(res['data']));
  }, []);

  const [inputStr, setInputStr] = useState('');

  const autoComplete = (e) => {
    setInputStr(e.target.innerText);
    onSet(e.target.innerText);
    e.target.parentNode.style.visibility = 'hidden';
  }

  let relateLoc = [];
  useEffect(()=>{
      relateLoc = location.filter((loc) => {
      if(inputStr && loc.name.includes(inputStr)){return loc}
      })
      .map(
        (loc) => {
          return <li key={loc.id} onClick={autoComplete}>{loc.name}</li>
        }
      )
  }, [inputStr])



  return (
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
                {relateLoc}
              </ul>
          </div>
      </div>
  );
}

export default Arrival;