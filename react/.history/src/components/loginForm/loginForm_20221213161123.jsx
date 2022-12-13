import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.css';
import postData from '../../service/postData';
import getData from '../../service/getData';

function LoginForm(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault();
    
    let userData = {
      email: email,
      password: password
    }

    console.log(userData);

    const postUrl = " https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/login"

    const getUrl = " https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue" // loginSuccess 받아올 주소

    postData(postUrl, userData);

    // 여기서 loginSuccess 받아옵니다.
    setTimeout(function() {
      getData(getUrl)
      .then(data => {
        console.log(data.data[0]['loginId'])
        const isLoginSucceed = data.data[0]['loginSuccess'];
        const loginId = data.data[0]['loginId'];
        
        if(data.data[0]['loginSuccess'] == 1){
          console.log('님 환영합니다');
          navigate(`/home/${loginId}`);
        }
        else{
          alert('이메일 또는 비밀번호를 확인해주세요');
          console.log('로그인 실패');
        }
      }
      )
      .catch(
        () => 
        console.warn('서버에서 데이터를 받아오는 데에 문제가 있습니다.')
      )
    }, 1000);
    

  }




  return (
    <>
      <div className={styles.logInContainer}>
        <div className={styles.logo}>Tayong</div> 
        
        <div className={styles.email}>
          <label htmlFor="email">이메일</label>
          <input type="email"  id="email" onChange={(e) => {setEmail(e.target.value)}}  required/>
        </div>

        <div className={styles.password}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required />
        </div>
        
        <input className={styles.submitBtn} onClick={submitHandler} type="submit" value="로그인" />

        <div className={styles.extraFunc}>
          <p>아이디/비밀번호 찾기</p>
          <p onClick={() => {
            navigate('/signup');
          }}>회원가입</p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;