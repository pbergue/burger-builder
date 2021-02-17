import axios from 'axios';

const burgerAPI = axios.create({
  baseURL: 'https://pete-s-burger-default-rtdb.firebaseio.com/'
});

export default burgerAPI;
