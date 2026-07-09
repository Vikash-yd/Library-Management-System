import axios from "axios";

const BASE_URL = "http://localhost:8080/events";

const eventRegistrationService = {
  registerForEvent: (userId, eventId) => {
    return axios.post(
      `${BASE_URL}/register?userId=${userId}&eventId=${eventId}`
    );
  }
};

export default eventRegistrationService;