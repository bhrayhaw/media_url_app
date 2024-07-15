import axios from "axios";

console.log("Script is running");

const apiUrl = import.meta.env.VITE_APP_API_URL;
console.log("Latest API URL from environment:", apiUrl);

const API = axios.create({
  baseURL: apiUrl,
});

// Setting headers using AxiosHeaders
API.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "multipart/form-data";
  config.headers["Custom-Header"] = "CustomValue";
  return config;
});

console.log("Axios instance created");

export default API;
