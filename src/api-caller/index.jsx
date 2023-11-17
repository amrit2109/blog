import axios from "axios";

const axiosInstance = axios.create();
 
axiosInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = process.env.REACT_APP_GRAPHQL_URL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;

