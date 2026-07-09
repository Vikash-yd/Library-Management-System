import "./HistoryModal.css";

const HistoryModal = ({
    open,
    onClose,
    title,
    history
}) => {

    if (!open) return null;

    return (

        <div className="history-overlay">

            <div className="history-modal">

                <div className="history-header">

                    <h2>{title}</h2>

                    <button
                        className="history-close"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="history-body">

                    {history.length > 0 ? (

                        history.map((item) => (

                            <div
                                key={item.id}
                                className="history-card"
                            >

                                {/* BOOK */}

                                {item.book && (

                                    <>

                                        <h3>{item.book.title}</h3>

                                        <p>

                                            <strong>Author:</strong>{" "}

                                            {item.book.author}

                                        </p>

                                        <p>

                                            <strong>Status:</strong>{" "}

                                            {item.status}

                                        </p>

                                        <p>

                                            <strong>Borrowed:</strong>{" "}

                                            {item.borrowedAt}

                                        </p>

                                        <p>

                                            <strong>Returned:</strong>{" "}

                                            {item.returnedAt || "Not Returned"}

                                        </p>

                                    </>

                                )}

                                {/* SEAT */}

                                {item.seat && (

                                    <>

                                        <h3>

                                            Seat {item.seat.seatNumber}

                                        </h3>

                                        <p>

                                            <strong>Date:</strong>{" "}

                                            {item.bookingDate}

                                        </p>

                                        <p>

                                            <strong>Time:</strong>{" "}

                                            {item.startTime} - {item.endTime}

                                        </p>

                                        <p>

                                            <strong>Status:</strong>{" "}

                                            {item.status}

                                        </p>

                                    </>

                                )}

                                {/* EVENT */}

                                {item.event && (

                                    <>

                                        <h3>

                                            {item.event.title}

                                        </h3>

                                        <p>

                                            <strong>Date:</strong>{" "}

                                            {item.event.eventDate}

                                        </p>

                                        <p>

                                            <strong>Venue:</strong>{" "}

                                            {item.event.venueName}

                                        </p>

                                        <p>

                                            <strong>Status:</strong>{" "}

                                            {item.status}

                                        </p>

                                        <p>

                                            <strong>Registered:</strong>{" "}

                                            {item.registeredAt}

                                        </p>

                                    </>

                                )}

                            </div>

                        ))

                    ) : (

                        <div className="history-empty">

                            No History Found

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};

export default HistoryModal;