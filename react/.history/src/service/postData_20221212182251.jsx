import React from 'react';
import axios from 'axios';


const postData = (url, data) => { 
  axios
  .post(url,{data}, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
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