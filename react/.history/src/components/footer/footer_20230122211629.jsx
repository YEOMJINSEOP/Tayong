import React from 'react';
import styles from './footer.module.css';

function Footer(props) {
  return (
     <footer className={styles.footer}>
      <p className={styles.contract}>이용약관</p>
      <span className={styles.divider}>  |  </span>
      <p className={styles.name}>@Tayong 2023</p>
     </footer> 
  );
}

export default Footer;