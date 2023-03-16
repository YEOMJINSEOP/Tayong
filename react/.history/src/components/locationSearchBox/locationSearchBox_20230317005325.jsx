import React, { useEffect, useRef, useState } from 'react';
import styles from './locationSearchBox.module.css';
import getData from '../../service/getData';
import { FaSearch } from 'react-icons/fa';


function LocationSearchBox({onSet, isMain, locParam, location}) {

  const [inputStr, setInputStr] = useState('');
  useEffect(() => {
    const urlLocation = 'data/location.json';
    getData(urlLocation)
    .then(res => {
      setLocationName(res['data'].map((loc) => loc.name));
      setLocation(res['data']);
    });
  }, []);
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
      <div className={isMain ? styles.inputBox : styles.locInfoBox}>
        <input
            className={styles.input}
            type="text"
            value = {locParam ? locParam : inputStr}
            // onKeyDown = {(e) => onKeyPressHandler(e)}
            onChange = {(e) => {
                setInputStr(e.target.value);
                onSet(e.target.value);
              }}
        />
        <FaSearch className={isMain ? styles.inputSearchIcon: styles.infoSearchIcon}/>
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