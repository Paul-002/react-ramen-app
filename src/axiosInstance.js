import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-builder-9c971.firebaseio.com/',
});

export default instance;
