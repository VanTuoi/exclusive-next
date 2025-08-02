import axios, { AxiosError } from "axios";

import { getNextAuthToken } from "~/utils";

const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json"
  }
  // withCredentials: true
});

const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 20000
  // withCredentials: true
});

privateApi.interceptors.request.use(
  async (config) => {
    const token = await getNextAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

publicApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
);

privateApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
);

export { privateApi, publicApi };
