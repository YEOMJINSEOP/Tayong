import React from 'react';
import styles from './form.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import LocationSearchBox from '../locationSearchBox/locationSearchBox';

function Form(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [meet, setMeet]= useState({departure: '', arrival:'', remainingTime: '', recruitment: '', transport: '', title: '', content: ''})

  const submitHandler = (e) => {
    e.preventDefault();

    // if(departure == "" || arrival == "" || remainingTime == "" || recruitment == "" || transport == "" || title == "" || content == ""){
    //   console.warn('입력되지 않은 항목이 있습니다.');
    //   window.alert('입력되지 않은 항목이 있습니다.');
    //   return
    // }

    // const randomKey = uuidv4();

    // let postdata = {
    //   departure: departure,
    //   arrival: arrival,
    //   remainingTime: remainingTime,
    //   recruitment: recruitment,
    //   transport: transport,
    //   title: title,
    //   content: content,
    //   randomKey: randomKey,
    // }

  }

  const backToListHandler = (e) => {
    navigate(-1);
  }
  
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.locationContainer}>
          <div className={styles.departure}>
            <label className={styles.formLabel} htmlFor='departure'>출발지</label>
            <LocationSearchBox className={styles.departureForm} isMain={false} locParam={params.departure}/>
            <FaSearch className={styles.searchIcon}/>
          </div>
          <div className={styles.arrival}>
            <label className={styles.formLabel} htmlFor='arrival'>도착지</label>
            <LocationSearchBox locParam={params.arrival}/>
            <FaSearch className={styles.searchIcon}/>
          </div>
        </div>
        <div className={styles.infoContainer}>

          <div className={styles.remainingTime}>
            <label className={styles.formLabel} htmlFor='remainingTime'>출발일</label>
            <input type="date" id='remainingTime' name='remainingTime' onChange={(e) => setMeet({...meet, [remainingTime]: e.target.value})}/>
          </div>
          
          <div className={styles.recruitment}>
            <label className={styles.formLabelRC} htmlFor='recruitment'>모집인원</label>
            <input type="text" id='recruitment' name='recruitment' maxLength='1' onChange={(e) =>setMeet({...meet, [recruitment]: e.target.value})}/>
            <p>명</p>
          </div>

          <div className={styles.transport}>
            <label className={styles.formLabel} htmlFor='transport'>이동수단</label>
            <select className={styles.transportSelect} onChange={(e) =>setMeet({...meet, [transport]: e.target.value})}>
              <option>선택</option>
              <option>택시</option>
              <option>자가용</option>
            </select>
          </div>

        </div>

        <div className={styles.title}>
          <label className={styles.formLabel} htmlFor='title'>제목</label>
          <input type="text" id='title' name='title' onChange={(e) =>setMeet({...meet, [title]: e.target.value})}/>
        </div>
        
        <div className={styles.content}>
          <label className={styles.formLabel} htmlFor='content'>내용</label>
          <textarea cols="88" rows="6" maxLength="300" name='content' onChange={(e) =>setMeet({...meet, [content]: e.target.value})}></textarea>
        </div>
      </form>

      <div className={styles.btns}>
          <button className={styles.btn_backToList} type='button' onClick={backToListHandler}>목록으로</button>
          <button className={styles.btn_submit} onClick={submitHandler}>등록하기</button>
      </div>

    </div>
  );
}

export default Form;