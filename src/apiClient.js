import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://career-path-backend-production.up.railway.app/api",
});

export default apiClient;