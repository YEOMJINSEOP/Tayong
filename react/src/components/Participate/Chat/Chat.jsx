import React from 'react'
import styles from './Chat.module.css';
import BoxLayout from '../components/boxLayout/BoxLayout';
export default function Chat() {
  return (
    <div className={styles.container}>
      <div>채팅하기</div>
      <BoxLayout>
        <div>chat</div>
      </BoxLayout>
      
    </div>
  )
}
