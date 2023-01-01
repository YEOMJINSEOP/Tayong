import React, { useEffect, useRef, useState } from 'react';
import styles from './arrival.module.css';
import getData from '../../service/getData';

import { FaSearch } from 'react-icons/fa';
import LocationSearchBox from '../locationSearchBox/locationSearchBox';

function Arrival({onSet}) {



  return (
    <LocationSearchBox/>
  );
}

export default Arrival;