import axios from "axios";

const BASE_URL = "http://localhost:8080/api/dashboard";

const dashboardService = {

    getBooks: (userId) =>
        axios.get(`${BASE_URL}/${userId}/books`),

    getSeats: (userId) =>
        axios.get(`${BASE_URL}/${userId}/seats`),

    getEvents: (userId) =>
        axios.get(`${BASE_URL}/${userId}/events`)

};

export default dashboardService;