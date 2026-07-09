import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Search.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const queryParams = useQuery();
  const navigate = useNavigate();

  const query = queryParams.get("query");
  const type = queryParams.get("type") || "books";

  const [books, setBooks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatText = (text) => {
    if (!text) return "";
    return text
      .toString()
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:8080/api/search?query=${query}&type=${type}`
        );

        const data = await response.json();

        setBooks(data.books || []);
        setEvents(data.events || []);
      } catch (error) {
        console.error(error);
        setBooks([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, type]);

  return (
    <>
      <Navbar />

      <div className="search-page">
        <div className="search-wrapper">

          <h2 className="search-title">
            Search Results for <span>"{query}"</span>
          </h2>

          {loading && <div className="info">Loading...</div>}

          {!loading && books.length === 0 && events.length === 0 && (
            <div className="info">No results found.</div>
          )}

          {/* BOOKS */}

          {books.length > 0 && (
            <>
              <h2 className="section-heading">Books</h2>

              <div className="results-grid">

                {books.map((book) => (

                  <div className="book-card" key={book.id}>

                    <img
                      src={
                        book.coverImageUrl ||
                        "https://via.placeholder.com/300x420?text=No+Cover"
                      }
                      alt={book.title}
                    />

                    <div className="book-info">

                      <h3>{book.title}</h3>

                      <div className="detail-row">
                        <span className="label">Author</span>
                        <span className="value">{book.author}</span>
                      </div>

                      <div className="detail-row">
                        <span className="label">Category</span>
                        <span className="value">{formatText(book.category)}</span>
                      </div>

                      <div className="detail-row">
                        <span className="label">Rating</span>
                        <span className="value">⭐ {book.rating}</span>
                      </div>

                      <div className="detail-row">
                        <span className="label">Available</span>
                        <span className="value">
                          {book.availableCopies} / {book.totalCopies}
                        </span>
                      </div>

                      <button
                        className="show-book-btn"
                        onClick={() => navigate(`/books/details/${book.id}`)}
                      >
                        Show Book
                      </button>

                    </div>

                  </div>

                ))}

              </div>
            </>
          )}

          {/* EVENTS */}

          {events.length > 0 && (
            <>
              <h2 className="section-heading">Events</h2>

              <div className="results-grid">

                {events.map((event) => (

                  <div className="book-card" key={event.id}>

                    <img
                      src={
                        event.bannerImage ||
                        "https://via.placeholder.com/300x420?text=Event"
                      }
                      alt={event.title}
                    />

                    <div className="book-info">

                      <h3>{event.title}</h3>

                      <div className="detail-row">
                        <span className="label">Date</span>
                        <span className="value">{event.eventDate}</span>
                      </div>

                      <div className="detail-row">
                        <span className="label">Venue</span>
                        <span className="value">{event.venueName}</span>
                      </div>

                      <div className="detail-row">
                        <span className="label">Status</span>
                        <span className="value">{formatText(event.status)}</span>
                      </div>

                      <div className="detail-row">
                        <span className="label">Seats Left</span>
                        <span className="value">{event.seatsLeft}</span>
                      </div>

                      <button
                        className="show-book-btn"
                        onClick={() => navigate(`/event/${event.id}`)}
                      >
                        Show Event
                      </button>

                    </div>

                  </div>

                ))}

              </div>
            </>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Search;
