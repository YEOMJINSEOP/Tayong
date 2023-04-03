import React from 'react';
import LocationSearchBox from '../locationSearchBox/LocationSearchBox';

function Arrival({onSet, location}) {
  return (
    <LocationSearchBox onSet={onSet} isMain={true}/>
  );
}

export default Arrival;