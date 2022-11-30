import React, { useState } from 'react';
import styles from './signUpForm.module.css';
import axios from 'axios';
function SignUpForm(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  let signUpData = {
    email: email,
    password: password,
    phone: phone
  }

  const url = ""; // 저장할 DB 주소

  axios
  .post(url, userData)
  .then(
    (res) => {
      console.log(res);
      console.log("signUp Data Post Complete🥕");
    }
  )

  return (

    <>
      <div className={styles.logInContainer}>
        <div className={styles.title}>회원가입</div> 
        
        <div className={styles.email}>
          <label htmlFor="email">이메일</label>
          <div className={styles.authContainer}>
            <input type="email"  id="email" name="email" onChange={(e) => {setEmail(e.target.value)}} required/>
            <button className={styles.authBtn} type="submit">인증</button>
          </div>
        </div>

        <div className={styles.password}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required />
        </div>

        <div className={styles.password}>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input type="password" id="passwordCheck" name="passwordCheck" required />
        </div>

        <div className={styles.phone}>
          <label htmlFor="phone">휴대폰 인증</label>
          <div className={styles.authContainer}>
            <input type="tel"  id="phone" name="phone" onChange={(e) => {setPhone(e.target.value)}} required/>
            <button className={styles.authBtn} type="submit">인증</button>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default SignUpForm;