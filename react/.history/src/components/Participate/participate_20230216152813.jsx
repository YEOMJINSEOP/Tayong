import React, { useEffect, useState } from 'react';
import Chat from '../chat/chat';
import MeetDetail from '../meetDetail/meetDetail';

function Participate(props) {
  return (
    <>
      <MeetDetail/>
      <Chat/>
    </>
  );
}

export default Participate;