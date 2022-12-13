import React from 'react';
import styles from './form.module.css';
import { FaSearch } from 'react-icons/fa';
import { FiCalendar} from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import postData from '../../service/postData';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';
import getData from '../../service/getData';


//axios.defaults.withCredentials = true;
function Form(props) {

  let params = useParams();
  console.log(`🐥🥕`, (params['*'].split('/'))[0]);
  let param_userId = (params['*'].split('/')[0]);
  console.log(param_userId);
  
  const navigate = useNavigate();

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [recruitment, setRecruitment] = useState("");
  const [transport, setTransport] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nowId, setNowId] = useState("");

  const getUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue';
    
  getData(getUrl)
    .then(data => {
     console.log(data.data[0]);
      console.log("🐼",data.data[0]['loginId']); //여기서 잘받아와지는데 
      setNowId(data.data[0]['loginId']); // nowId에 값이 안들어가지네요..
    }) 
    
    setTimeout(
     ()=>{
       console.log("🐥",nowId);
     }, 1000
    );

  const submitHandler = (e) => {
    e.preventDefault();

    if(departure == "" || arrival == "" || remainingTime == "" || recruitment == "" || transport == "" || title == "" || content == ""){
      console.warn('입력되지 않은 항목이 있습니다.');
      window.alert('입력되지 않은 항목이 있습니다.');
      return
    }

    // meetUUID 할당
    const randomKey = uuidv4();
    console.log(randomKey);


    // 전송하는 데이터에 randomKey 포함해 전달
    let postdata = {
      departure: departure,
      arrival: arrival,
      remainingTime: remainingTime,
      recruitment: recruitment,
      transport: transport,
      title: title,
      content: content,
      randomKey: randomKey,
      nowId: nowId
    }
    
    console.log(postdata);



    const MLurl =  'https://j99c2do1xe.execute-api.ap-northeast-2.amazonaws.com/tayong_stage/tayong_resource';
    axios.post(MLurl, `{"inputs": "${content}"}`)
    .then(
      res => {
        console.log('🥲🥲🥲🥲',res);
        console.log(JSON.parse(res['data']['body'])[0]['label']);
        const MLresult = JSON.parse(res['data']['body'])[0]['label'];
      if(MLresult == 'LABEL_1'){
        const url =' https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/postform';
        
          postData(url, postdata);
        
        
        navigate('/');
      }
      else{
        alertML();
      }
    }
    )

    const alertML = () => {
      Swal.fire({
        title: 'AI has filtered your post.',
        text: '적절하지 않은 내용이 발견됐습니다. 글을 수정해주세요.',
        icon: 'warning',
        confirmButtonText: '다시 작성하기'
      })
    }

    // const url =' https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/postform';
    // postData(url, data);
    // navigate('/');


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
            <input type="text" id='departure' name='departure' maxLength='12' onChange={(e) => {setDeparture(e.target.value)}}/>
            <FaSearch className={styles.searchIcon}/>
          </div>
          <div className={styles.arrival}>
            <label className={styles.formLabel} htmlFor='arrival'>도착지</label>
            <input type="text" id='arrival' name='arrival' maxLength='12' onChange={(e) => {setArrival(e.target.value)}}/>
            <FaSearch className={styles.searchIcon}/>
          </div>
        </div>
        <div className={styles.infoContainer}>

          <div className={styles.remainingTime}>
            <label className={styles.formLabel} htmlFor='remainingTime'>출발일</label>
            <input type="date" id='remainingTime' name='remainingTime' onChange={(e) => {setRemainingTime(e.target.value)}}/>
          </div>
          
          <div className={styles.recruitment}>
            <label className={styles.formLabelRC} htmlFor='recruitment'>모집인원</label>
            <input type="text" id='recruitment' name='recruitment' maxLength='1' onChange={(e) => {setRecruitment(e.target.value)}}/>
            <p>명</p>
          </div>

          <div className={styles.transport}>
            <label className={styles.formLabel} htmlFor='transport'>이동수단</label>
            <select className={styles.transportSelect} onChange={(e) => {setTransport(e.target.value)}}>
              <option>선택</option>
              <option>택시</option>
              <option>자가용</option>
            </select>
          </div>

        </div>

        <div className={styles.title}>
          <label className={styles.formLabel} htmlFor='title'>제목</label>
          <input type="text" id='title' name='title' onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
        
        <div className={styles.content}>
          <label className={styles.formLabel} htmlFor='content'>내용</label>
          <textarea cols="88" rows="6" maxLength="300" name='content' onChange={(e) => {setContent(e.target.value)}}></textarea>
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