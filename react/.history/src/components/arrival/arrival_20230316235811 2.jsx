import React from 'react';
import LocationSearchBox from '../locationSearchBox/locationSearchBox';

function Arrival({onSet, location}) {
  return (
    <LocationSearchBox onSet={onSet} isMain={true} location={location}/>
  );
}

export default Arrival;