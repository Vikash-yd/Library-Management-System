import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import eventRegistrationService from "../services/eventRegistrationService";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`http://localhost:8080/events/${id}`);
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshEvent = async () => {
    try {
      const res = await fetch(`http://localhost:8080/events/${id}`);
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const getErrorMessage = (err) => {
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong"
    );
  };

  const handleRegister = async (e) => {
    if (registering) return;

    const btn = e?.currentTarget;

    if (btn) {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 150);
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      showToast("Please login first ❌");
      navigate("/login");
      return;
    }

    if (!event?.id) {
      showToast("Event not loaded ❌");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user?.id) {
      showToast("Invalid user session ❌");
      return;
    }

    try {
      setRegistering(true);

      const res = await eventRegistrationService.registerForEvent(
        user.id,
        event.id
      );

      showToast("Registered successfully 🎉");

      // Optimistic UI update
      setEvent((prev) => ({
        ...prev,
        seatsLeft: prev.seatsLeft - 1,
        registrations: prev.registrations + 1,
      }));

      // sync with backend
      await refreshEvent();

    } catch (err) {
      showToast(getErrorMessage(err));
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="event-details-page">
          <h2 className="loading-text">Loading Event...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="event-details-page">
          <h2>Event Not Found</h2>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="event-details-page">
        <div className="event-wrapper">

          <div className="event-hero">
            <h1>{event.title}</h1>
            <p>{event.description}</p>

            <div className="event-info">
              <span>📅 {event.eventDate}</span>
              <span>⏰ {event.eventTime}</span>
              <span>📍 {event.venueName}</span>
            </div>
          </div>

          <div className="event-stats">
            <div>Total Seats: {event.totalSeats}</div>
            <div>Seats Left: {event.seatsLeft}</div>
            <div>Registered: {event.registrations}</div>
          </div>

          <div className="action-section">
            <button
              className="register-btn"
              onClick={handleRegister}
              disabled={registering || event.seatsLeft <= 0}
            >
              {registering
                ? "Booking..."
                : event.seatsLeft <= 0
                ? "Sold Out"
                : "Book Seat"}
            </button>

            {event.seatsLeft <= 0 && (
              <p className="sold-out">No seats available</p>
            )}
          </div>

        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}

      <Footer />
    </>
  );
}

export default EventDetails;