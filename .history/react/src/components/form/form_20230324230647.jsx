import React from 'react';
import styles from './form.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { useEffect } from 'react';
import {createMeetData, onUserStateChange} from '../../apis/firebase';

function Form(props) {
  const params = useParams();
  const departure = params.departure;
  const arrival = params.arrival;

  const navigate = useNavigate();
  const [meet, setMeet]= useState({meetId: uuidv4(), host: '', departure, arrival, meetTime: '', recruitment: 2, participant: [], transport: '', title: '', content: ''})
  const [meetTime, setMeetTime] = useState({date: 0, time: 0});
  const [user, setUser] = useState();
  useEffect(() => {
    setMeet((meet) => ({...meet, meetTime: meetTime }));
  }, [meetTime])


  const validateMeet = () => {
    if(!meet.meetId){
      alert('meetId is null');
      return false
    }
    if(meet.meetTime.date === 0 || meet.meetTime.time === 0){
      alert('출발 시각을 설정하세요.');
      return false
    }
    if(!meet.transport){
      alert('이동 수단을 설정하세요.');
      return false
    }
    if(meet.title.trim().length === 0){
      alert('제목을 설정하세요.');
      return false
    }
    if(meet.content.trim().length === 0){
      alert('내용을 입력하세요.');
      return false
    }
    return true;
  }

  useEffect(() => {
    onUserStateChange(
      (user) => {
        setMeet((meet) => ({...meet, host:user.email, participant: [user.email]}));
        setUser(user);
      } 
    );
  }, [])

  const [prevDate, setPrevDate] = useState('2022-03-01');
  useEffect(() => {
    const yesterday = new Date();
    const year = yesterday.getFullYear();
    const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
    const date = yesterday.getDate().toString().padStart(2, '0');
    setPrevDate(`${year}-${month}-${date}`);
  }, [prevDate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!user){
      alert('로그인이 필요합니다');
      return;
    }
    else{
      if(validateMeet()){
        createMeetData(meet);
        navigate(-1);
      };
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setMeet({...meet, [name]: value});
  }

  const handleMeetTime = (e) => {
    if(e.target.id === 'time'){
      setMeetTime((prev) => ({...prev, time: e.target.value}))
    }
    else if(e.target.id === 'date'){
      setMeetTime((prev) => ({...prev, date: e.target.value}))
    }
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
            <input readOnly value={departure} type="text" id='departure' name='departure' maxLength='12' />
            <FaSearch className={styles.searchIcon}/>
          </div>
          <div className={styles.arrival}>
            <label className={styles.formLabel} htmlFor='arrival'>도착지</label>
            <input readOnly value={arrival} type="text" id='arrival' name='arrival' maxLength='12' />
            <FaSearch className={styles.searchIcon}/>
          </div>
        </div>
        <div className={styles.infoContainer}>

          <div className={styles.meetTime}>
            <label className={styles.formLabel} htmlFor='meetTime'>출발시각</label>
            <input type="date" id='date' min={prevDate} name='date' onChange={handleMeetTime} />
            <input type="time" id='time'onChange={handleMeetTime}/>
          </div>
          
          <div className={styles.recruitment}>
            <label className={styles.formLabelRC} htmlFor='recruitment'>모집인원</label>
            <select type="number" id='recruitment' name='recruitment' onChange={handleChange}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <p>명</p>
          </div>

          <div className={styles.transport}>
            <label className={styles.formLabel} htmlFor='transport'>이동수단</label>
            <select className={styles.transportSelect} name='transport' onChange={handleChange}>
              <option>선택</option>
              <option>택시</option>
              <option>자가용</option>
            </select>
          </div>

        </div>

        <div className={styles.title}>
          <label className={styles.formLabel} htmlFor='title'>제목</label>
          <input type="text" id='title' maxLength="42" name='title' onBlur={handleChange}/>
        </div>
        
        <div className={styles.content}>
          <label className={styles.formLabel} htmlFor='content'>내용</label>
          <textarea cols="88" rows="6" maxLength="300" name='content' onBlur={handleChange}></textarea>
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