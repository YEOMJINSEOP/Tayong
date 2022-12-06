import React from 'react'
import styles from './User.module.css';

export default function User() {
  return (
    <div className={styles.container}>
        <div className={styles.userImage}></div>
        <div>이름</div>
    </div>
  )
}
