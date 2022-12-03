import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.css';
import postData from '../../service/postData';

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

    const postUrl = "http://localhost:4000/login";
    const getUrl = "" // loginSuccess 받아올 주소
    postData(postUrl, userData);

    // 여기서 loginSuccess 받아옵니다.
    getData(getUrl)
    .then(data => {
      console.log(data)
    })

    navigate('/');
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