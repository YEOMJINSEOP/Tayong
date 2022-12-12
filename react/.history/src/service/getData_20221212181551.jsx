import axios from 'axios';

const getData = (url) => {
  return axios.get(url);
}

export default getData;