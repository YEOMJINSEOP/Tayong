import {Outlet} from 'react-router-dom';
import Header from './components/header/header';


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