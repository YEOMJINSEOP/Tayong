import React, { useEffect, useRef, useState } from 'react';
import styles from './arrival.module.css';
import getData from '../../service/getData';

function LocationSearchBox({onSet}) {

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
  }

  const searchRef = useRef();
  
  let relateLoc = location.filter((loc) => {
    if(inputStr && loc.name.includes(inputStr)){return loc}
    })
    .map(
      (loc) => {
        return <li key={loc.id} onClick={autoComplete}  tabIndex="0">{loc.name}</li>
      }
  )

  return (
    <div className={styles.container}>     
    <div className={styles.inputBox}>
      <input
          className={styles.input}
          type="text"
          value = {inputStr}
          // onKeyDown = {(e) => onKeyPressHandler(e)}
          onChange = {(e) => setInputStr(e.target.value)}
      />
      <FaSearch className={styles.searchIcon}/>
    </div>
    <div className={styles.searchDropDown}>
        <ul ref={searchRef}>
          {relateLoc}
        </ul>
    </div>
</div>
  );
}

export default LocationSearchBox;