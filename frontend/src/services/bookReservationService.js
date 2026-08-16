import axios from "axios";

const BASE_URL = "http://localhost:8080/api/book-reservations";

const bookReservationService = {

  reserveBook: async (userId, bookId) => {
    const response = await axios.post(
      `${BASE_URL}/reserve`,
      null,
      {
        params: {
          userId,
          bookId,
        },
      }
    );

    return response.data;
  },

  getCurrentReservations: async (userId) => {
    const response = await axios.get(
      `${BASE_URL}/current/${userId}`
    );

    return response.data;
  },

  getReservationHistory: async (userId) => {
    const response = await axios.get(
      `${BASE_URL}/history/${userId}`
    );

    return response.data;
  },

};

export default bookReservationService;