import axios from "axios";

import systemConfig from "../config/system";

const axiosInstance = axios.create({
  baseURL: `${systemConfig.BASE_URL}/api`,
  timeout: systemConfig.API_TIMEOUT
});
export default axiosInstance;
