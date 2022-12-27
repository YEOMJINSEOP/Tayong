import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './header.module.css';

function Header(props) {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(false);

  const loginHandler = () => {
    return !isLogined ? '로그인' : '로그아웃';
  }

  const joinHandler = () => {
    return !isLogined ? '회원가입' : null
  }
  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/`)
        }} >Tayong</p>
        <div className={styles.navbarBtn}>
          <button className={styles.loginBtn}>{loginHandler()}</button>
          <button className={styles.btn}>{joinHandler()}</button>
        </div>  
      </nav>
    </>
  );
}

export default Header;