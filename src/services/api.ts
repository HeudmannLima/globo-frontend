import axios from 'axios';

const apiChart = axios.create({
  baseURL: 'https://run.mocky.io',
});

const apiBackend = axios.create({
  baseURL: 'http://localhost:3333',
});

export default { apiBackend, apiChart };