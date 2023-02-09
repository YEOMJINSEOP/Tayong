import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './header.module.css';
import getData from '../../service/getData';

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
          <button className={styles.loginBtn} onClick={() => {navigate('/login')}}>로그인</button>
          <button className={styles.btn} onClick={()=>{navigate('/signup')}}>회원가입</button>
        </div>  
      </nav>
    </>
  );
}

export default Header;