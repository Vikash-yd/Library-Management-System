import axios from "axios";

const API_BASE = "http://localhost:8080/api/halls";

const hallService = {
  // Get all halls
  getAllHalls: async () => {
    const response = await axios.get(API_BASE);
    return response.data;
  },

  // Get only active halls
  getActiveHalls: async () => {
    const response = await axios.get(`${API_BASE}/active`);
    return response.data;
  },

  // Get hall by ID
  getHallById: async (hallId) => {
    const response = await axios.get(`${API_BASE}/${hallId}`);
    return response.data;
  },

  // Get recommended halls
  getRecommendedHalls: async (lounge) => {
    const response = await axios.get(`${API_BASE}/recommended`, {
      params: {
        lounge,
      },
    });

    return response.data;
  },
};

export default hallService;