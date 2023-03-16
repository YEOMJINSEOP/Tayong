import React, { useEffect, useState } from 'react';
import LocationSearchBox from '../locationSearchBox/locationSearchBox';

function Departure({onSet}) {
  return (
    <LocationSearchBox onSet={onSet} isMain={true}/>
  );
}

export default Departure;