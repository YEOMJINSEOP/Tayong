import axios from 'axios';

const getData = (url) => {
  return axios.get(url,{
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  },);
}

export default getData;