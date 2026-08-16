import axios from "axios";

const BASE_URL = "http://localhost:8080/api/dashboard";

const dashboardService = {

    getBooks: (userId) =>
        axios.get(`${BASE_URL}/${userId}/books`),

    getBookHistory: (userId) =>
        axios.get(`${BASE_URL}/${userId}/books/history`),


    getSeats: (userId) =>
        axios.get(`${BASE_URL}/${userId}/seats`),

    getSeatHistory: (userId) =>
        axios.get(`${BASE_URL}/${userId}/seats/history`),


    getEvents: (userId) =>
        axios.get(`${BASE_URL}/${userId}/events`),

    getEventHistory: (userId) =>
        axios.get(`${BASE_URL}/${userId}/events/history`)

};

export default dashboardService;