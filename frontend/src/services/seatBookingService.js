import axios from "axios";

const BASE_URL = "http://localhost:8080/api/seat-bookings";

const seatBookingService = {

  // ============================
  // BOOK SEAT
  // ============================
  bookSeat: async (
    userId,
    seatId,
    bookingDate,
    startTime,
    durationMinutes
  ) => {

    const response = await axios.post(
      `${BASE_URL}/book`,
      null,
      {
        params: {
          userId,
          seatId,
          bookingDate,
          startTime,
          durationMinutes,
        },
      }
    );

    return response.data;
  },

  // ============================
  // GET BOOKINGS OF A HALL
  // ============================
  getHallBookings: async (
    hallId,
    bookingDate,
    startTime,
    durationMinutes
  ) => {

    const response = await axios.get(
      `${BASE_URL}/hall/${hallId}`,
      {
        params: {
          bookingDate,
          startTime,
          durationMinutes,
        },
      }
    );

    return response.data;
  },

  // ============================
  // CURRENT USER BOOKING
  // ============================
  getCurrentBooking: async (userId) => {

    const response = await axios.get(
      `${BASE_URL}/current/${userId}`
    );

    return response.data;
  },

  // ============================
  // USER BOOKING HISTORY
  // ============================
  getBookingHistory: async (userId) => {

    const response = await axios.get(
      `${BASE_URL}/history/${userId}`
    );

    return response.data;
  },

  // ============================
  // CANCEL BOOKING
  // ============================
  cancelBooking: async (bookingId) => {

    const response = await axios.put(
      `${BASE_URL}/cancel/${bookingId}`
    );

    return response.data;
  },

  // ============================
  // GET BOOKING BY ID
  // ============================
  getBookingById: async (bookingId) => {

    const response = await axios.get(
      `${BASE_URL}/${bookingId}`
    );

    return response.data;
  },

  // ============================
  // GET ALL BOOKINGS
  // ============================
  getAllBookings: async () => {

    const response = await axios.get(BASE_URL);

    return response.data;
  },

};

export default seatBookingService;