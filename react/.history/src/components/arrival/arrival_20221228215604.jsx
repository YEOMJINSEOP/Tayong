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
  }

  let relateLoc = location.filter((loc) => {
    if(inputStr && loc.name.includes(inputStr)){return loc}
    })
    .map(
      (loc) => {
        return <li key={loc.id} onClick={autoComplete} tabIndex="0">{loc.name}</li>
      }
  )

  const searchRef = useRef();
  // const focusRelateLoc = () => {
  //   let listCount = searchRef.current.childElementCount;
  //   console.log(searchRef);
  //   console.log(searchRef.current.childNodes[0].focus());
  //   searchRef.current.focus();
  // }

  const onKeyPressHandler = (e) => {
    let searchIndex = 0;
    if(e.code === 'ArrowDown'){
      let listCount = searchRef.current.childElementCount;
      console.log(listCount);
      let focusedIndex = searchIndex < listCount ? searchIndex++ : 0
      // searchRef.current.childNodes[focusedIndex].focus();
    }
  }


  return (
      <div className={styles.arrival}>     
          <div className={styles.inputBox}>
            <input
                className={styles.input}
                type="text"
                id='arrival'
                name='arrival'
                value = {inputStr}
                onKeyDown = {(e) => onKeyPressHandler(e)}
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

export default Arrival;