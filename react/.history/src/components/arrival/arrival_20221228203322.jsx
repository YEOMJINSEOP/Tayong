import React, { useEffect, useRef, useState } from 'react';
import styles from './arrival.module.css';
import getData from '../../service/getData';

import { FaSearch } from 'react-icons/fa';

function Arrival({onSet}) {


  const [location, setLocation] = useState([]);
  useEffect(() => {
    const url = 'data/location.json';
    getData(url)
    .then(res => setLocation(res['data']));
  }, []);

  const [inputStr, setInputStr] = useState('');

  const autoComplete = (e) => {
    console.log(e);
    setInputStr(e.target.innerText);
    onSet(e.target.innerText);
    e.target.parentNode.style.visibility = 'hidden';
  }


  const relateLoc = location.filter((loc) => {
      if(inputStr == ""){return}
      else if(loc.name.includes(inputStr)){
        return loc
      }
    })
    .map(
      (loc) => {
        console.log(loc); 
        return <li key={loc.id}><button onClick={autoComplete}>{loc.name}</button></li>
      }
    )
  

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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