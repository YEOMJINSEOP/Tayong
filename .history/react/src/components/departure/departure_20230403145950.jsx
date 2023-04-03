import React from 'react';
import LocationSearchBox from '../locationSearchBox/LocationSearchBox';

function Departure({onSet}) {
  return (
    <LocationSearchBox onSet={onSet} isMain={true}/>
  );
}

export default Departure;