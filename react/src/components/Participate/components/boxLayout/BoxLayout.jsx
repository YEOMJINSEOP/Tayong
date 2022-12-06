import React from 'react'
import styles from './boxLayout.module.css';
export default function BoxLayout({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
