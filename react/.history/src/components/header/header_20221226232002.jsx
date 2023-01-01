import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './header.module.css';
import getData from '../../service/getData';

function Header(props) {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [loginSucceed, setLoginSucceed] = useState(0);

  let params = useParams();

  useEffect(() => {
    let param_userId = (params['*'].split('/'))[0];
    if(param_userId == undefined || param_userId == ''){
      return;
    }
    setLoginId(param_userId);
  }, [])

  const showLoginId = () => {
    if(loginId == '로그인'){
      return '로그인';
    }
    else{
      return loginId;
    }
  }

  const showLogOut = () => {
    if(loginId == '로그인'){
      return "";
    }
    else{
      return "로그아웃"
    }
  }

  // logout 기능
  const logOutHanlder = () => {
    const logoutUrl  = "https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/logout";
    getData(logoutUrl)
    .then((data) => {
      setLoginId('로그인');
      navigate('/');
  });
  }



  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/${loginId}`)
        }} >Tayong</p>
        <div className={styles.navbarBtn}>
          <button className={styles.loginBtn} onClick={() => {if(param_userId){navigate('/login')}else{return;}}}>{showLoginId()}</button>
          <button className={styles.btn} onClick={() => {logOutHanlder()}}>{showLogOut()}</button>
        </div>  
      </nav>
    </>
  );
}

export default Header;