import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { login, logout, onUserStateChange } from '../../apis/firebase';
import { currentUserState, userState } from '../../recoil/user';

import styles from './header.module.css';

function Header(props) {
  // const userState = useRecoilValueLoadable(currentUserState);
  // if (userState.state === 'hasValue') {
  //   console.log(userState.contents);
  // }

  const userState = useRecoilValue(currentUserState);
  console.log(userState);

  const navigate = useNavigate();  
  /** User & setUser */
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    }) 
  }, [user]);
 /** */

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
        }} >Tayong
        </p>
        {!user && <button className={styles.loginBtn} onClick={handleLogin}>로그인</button>}
        {user && <div className={styles.userInfo}>
          <img className={styles.userPhoto} src={user.photoURL} alt='userImage'/>
          <span className={styles.userName}>{user.displayName.toUpperCase()}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>로그아웃</button>
        </div>}        
      </nav>
  );
}

export default Header;