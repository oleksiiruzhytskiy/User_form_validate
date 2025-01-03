import axios from 'axios';
import { BASE_URL } from './urls';
export default axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });