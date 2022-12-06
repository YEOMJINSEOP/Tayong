import React from 'react'
import BoxLayout from '../components/boxLayout/BoxLayout';
import styles from './Member.module.css';
import User from '../components/User/User';

export default function Member() {
  return (
    <div className={styles.container}>
      <div>참여인원</div>
      <BoxLayout>
        <div className={styles.userContainer}>
          <User/>
          <User/>
          <User/>
        </div>
      </BoxLayout>
      
    </div>
  )
}
