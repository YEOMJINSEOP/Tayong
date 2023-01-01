import React, { useEffect, useRef, useState } from 'react';
import styles from './arrival.module.css';
import getData from '../../service/getData';

import { FaSearch } from 'react-icons/fa';

function Arrival({onSet}) {



  return (
      <div className={styles.arrival}>     
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

export default Arrival;