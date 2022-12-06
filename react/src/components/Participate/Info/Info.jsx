import React, { useState } from 'react'
import BoxLayout from '../components/boxLayout/BoxLayout';
import styles from './Info.module.css';

export default function Info() {

  // const [destination, setDestination] = useState();
  // const getDestination = () =>{
  //   const result = fetch(wwww.asdflkjasdf.);
  //   setDestination(result);
  // }
  return (
    <div className={styles.container}>
      <div>모임정보</div>
      <BoxLayout >
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.border}>
              <div className={styles.orangeText}>출발지</div>
              {/* <div>{destination}</div> */}
              <div>디지털미디어시티역</div>
            </div>
            <div className={styles.border}>
               <div className={styles.orangeText}>출발일시</div>
               <div>2022년 11월 3일 08:30</div>
            </div>
            <div className={styles.border}>
              <div className={styles.orangeText}>모집인원</div>
              <div>4명</div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.border}>
              <div className={styles.orangeText}>도착지</div>
              <div>한국항공대학교</div>
            </div>
            <div className={styles.border}>
              <div className={styles.orangeText}>마감일시</div>
              <div>2022년 11월 3일 08:20</div>
            </div>
            <div className={styles.border}>
              <div className={styles.orangeText}>모집수단</div>
              <div>택시</div>
            </div>
          </div>
        </div>

        <div className={styles.border}>
              <div className={styles.orangeText}>제목</div>
          <div>아침에 학교 같이가실 분 구합니다!</div>
        </div>

        <div className={styles.border} style={{height:"100%", flexDirection:"column"}}>
              <div className={styles.orangeText}>내용</div>
          <div>디엠시역 5번출구에서 만나서 항공대 같이가실 분 구합니다!</div>
        </div>

      </BoxLayout>

    </div>
  )
}
