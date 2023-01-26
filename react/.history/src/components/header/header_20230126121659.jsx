import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { login, logout } from '../../apis/firebase';
import styles from './header.module.css';

function Header(props) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handleLogin = () => {
    login().then(setUser);
  }
  const handleLogout = () => {
    logout().then(setUser);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/`)
        }} >Tayong</p>
        {!user && <button onClick={handleLogin}>로그인</button>}
        {user && <button onClick={handleLogout}>로그아웃</button>}
      </nav>
    </>
  );
}

export default Header;