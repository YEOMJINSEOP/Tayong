import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import getData from '../../service/getData';

function Header(props) {
  const navigate = useNavigate();
  const[loginId, setLoginId] = useState("로그인");
  const[loginSucceed, setLoginSucceed] = useState(1);
  
  const showLoginId = () => {
    if(loginSucceed == 1||loginSucceed == '1'){
      return loginId;
    }
    else{
      return '로그인';
    }
  }

  const showLogOut = () => {
    if(loginSucceed == 1||loginSucceed == '1'){
      return "로그아웃"
    }
    else{
      return "";
    }
  }

  // logout 기능
  const logOutHanlder = () => {
    const logoutUrl  = "https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/logout";
    getData(logoutUrl)
    .then((data) => {
      console.log("🎉",data);
      loginSucceed = 0;
  });
  }

  useEffect(() => {
    const getUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue';
    getData(getUrl)
      .then(data => {
        console.log(data);
        const isLoginSucceed = data.data[0]['loginSuccess'];
        const loginId = data.data[0]['loginId'];
        console.log(isLoginSucceed);
        //console.log(JSON.parse(data['nowId']))
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
          <button className={styles.loginBtn} onClick={() => {navigate('/login')}}>{showLoginId()}</button>
          <button className={styles.btn} onClick={() => {logOutHanlder()}}>{showLogOut()}</button>
        </div>  
      </nav>
    </>
  );
}

export default Header;