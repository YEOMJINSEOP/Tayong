import React from 'react';
import styles from './header.css';

function Header(props) {
  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo}>Tayong</p>
        <button>로그인</button>
        <button>회원가입</button>
      </nav>
    </>
  );
}

export default Header;