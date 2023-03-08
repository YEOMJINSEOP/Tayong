import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { login, logout, onUserStateChange } from '../../apis/firebase';
import styles from './header.module.css';

function Header(props) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    }) 
  }, [user]);

  const handleLogin = () => {
    login().then(setUser);
  };

  const handleLogout = () => {
    logout().then(setUser);
  };

  return (
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/`)
        }} >Tayong</p>
        {!user && <button className={styles.loginBtn} onClick={handleLogin}>로그인</button>}
        {user && <div className={styles.userInfo}>
          <img className={styles.userPhoto} src={user.photoURL}/>
          <span className={styles.userName}>{user.displayName}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>로그아웃</button>
        </div>}        
      </nav>
  );
}

export default Header;