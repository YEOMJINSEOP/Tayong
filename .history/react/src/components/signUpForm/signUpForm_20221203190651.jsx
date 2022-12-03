import React, { useState } from 'react';
import styles from './signUpForm.module.css';
import axios from 'axios';
import postData from '../../service/postData';
function SignUpForm(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [phone, setPhone] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    let signUpData = {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
      phone: phone
    }

    console.log(signUpData);

    const url = ""; // 저장할 DB 주소
    postData(url, signUpData);

  }


  return (

    <>
      <div className={styles.logInContainer}>
        <div className={styles.title}>회원가입</div> 
        
        <div className={styles.email}>
          <label htmlFor="email">이메일</label>
          <div className={styles.authContainer}>
            <input type="email"  id="email" name="email" onChange={(e) => {setEmail(e.target.value)}} required/>
          </div>
        </div>

        <div className={styles.password}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required />
        </div>

        <div className={styles.password}>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input type="password" id="passwordCheck" name="passwordCheck" onChange={(e) => {setPasswordCheck(e.target.value)}}required />
        </div>

        <div className={styles.nickname}>
          <label htmlFor="nickname">닉네임</label>
          <div className={styles.authContainer}>
            <input type="text"  id="nickname" name="nickname" onChange={(e) => {setPhone(e.target.value)}} required/>
          </div>
        </div>

        <button className={styles.submitBtn} onClick={submitHandler}>회원가입</button>
      </div>
      
    </>
  );
}

export default SignUpForm;