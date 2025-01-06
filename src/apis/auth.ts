import axios from 'axios';
import { API_PATH } from './api-path';

export const useLogin = async () => {
  const response = await axios.get(`${API_PATH.login}`);
  console.log(response);
  return response.data;
};
