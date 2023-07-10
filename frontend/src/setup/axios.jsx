import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // handle before request is sent
    return config;
  },
  (error) => {
    // handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // handle response data
    return response.data;
  },
  (error) => {
    // handle response un-authen error
    if (error.response.status === 401) {
      navigate("/login");
    }
    return Promise.reject(error.response.data);
  }
);
export default axiosInstance;
