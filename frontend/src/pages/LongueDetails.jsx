import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LongueDetails.css";

function LongueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lounge, setLounge] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const loungeResponse = await fetch(
          `http://localhost:8080/lounges/${id}`
        );

        const loungeData = await loungeResponse.json();

        const eventResponse = await fetch(
          `http://localhost:8080/events/lounge/${id}`
        );

        const eventData = await eventResponse.json();

        setLounge(loungeData);
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching lounge details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="longue-details-page">
          <div className="details-wrapper">
            <h2>Loading...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!lounge) {
    return (
      <>
        <Navbar />
        <div className="longue-details-page">
          <div className="details-wrapper">
            <h2>Lounge not found</h2>

            <button onClick={() => navigate("/longues")}>
              Back to Lounges
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="longue-details-page">
        <div className="details-wrapper">

          <section className="details-hero-card">
            <div className="details-hero-content">

              <p className="details-small-label">
                SMART LIBRARY EXPERIENCE
              </p>

              <h1>{lounge.title}</h1>

              <p className="details-description">
                {lounge.description}
              </p>

            </div>
          </section>

          <section className="sessions-section">

            <div className="section-top">
              <h2>Events</h2>

              <button onClick={() => navigate("/activities")}>
                View Activities
              </button>
            </div>

            <div className="session-grid">

              {events.length === 0 ? (
                <h3>No Events Available</h3>
              ) : (
                events.map((event) => (
                  <div className="session-card" key={event.id}>

                    <h3>{event.title}</h3>

                    <p>{event.description}</p>

                    {event.eventDate && (
                      <p>
                        <strong>Date:</strong> {event.eventDate}
                      </p>
                    )}

                    {event.eventTime && (
                      <p>
                        <strong>Time:</strong> {event.eventTime}
                      </p>
                    )}

                    {event.hostName && (
                      <p>
                        <strong>Host:</strong> {event.hostName}
                      </p>
                    )}

                    {event.venue && (
                      <p>
                        <strong>Venue:</strong> {event.venue}
                      </p>
                    )}

                    <button
                      onClick={() =>
                        navigate(`/event/${event.id}`)
                      }
                    >
                      View Event
                    </button>

                  </div>
                ))
              )}

            </div>

          </section>

          <div className="bottom-btn-row">

            <button onClick={() => navigate("/longues")}>
              Back to Spaces
            </button>

            <button onClick={() => navigate("/activities")}>
              My Activities
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default LongueDetails;