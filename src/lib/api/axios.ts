import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN", // 필요 시 추가
  },
});

export default api;
