import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './header.module.css';

function Header(props) {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");

  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/${loginId}`)
        }} >Tayong</p>
        <div className={styles.navbarBtn}>
          <button className={styles.loginBtn}>로그인</button>
          <button className={styles.btn}>회원가입</button>
        </div>  
      </nav>
    </>
  );
}

export default Header;