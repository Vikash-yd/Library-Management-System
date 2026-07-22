const API_URL = "http://localhost:8080/api";


const handleResponse = async (response) => {

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } 
  catch {
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




// ✅ Get seats of a hall
const getSeatsByHall = async (hallId) => {

  const response = await fetch(
    `${API_URL}/seats/hall/${hallId}`
  );


  return handleResponse(response);

};




// ✅ Book a specific seat
const bookSeat = async (
  seatNumber,
  hallId,
  userId
) => {


  const response = await fetch(

    `${API_URL}/seats/book?seatNumber=${seatNumber}&hallId=${hallId}&userId=${userId}`,

    {
      method: "POST",
    }

  );


  return handleResponse(response);

};




// ✅ Unbook a user's seat
const unbookSeat = async (userId) => {


  const response = await fetch(

    `${API_URL}/seats/unbook?userId=${userId}`,

    {
      method: "POST",
    }

  );


  return handleResponse(response);

};




// ⭐ DEFAULT EXPORT ADDED
// Allows:
// import seatService from "../services/seatService";

export default {

  getSeatsByHall,

  bookSeat,

  unbookSeat

};