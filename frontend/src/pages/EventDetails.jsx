
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  // Works from your PC and phone on the same Wi-Fi
  const API_BASE_URL = "http://localhost:8080";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/events/${id}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch event: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("EVENT DETAILS:", data);

      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshEvent = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/events/${id}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to refresh event: ${response.status}`
        );
      }

      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error("Error refreshing event:", error);
    }
  };

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong"
    );
  };

  const handleRegister = async (e) => {
    if (registering) return;

    const button = e?.currentTarget;

    if (button) {
      button.classList.add("clicked");

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 150);
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

    let user;

    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      showToast("Invalid user session ❌");
      return;
    }

    if (!user?.id) {
      showToast("Invalid user session ❌");
      return;
    }

    try {
      setRegistering(true);

      await eventRegistrationService.registerForEvent(
        user.id,
        event.id
      );

      showToast("Registered successfully 🎉");

      // Optimistic update
      setEvent((previous) => ({
        ...previous,
        seatsLeft: Math.max(
          0,
          (previous.seatsLeft || 0) - 1
        ),
        registrations:
          (previous.registrations || 0) + 1,
      }));

      // Sync with backend
      await refreshEvent();
    } catch (error) {
      console.error("Registration error:", error);
      showToast(getErrorMessage(error));
    } finally {
      setRegistering(false);
    }
  };

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="event-details-page">
        <div className="event-wrapper">
          <div className="loading-text">
            Loading Event...
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================
     EVENT NOT FOUND
  ========================================================== */

  if (!event) {
    return (
      <>
        <div className="event-details-page">
          <div className="event-wrapper">
            <section className="event-hero not-found-card">
              <h1>Event Not Found</h1>

              <p className="desc">
                We couldn't find the event you're looking for.
              </p>

              <button
                className="register-btn"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </section>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="event-details-page">

        <div className="event-wrapper">

          {/* ==================================================
              HERO
          ================================================== */}

          <section className="event-hero">

            <div className="badges">

              {event.status && (
                <span className="status">
                  {event.status}
                </span>
              )}

              {event.featured && (
                <span className="featured">
                  ⭐ FEATURED
                </span>
              )}

              {event.certificateProvided && (
                <span className="cert">
                  🏆 CERTIFICATE PROVIDED
                </span>
              )}

            </div>

            <h1>{event.title}</h1>

            {event.description && (
              <p className="desc">
                {event.description}
              </p>
            )}

            <div className="event-info">

              {event.eventDate && (
                <span>
                  📅 {event.eventDate}
                </span>
              )}

              {event.eventTime && (
                <span>
                  ⏰ {event.eventTime}
                </span>
              )}

              {event.durationMinutes && (
                <span>
                  ⏱️ {event.durationMinutes} minutes
                </span>
              )}

              {event.venueName && (
                <span>
                  📍 {event.venueName}
                </span>
              )}

            </div>

          </section>


          {/* ==================================================
              EVENT STATS
          ================================================== */}

          <section className="event-stats">

            <div>
              <h4>{event.totalSeats ?? 0}</h4>
              <p>Total Seats</p>
            </div>

            <div>
              <h4>{event.seatsLeft ?? 0}</h4>
              <p>Seats Left</p>
            </div>

            <div>
              <h4>{event.registrations ?? 0}</h4>
              <p>Registrations</p>
            </div>

            <div>
              <h4>
                {event.rating
                  ? `${event.rating} ⭐`
                  : "N/A"}
              </h4>
              <p>Rating</p>
            </div>

            <div>
              <h4>{event.views ?? 0}</h4>
              <p>Views</p>
            </div>

          </section>


          {/* ==================================================
              WHAT YOU WILL LEARN
          ================================================== */}

          {event.whatYouWillLearn && (
            <section className="info-card">

              <h3>📚 What You Will Learn</h3>

              <p>
                {event.whatYouWillLearn}
              </p>

            </section>
          )}


          {/* ==================================================
              PREREQUISITES
          ================================================== */}

          {event.prerequisites && (
            <section className="info-card">

              <h3>📝 Prerequisites</h3>

              <p>
                {event.prerequisites}
              </p>

            </section>
          )}


          {/* ==================================================
              SPEAKER / HOST
          ================================================== */}

          <section className="info-card speaker-card">

            <h3>👤 About the Speaker</h3>

            <div className="speaker-content">

              {event.hostProfileImage && (
                <img
                  src={event.hostProfileImage}
                  alt={event.hostName || "Event Speaker"}
                  className="speaker-image"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <div className="speaker-details">

                {event.hostName && (
                  <h4>{event.hostName}</h4>
                )}

                {event.hostDesignation && (
                  <p>
                    <strong>Designation:</strong>{" "}
                    {event.hostDesignation}
                  </p>
                )}

                {event.hostQualification && (
                  <p>
                    <strong>Qualification:</strong>{" "}
                    {event.hostQualification}
                  </p>
                )}

                {event.hostOrganization && (
                  <p>
                    <strong>Organization:</strong>{" "}
                    {event.hostOrganization}
                  </p>
                )}

                {event.contactEmail && (
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="email-link"
                    >
                      {event.contactEmail}
                    </a>
                  </p>
                )}

              </div>

            </div>

          </section>


          {/* ==================================================
              DURATION
          ================================================== */}

          {event.durationMinutes && (
            <section className="info-card">

              <h3>⏱️ Duration</h3>

              <p>
                {event.durationMinutes} minutes
              </p>

            </section>
          )}


          {/* ==================================================
              CERTIFICATE
          ================================================== */}

          <section className="info-card">

            <h3>🏆 Certificate</h3>

            <p>
              {event.certificateProvided
                ? "A certificate will be provided to participants after completing this event."
                : "A certificate is not provided for this event."}
            </p>

          </section>


          {/* ==================================================
              VENUE
          ================================================== */}

          <section className="info-card">

            <h3>📍 Venue</h3>

            {event.venueName && (
              <p>
                <strong>{event.venueName}</strong>
              </p>
            )}

            {event.venueAddress && (
              <p>
                {event.venueAddress}
              </p>
            )}

          </section>


          {/* ==================================================
              TAGS
          ================================================== */}

          {event.tags && event.tags.length > 0 && (
            <section className="info-card">

              <h3>🏷️ Event Tags</h3>

              <div className="tags">

                {event.tags.map((tag, index) => (
                  <span
                    className="tag"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}

              </div>

            </section>
          )}


          {/* ==================================================
              READY TO JOIN
          ================================================== */}

          <section className="action-section">

            <h3>Ready to Join?</h3>

            <p className="desc">
              Reserve your seat for{" "}
              <strong>{event.title}</strong>.
            </p>

            <button
              className="register-btn"
              onClick={handleRegister}
              disabled={
                registering ||
                Number(event.seatsLeft || 0) <= 0
              }
            >
              {registering
                ? "Booking..."
                : Number(event.seatsLeft || 0) <= 0
                ? "Sold Out"
                : "Book Seat"}
            </button>

            {Number(event.seatsLeft || 0) <= 0 && (
              <p className="sold-out">
                No seats available
              </p>
            )}

          </section>

        </div>
      </div>


      {/* ======================================================
          TOAST
      ======================================================= */}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      <Footer />
    </>
  );
}

export default EventDetails;

