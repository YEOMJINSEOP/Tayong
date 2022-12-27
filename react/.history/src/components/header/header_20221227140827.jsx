import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './header.module.css';

function Header(props) {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState("false");

  const loginHandler = () => {
    return !isLogined ? '로그인' : '로그아웃';
  }

  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/`)
        }} >Tayong</p>
        <div className={styles.navbarBtn}>
          <button className={styles.loginBtn}>{loginHandler()}</button>
          <button className={styles.btn}>회원가입</button>
        </div>  
      </nav>
    </>
  );
}

export default Header;