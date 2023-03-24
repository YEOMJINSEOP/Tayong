import React, { useEffect } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import LocationSelector from '../components/locationSelector/locationSelector';
function Home(props) {
  useEffect(() => {
    Notification.requestPermission();
  }, [])
  return (
      <LocationSelector/>
  );
}

export default Home;