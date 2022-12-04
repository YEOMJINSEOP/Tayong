import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import getData from '../../service/getData';

function Header(props) {
  const navigate = useNavigate();
  const[loginId, setLoginId] = useState("");
  const[loginSucceed, setLoginSucceed] = useState(0);

  const showLoginId = () => {
    if({loginSucceed} == 1){
      return loginSucceed;
    }
    else{
      return '로그인';
    }
  }

  useEffect(() => {
    const getUrl="https://iszyx4amug.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue"
    getData(getUrl)
      .then(data => {
        const isLoginSucceed = JSON.parse(data.data['loginSuccess']);
        const loginId = data.data['loginId'];
        setLoginSucceed(isLoginSucceed);
        setLoginId(loginId);
      })  
  }, [])

  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/`)
        }} >Tayong</p>
        <div className={styles.navbarBtn}>
          <button className={styles.btn} onClick={() => {navigate('/login')}}>{showLoginId()}</button>
          <button className={styles.btn} onClick={() => {
            navigate('/signup')
          }}>회원가입</button>
        </div>  
      </nav>
    </>
  );
}

export default Header;