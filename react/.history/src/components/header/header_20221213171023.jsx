import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './header.module.css';
import getData from '../../service/getData';

function Header(props) {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("로그인");
  const [loginSucceed, setLoginSucceed] = useState(0);

  let params = useParams();

  useEffect(() => {
    console.log(`🐥🥕🐽🐽🐽`, (params['*'].split('/'))[0]);
    let param_userId = (params['*'].split('/'))[0];
    console.log(param_userId);
    if(param_userId == undefined || param_userId == ''){
      param_userId = "로그인";
    }
    setLoginId(param_userId);
  }, [])

  const showLoginId = () => {
    if(param_userId == undefined || param_userId == ''){
      return '로그인';
    }
    else{
      return param_userId;
    }
  }

  const showLogOut = () => {
    if(loginSucceed == 1||loginSucceed == '1'){
      console.log("❤️",loginSucceed)
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
      setLoginSucceed(0);
      navigate('/');
  });
  }



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