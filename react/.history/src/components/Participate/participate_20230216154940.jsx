import React, { useEffect, useState } from 'react';
import Chat from '../chat/chat';
import MeetDetail from '../meetDetail/meetDetail';
import styles from './participate.module.css';
function Participate(props) {
  return (
    <div className={styles.participate_container}>
      <MeetDetail style={'side'}/>
      <Chat/>
    </div>
  );
}

export default Participate;