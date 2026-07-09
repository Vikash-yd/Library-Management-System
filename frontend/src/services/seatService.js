const API_URL = "http://localhost:8080/api";

const handleResponse = async (response) => {
  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      data ||
      `Request failed (${response.status})`
    );
  }

  return data;
};

const seatService = {
  // Get seats of a hall
  getSeatsByHall: async (hallId) => {
    const response = await fetch(`${API_URL}/seats/hall/${hallId}`);
    return handleResponse(response);
  },

  // Legacy APIs (optional)
  bookSeat: async (seatNumber, hallId, userId) => {
    const response = await fetch(
      `${API_URL}/seats/book?seatNumber=${seatNumber}&hallId=${hallId}&userId=${userId}`,
      {
        method: "POST",
      }
    );

    return handleResponse(response);
  },

  unbookSeat: async (userId) => {
    const response = await fetch(
      `${API_URL}/seats/unbook?userId=${userId}`,
      {
        method: "POST",
      }
    );

    return handleResponse(response);
  },
};

export default seatService;