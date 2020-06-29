import axios, { AxiosRequestConfig } from 'axios';
import { getBearerToken } from 'utils';

export const createClient = () => {
  const defaultOptions: AxiosRequestConfig = {
    headers: {
      Authorization: getBearerToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
  };

  return axios.create(defaultOptions);
};
