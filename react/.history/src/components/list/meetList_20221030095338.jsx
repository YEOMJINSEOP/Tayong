import React from 'react';
import { useState } from 'react';
import {v4 as uuidV4} from 'uuid';

function MeetList(props) {
  const [meetList, setMeetList] = useState([
    { 'id': uuidV4(),
      'destination': '디지털미디어시티',
      'arrival': '한국항공대학교',
      'recruitment': '1/4',
      'remainingTime': '1시간 27분 남음'
    },
    {
      'id': uuidV4(),
      'destination': '디지털미디어시티',
      'arrival': '한국항공대학교',
      'recruitment': '3/4',
      'remainingTime': '0시간 27분 남음'
    }
  ]);

  return (
    <div>
      <p>Go!</p>
      <ul>
        {meetList.map((item) => {
          console.log('hi');
          console.log(item);
          return <li key={item.id}>{item.destination}, {item.arrival}, {item.recruitment}, {item.remainingTime}</li>
        })}
      </ul>
    </div>
  );
}

export default MeetList;