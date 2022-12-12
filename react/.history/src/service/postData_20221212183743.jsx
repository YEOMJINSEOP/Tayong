import React from 'react';
import axios from 'axios';

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
  .catch((error) => {
    console.log(" POST Error🥲, but Data was : ",data);
    console.log(error);
  })
}

export default postData;