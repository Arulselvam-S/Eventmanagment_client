import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = API_URL;

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
