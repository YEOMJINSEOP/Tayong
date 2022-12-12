import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
const postData = (url, data) => { 
  axios
  .post(url,data, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'withCredentials': true
  }
  })
  .then(
    (res) => {
      console.log(res);
      console.log("data post complete🥕");
    }
  )
}

export default postData;