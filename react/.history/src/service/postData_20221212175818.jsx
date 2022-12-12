import React from 'react';
import axios from 'axios';


const postData = (url, data) => { 
  axios
  .post(url,{
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }, data)
  .then(
    (res) => {
      console.log(res);
      console.log("data post complete🥕");
    }
  )
}

export default postData;