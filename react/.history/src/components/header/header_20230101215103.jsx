import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './header.module.css';

function Header(props) {
  const navigate = useNavigate();

  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/`)
        }} >Tayong</p>

      </nav>
    </>
  );
}

export default Header;