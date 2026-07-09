import axios from "axios";

const API_URL = "http://localhost:8080/api/lounges";

export const getLounges = () => {
  return axios.get(API_URL);
};

export const createLounge = (data) => {
  return axios.post(API_URL, data);
};