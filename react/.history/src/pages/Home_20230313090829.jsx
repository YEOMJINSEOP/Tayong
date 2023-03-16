import React, { useEffect } from 'react';
import LocationSelector from '../components/locationSelector/locationSelector';
function Home(props) {
  // useEffect(() => {
  //   Notification.requestPermission();
  // }, [])
  return (
      <LocationSelector/>
  );
}

export default Home;