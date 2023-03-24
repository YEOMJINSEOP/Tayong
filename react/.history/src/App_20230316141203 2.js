import {Outlet} from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import styles from './App.module.css';


function App() {

  return (
    <div className={styles.rootContainer}>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;