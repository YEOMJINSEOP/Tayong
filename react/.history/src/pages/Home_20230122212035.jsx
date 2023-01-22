import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import LocationSelector from '../components/locationSelector/locationSelector';
function Home(props) {
  return (
    <>
      <LocationSelector/>
      <Footer/>
    </>
  );
}

export default Home;