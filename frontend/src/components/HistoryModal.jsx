import "./HistoryModal.css";

const HistoryModal = ({
    open,
    onClose,
    title,
    history
}) => {

    if (!open) return null;


    const getStatusClass = (status) => {

        switch(status) {

            case "ACTIVE":
                return "status-active";

            case "CANCELLED":
                return "status-cancelled";

            case "COMPLETED":
                return "status-completed";

            case "EXPIRED":
                return "status-expired";

            default:
                return "";

        }

    };


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

                            <div className="history-title">

                                {item.book.title}

                            </div>


                            <div className="history-details">


                                <p>
                                    <strong>Author</strong>
                                    <span>
                                        {item.book.author}
                                    </span>
                                </p>


                                <p>
                                    <strong>Status</strong>

                                    <span className={
                                        `status-badge ${getStatusClass(item.status)}`
                                    }>
                                        {item.status}
                                    </span>

                                </p>


                                <p>
                                    <strong>Borrowed</strong>
                                    <span>
                                        {item.borrowedAt}
                                    </span>
                                </p>


                                <p>
                                    <strong>Returned</strong>
                                    <span>
                                    {
                                    item.returnedAt || "Not Returned"
                                    }
                                    </span>
                                </p>


                            </div>

                            </>

                        )}




                        {/* SEAT */}


                        {item.seat && (

                            <>


                            <div className="history-title">

                                 Seat {item.seat.seatNumber}

                            </div>



                            <div className="history-details">


                                <p>
                                    <strong>Date</strong>

                                    <span>
                                        {item.bookingDate}
                                    </span>

                                </p>



                                <p>

                                    <strong>Time</strong>

                                    <span>
                                    {item.startTime} - {item.endTime}
                                    </span>

                                </p>



                                <p>

                                    <strong>Status</strong>

                                    <span className={
                                        `status-badge ${getStatusClass(item.status)}`
                                    }>
                                        {item.status}
                                    </span>

                                </p>


                            </div>


                            </>

                        )}






                        {/* EVENT */}


                        {item.event && (

                            <>


                            <div className="history-title">

                                {item.event.title}

                            </div>



                            <div className="history-details">


                                <p>

                                    <strong>Date</strong>

                                    <span>
                                        {item.event.eventDate}
                                    </span>

                                </p>



                                <p>

                                    <strong>Venue</strong>

                                    <span>
                                        {item.event.venueName}
                                    </span>

                                </p>



                                <p>

                                    <strong>Status</strong>

                                    <span className={
                                        `status-badge ${getStatusClass(item.status)}`
                                    }>
                                        {item.status}
                                    </span>

                                </p>
                                <p>
    <strong>Registered</strong>

    <span>
        {item.registeredAt}
    </span>
</p>



                                

        

    


                            </div>


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