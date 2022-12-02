import React from 'react';
import axios from 'axios';


const postData = (url, data) => {
  axios
  .post(url, data)
  .then(
    (res) => {
      console.log(res);
      console.log("data post complete🥕");
    }
  )
}

export default postData;