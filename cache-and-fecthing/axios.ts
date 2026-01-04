import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${'your env'}/api`,
  withCredentials: false,
});