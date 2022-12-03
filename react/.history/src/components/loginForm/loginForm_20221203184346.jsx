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

    const url = "";
    postData(url, userData);

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
        
        <input className={styles.submitBtn} type="submit" value="로그인" />

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