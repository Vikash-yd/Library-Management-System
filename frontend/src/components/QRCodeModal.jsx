import React from "react";
import QRCode from "react-qr-code";
import "./QRCodeModal.css";

const QRCodeModal = ({
    open,
    onClose,
    type,
    booking
}) => {

    if (!open || !booking) return null;

    const qrData = JSON.stringify({
        type: type,
        id: booking.id
    });

    const displayId =
        booking.reservationId ||
        booking.bookingId ||
        booking.registrationId ||
        booking.id;

    return (

        <div className="qr-overlay">

            <div className="qr-modal">

                <button
                    className="qr-close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2>Library QR Pass</h2>

                <div className="qr-code-container">

                    <QRCode
                        value={qrData}
                        size={220}
                    />

                </div>

                <div className="qr-details">

                    <p>

                        <strong>Type:</strong> {type}

                    </p>

                    <p>

                        <strong>ID:</strong> {displayId}

                    </p>

                    {type === "BOOK" && booking.book && (

                        <>
                            <p>

                                <strong>Book:</strong>{" "}

                                {booking.book.title}

                            </p>

                            <p>

                                <strong>Author:</strong>{" "}

                                {booking.book.author}

                            </p>
                        </>

                    )}

                    {type === "SEAT" && booking.seat && (

                        <>
                            <p>

                                <strong>Seat:</strong>{" "}

                                {booking.seat.seatNumber}

                            </p>

                            <p>

                                <strong>Date:</strong>{" "}

                                {booking.bookingDate}

                            </p>
                        </>

                    )}

                    {type === "EVENT" && booking.event && (

                        <>
                            <p>

                                <strong>Event:</strong>{" "}

                                {booking.event.title}

                            </p>

                            <p>

                                <strong>Date:</strong>{" "}

                                {booking.event.eventDate}

                            </p>
                        </>

                    )}

                </div>

                <div className="qr-note">

                    Show this QR code to the library staff for verification.

                </div>

            </div>

        </div>

    );

};

export default QRCodeModal;