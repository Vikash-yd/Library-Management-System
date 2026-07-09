import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Books from './pages/Books.jsx';
import Longues from './pages/Longues.jsx';
import Seat from './pages/Seat.jsx';
import CategoryBooks from './pages/CategoryBooks.jsx';
import BookDetails from './pages/BookDetails.jsx';
import LongueDetails from "./pages/LongueDetails.jsx";
import EventDetails from "./pages/EventDetails";
import Activities from "./pages/Activities.jsx";
import Search from './pages/Search.jsx';
import UserDashboard from "./pages/UserDashboard";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/category/:category" element={<CategoryBooks />} />
        <Route path="/books/details/:id" element={<BookDetails />} />
        <Route path="/longues" element={<Longues />} />
        <Route path="/longues/:id" element={<LongueDetails />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);