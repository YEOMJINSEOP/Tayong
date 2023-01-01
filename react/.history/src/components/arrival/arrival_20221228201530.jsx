import React, { useEffect, useRef, useState } from 'react';
import styles from './arrival.module.css';
import getData from '../../service/getData';

import { FaSearch } from 'react-icons/fa';

function Arrival({onSet}) {

  const [location, setLocation] = useState([]);
  const [inputStr, setInputStr] = useState('');

  const url = 'data/location.json';
  useEffect(() => {
    getData(url)
    .then(res => setLocation(res['data']));
  }, []);

  const searchHandler = () => {
    location.filter((loc) => {
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

  useEffect(()=>{
    searchHandler()
    console.log('❤️');
  }, [inputStr])

  const autoComplete = (e) => {
    setInputStr(e.target.innerText);
    onSet(e.target.innerText);
    e.target.parentNode.style.visibility = 'hidden';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
                {searchHandler}
              </ul>
          </div>
      </div>
    </form>
  );
}

export default Arrival;