import {Outlet} from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/Header';


function App() {

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;