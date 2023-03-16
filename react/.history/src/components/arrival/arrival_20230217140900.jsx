import React from 'react';
import LocationSearchBox from '../locationSearchBox/locationSearchBox';

function Arrival({onSet}) {
  return (
    <LocationSearchBox onSet={onSet} isMain={true}/>
  );
}

export default Arrival;