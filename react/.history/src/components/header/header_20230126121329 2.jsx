import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { login } from '../../apis/firebase';
import styles from './header.module.css';

function Header(props) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handleLogin = () => {
    login().then(setUser);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/`)
        }} >Tayong</p>
        <button onClick={login}>로그인</button>
      </nav>
    </>
  );
}

export default Header;