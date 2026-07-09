import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Seat.css";

import hallService from "../services/hallService";
import seatService from "../services/seatService";
import seatBookingService from "../services/seatBookingService";

function Seat() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [halls, setHalls] = useState([]);
  const [selectedHallId, setSelectedHallId] = useState("");

  const [seats, setSeats] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [selectedSeat, setSelectedSeat] = useState(null);

  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [startTime, setStartTime] = useState("09:00");
  const [durationMinutes, setDurationMinutes] = useState(60);

  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // LOAD HALLS
  // =========================
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const data = await hallService.getActiveHalls();

        setHalls(data || []);

        if (data && data.length > 0) {
          setSelectedHallId(data[0].id);
        }
      } catch (err) {
        console.error("Hall loading failed:", err);
      }
    };

    fetchHalls();
  }, []);

  // =========================
  // LOAD SEATS
  // =========================
  const loadSeats = async (hallId) => {
    try {
      const data = await seatService.getSeatsByHall(hallId);
      setSeats(data || []);
    } catch (err) {
      console.error("Seat loading failed:", err);
      setSeats([]);
    }
  };

  // =========================
  // LOAD BOOKINGS
  // =========================
  const loadBookings = async (hallId) => {
    if (!hallId) return;

    try {
      const data = await seatBookingService.getHallBookings(
        hallId,
        bookingDate,
        startTime,
        durationMinutes
      );

      setBookings(data || []);
    } catch (err) {
      console.error("Booking loading failed:", err);
      setBookings([]);
    }
  };

  // =========================
  // RELOAD ON FILTER CHANGE
  // =========================
  useEffect(() => {
    if (!selectedHallId) return;

    loadSeats(selectedHallId);
    loadBookings(selectedHallId);
  }, [
    selectedHallId,
    bookingDate,
    startTime,
    durationMinutes,
  ]);

  // =========================
  // AUTO REFRESH BOOKINGS
  // =========================
  useEffect(() => {
    if (!selectedHallId) return;

    const interval = setInterval(() => {
      loadBookings(selectedHallId);
    }, 5000);

    return () => clearInterval(interval);
  }, [
    selectedHallId,
    bookingDate,
    startTime,
    durationMinutes,
  ]);

  // =========================
  // BOOKED SEAT MAP
  // =========================
  const bookedMap = useMemo(() => {
    const map = {};

    bookings.forEach((booking) => {
      if (
        booking.status === "ACTIVE" &&
        booking.seat &&
        booking.seat.seatNumber
      ) {
        map[booking.seat.seatNumber] = true;
      }
    });

    return map;
  }, [bookings]);

  // =========================
  // SELECT SEAT
  // =========================
  const handleSeatClick = (seat) => {
    if (bookedMap[seat.seatNumber]) return;

    if (selectedSeat?.id === seat.id) {
      setSelectedSeat(null);
      setPopupMessage("Seat unselected");
    } else {
      setSelectedSeat(seat);
      setPopupMessage(`${seat.seatNumber} selected`);
    }

    setTimeout(() => setPopupMessage(""), 1200);
  };

  // =========================
  // BOOK SEAT
  // =========================
  const handleBooking = async () => {

  if (!user?.id) {
    setPopupMessage("Please login first.");
    setTimeout(() => setPopupMessage(""), 2500);
    return;
  }

  if (!selectedSeat) {
    setPopupMessage("Please select a seat.");
    setTimeout(() => setPopupMessage(""), 2500);
    return;
  }

  try {
    setLoading(true);

    await seatBookingService.bookSeat(
      user.id,
      selectedSeat.id,
      bookingDate,
      startTime,
      durationMinutes
    );

    setPopupMessage("Seat booked successfully!");

    setSelectedSeat(null);

    await loadBookings(selectedHallId);

  } catch (err) {

    console.error(err);

    setPopupMessage(
      err.response?.data?.message ||
      err.response?.data ||
      err.message ||
      "Booking failed."
    );

  } finally {

    setLoading(false);

    setTimeout(() => {
      setPopupMessage("");
    }, 2500);

  }
};
    return (
    <>
      <Navbar />

      <div className="seat-page">

        {/* HERO */}
        <section className="seat-header-box">
          <div>
            <p className="seat-subtitle">
              SELECT • RESERVE • STUDY
            </p>

            <h1 className="seat-title">
              Seat Booking System
            </h1>

            <p className="seat-description">
              Book your seat in real-time using our time-slot booking system.
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="seat-shell">

          {/* CONTROLS */}
          <div className="hall-controls-box">

            <select
              value={selectedHallId}
              onChange={(e) =>
                setSelectedHallId(Number(e.target.value))
              }
            >
              {halls.length === 0 ? (
                <option>No halls available</option>
              ) : (
                halls.map((hall) => (
                  <option
                    key={hall.id}
                    value={hall.id}
                  >
                    {hall.name}
                  </option>
                ))
              )}
            </select>

            <input
              type="date"
              value={bookingDate}
              onChange={(e) =>
                setBookingDate(e.target.value)
              }
            />

            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
            />

            <select
              value={durationMinutes}
              onChange={(e) =>
                setDurationMinutes(Number(e.target.value))
              }
            >
              <option value={30}>30 Minutes</option>
              <option value={60}>1 Hour</option>
              <option value={120}>2 Hours</option>
            </select>

          </div>

          {/* SEAT GRID */}
          <div className="seat-grid">

            {seats.length === 0 ? (

              <div
                style={{
                  color: "#cbd5e1",
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "30px",
                  fontSize: "16px",
                }}
              >
                No seats available in this hall.
              </div>

            ) : (

              seats.map((seat) => {

                const isBooked =
                  bookedMap[seat.seatNumber];

                const isSelected =
                  selectedSeat?.id === seat.id;

                return (
                  <button
                    key={seat.id}
                    onClick={() =>
                      handleSeatClick(seat)
                    }
                    className={`seat-box
                      ${isBooked ? "booked" : "available"}
                      ${isSelected ? "selected" : ""}
                    `}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })

            )}

          </div>
          <div className="seat-legend">
  <div className="legend-item">
    <span className="legend-color legend-available"></span>
    Available
  </div>

  <div className="legend-item">
    <span className="legend-color legend-selected"></span>
    Selected
  </div>

  <div className="legend-item">
    <span className="legend-color legend-booked"></span>
    Booked
  </div>
</div>

          {/* BOOKING SUMMARY */}
          <div className="booking-summary-box">

            <h3>Booking Summary</h3>

            <p>
              <strong>Hall:</strong>{" "}
              {halls.find(
                (h) => h.id === selectedHallId
              )?.name || "-"}
            </p>

            <p>
              <strong>Seat:</strong>{" "}
              {selectedSeat
                ? selectedSeat.seatNumber
                : "None Selected"}
            </p>

            <p>
              <strong>Date:</strong> {bookingDate}
            </p>

            <p>
              <strong>Time:</strong> {startTime}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {durationMinutes} Minutes
            </p>

            <button
              className="book-now-btn"
              onClick={handleBooking}
              disabled={
                loading ||
                !selectedSeat
              }
            >
              {loading
                ? "Booking..."
                : "Book Seat"}
            </button>

          </div>

        </div>

      </div>

      {popupMessage && (
  <div
    className={`seat-popup ${
      popupMessage.toLowerCase().includes("success") ||
      popupMessage.toLowerCase().includes("selected")
        ? "popup-success"
        : "popup-error"
    }`}
  >
    {popupMessage}
  </div>
)}

      <Footer />
    </>
  );
}

export default Seat;