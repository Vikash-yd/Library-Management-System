import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import bookReservationService from "../services/bookReservationService";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Success popup
  const [showPopup, setShowPopup] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Bottom-right toast
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  // ===========================
  // LOAD BOOK
  // ===========================
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/categories/book/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const data = await response.json();
        setBook(data);

      } catch (error) {
        console.error("Error fetching book:", error);

        setPopupType("error");
        setPopupMessage("Failed to load book details.");

        setTimeout(() => {
          setPopupMessage("");
        }, 3000);

      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // ===========================
  // RESERVE BOOK
  // ===========================
  const handleGrabBook = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setPopupType("error");
      setPopupMessage("Please login first.");

      setTimeout(() => {
        setPopupMessage("");
      }, 3000);

      return;
    }

    try {

      setBookingLoading(true);

      const reservation =
        await bookReservationService.reserveBook(
          user.id,
          book.id
        );

      setBookingId(reservation.reservationId);

      setPopupType("success");
      setPopupMessage("Book reserved successfully!");

      setShowPopup(true);

      setTimeout(() => {
        setPopupMessage("");
      }, 3000);

    } catch (err) {

      console.error(err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        err.message ||
        "Book reservation failed.";

      setPopupType("error");
      setPopupMessage(message);

      setTimeout(() => {
        setPopupMessage("");
      }, 3000);

    } finally {
      setBookingLoading(false);
    }
  };

  // ===========================
  // LOADING PAGE
  // ===========================
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="book-details-page">
          <h2 className="not-found">
            Loading book details...
          </h2>
        </div>

        {popupMessage && (
          <div className={`seat-popup ${popupType}`}>
            {popupMessage}
          </div>
        )}

        <Footer />
      </>
    );
  }

  // ===========================
  // BOOK NOT FOUND
  // ===========================
  if (!book) {
    return (
      <>
        <Navbar />

        <div className="book-details-page">
          <h2 className="not-found">
            Book not found.
          </h2>
        </div>

        {popupMessage && (
          <div className={`seat-popup ${popupType}`}>
            {popupMessage}
          </div>
        )}

        <Footer />
      </>
    );
  }
    return (
    <>
      <Navbar />

      <div className="book-details-page">

        <div className="book-details-card">

          <div className="details-image-section">
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="details-image"
            />
          </div>

          <div className="details-content">

            <h1>{book.title}</h1>

            <p className="book-description">
              {book.description}
            </p>

            <div className="details-grid">

              <p>
                <strong>Author:</strong> {book.author}
              </p>

              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>

              <p>
                <strong>Published Date:</strong> {book.publishedDate}
              </p>

              <p>
                <strong>Category:</strong> {book.category}
              </p>

              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>

              <p>
                <strong>Language:</strong> {book.language}
              </p>

              <p>
                <strong>Pages:</strong> {book.pageCount}
              </p>

              <p>
                <strong>Rating:</strong> ⭐ {book.rating}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {book.available
                  ? "Available"
                  : "Not Available"}
              </p>

              <p
                className={
                  book.availableCopies < 10
                    ? "stock-count low-stock"
                    : "stock-count"
                }
              >
                <strong>
                  Books Available in Library:
                </strong>{" "}
                {book.availableCopies}

                {book.availableCopies < 10 &&
                  " (Low Stock)"}
              </p>

            </div>

            <button
              className="grab-book-btn"
              onClick={handleGrabBook}
              disabled={bookingLoading}
            >
              {bookingLoading
                ? "Reserving..."
                : "Grab This Book"}
            </button>

          </div>

        </div>

      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="popup-overlay">

          <div className="popup-card">

            <h2>
              Book Reserved Successfully 🎉
            </h2>

            <p>
              Your reservation has been created successfully.
            </p>

            <div className="booking-id">
              Reservation ID: {bookingId}
            </div>

            <button
              className="close-popup-btn"
              onClick={() =>
                setShowPopup(false)
              }
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* BOTTOM-RIGHT TOAST */}
      {popupMessage && (
        <div className={`seat-popup ${popupType}`}>
          {popupMessage}
        </div>
      )}

      <Footer />
    </>
  );
}

export default BookDetails;