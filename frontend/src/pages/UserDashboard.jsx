import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardService from "../services/dashboardService";
import QRCodeModal from "../components/QRCodeModal";
import HistoryModal from "../components/HistoryModal";
import Navbar from "../components/Navbar";
import "./UserDashboard.css";
import bookReservationService from "../services/bookReservationService";

const UserDashboard = () => {
     const navigate = useNavigate();


    const user = JSON.parse(localStorage.getItem("user"));


    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("BOOKS");



    // ================= QR =================


    const [showQR, setShowQR] = useState(false);

    const [qrType, setQrType] = useState("");
    // ================= CANCEL =================

const [cancelLoading, setCancelLoading] = useState(false);

    const [selectedBooking, setSelectedBooking] = useState(null);



    // ================= HISTORY =================


    const [showHistory, setShowHistory] = useState(false);

    const [historyTitle, setHistoryTitle] = useState("");

    const [historyData, setHistoryData] = useState([]);



    // ================= DASHBOARD DATA =================


    const [dashboardData, setDashboardData] = useState({
    currentBookReservations: [],
    bookHistory: [],
    currentSeatBooking: null,
    seatHistory: [],
    eventRegistrations: [],
    eventHistory: []
});





    // ================= INITIAL LOAD =================


    useEffect(() => {

        if (user?.id) {

            loadBooks();

        }

    }, []);





    // ================= BOOKS =================


     const loadBooks = async () => {
    try {
        setLoading(true);

        const [currentBooks, bookHistory] = await Promise.all([
            bookReservationService.getCurrentReservations(user.id),
            bookReservationService.getReservationHistory(user.id)
        ]);

        console.log("CURRENT BOOKS:", currentBooks);
        console.log("BOOK HISTORY:", bookHistory);

        setDashboardData(prev => ({
            ...prev,
            currentBookReservations: Array.isArray(currentBooks)
                ? currentBooks
                : [],
            bookHistory: Array.isArray(bookHistory)
                ? bookHistory
                : []
        }));

    } catch (error) {
        console.error("Book API Error:", error);
    } finally {
        setLoading(false);
    }
};


    // ================= SEATS =================


    const loadSeats = async () => {
    try {
        setLoading(true);

        const [currentResponse, historyResponse] = await Promise.all([
            dashboardService.getSeats(user.id),
            dashboardService.getSeatHistory(user.id)
        ]);

        console.log("Current Seat:", currentResponse.data);
        console.log("Seat History:", historyResponse.data);

        setDashboardData(prev => ({
            ...prev,
            currentSeatBooking: currentResponse.data,
            seatHistory: Array.isArray(historyResponse.data)
                ? historyResponse.data
                : []
        }));

    } catch (error) {
        console.error("Seat API Error:", error);
    } finally {
        setLoading(false);
    }
};




    // ================= EVENTS =================


    const loadEvents = async () => {


        try {


            setLoading(true);



            const response =
                await dashboardService.getEvents(user.id);



            console.log(
                "Events:",
                response.data
            );



            setDashboardData(prev => ({


                ...prev,


                eventRegistrations:
                    response.data ?? [],


                eventHistory: []


            }));



        } catch(error) {


            console.error(
                "Event API Error:",
                error
            );


        } finally {


            setLoading(false);


        }


    };





    // ================= TAB CHANGE =================


    const handleTabChange = (tab) => {


        setActiveTab(tab);



        switch(tab){


            case "BOOKS":

                loadBooks();

                break;



            case "SEATS":

                loadSeats();

                break;



            case "EVENTS":

                loadEvents();

                break;



            default:

                break;


        }


    };





    // ================= QR =================


    const openQR = (type, booking) => {


        console.log(
            "OPEN QR:",
            type,
            booking
        );



        setQrType(type);

        setSelectedBooking(booking);

        setShowQR(true);


    };



    const closeQR = () => {


        setShowQR(false);

        setSelectedBooking(null);

        setQrType("");


    };





    // ================= HISTORY =================


    const openHistory = (title, data) => {


        console.log(
            "OPEN HISTORY:",
            title,
            data
        );



        setHistoryTitle(title);

        setHistoryData(data);

        setShowHistory(true);


    };



    const closeHistory = () => {


        setShowHistory(false);

        setHistoryData([]);


    };





    // ================= LOGIN =================


    if (!user) {


        return (

            <div className="dashboard-page">

                <h2>
                    Please login first.
                </h2>

            </div>

        );


    }





    // ================= LOADING =================


    if (loading) {


        return (
            

            <div className="dashboard-page">

                <h2>
                    Loading Dashboard...
                </h2>

            </div>

        );


    }





    return (
        <><Navbar/>

        <div className="dashboard-page">


            <div className="dashboard-header">


                <h1>
                    My Dashboard
                </h1>


                <p>
                    Welcome back,
                    <strong> {user.name}</strong>
                </p>


            </div>


            <div className="dashboard-tabs">


                <button
                    className={activeTab === "BOOKS" ? "active" : ""}
                    onClick={() => handleTabChange("BOOKS")}
                >

                     Books

                </button>


                <button
                    className={activeTab === "SEATS" ? "active" : ""}
                    onClick={() => handleTabChange("SEATS")}
                >

                     Seats

                </button>


                <button
                    className={activeTab === "EVENTS" ? "active" : ""}
                    onClick={() => handleTabChange("EVENTS")}
                >

                     Events

                </button>


            </div>


            <div className="dashboard-content">
                
               {/* ================= BOOKS ================= */}

{activeTab === "BOOKS" && (

    <div className="dashboard-section">

        <h2>
            Current Book Reservations
        </h2>

        {dashboardData.currentBookReservations?.length > 0 ? (

            dashboardData.currentBookReservations.map(
                (reservation, index) => (

                    <div
                        className="dashboard-card"
                        key={reservation.id || index}
                    >

                        <h3>
                            {reservation.book?.title}
                        </h3>

                        <p>
                            <strong>
                                Author:
                            </strong>{" "}
                            {reservation.book?.author}
                        </p>

                        <p>
                            <strong>
                                Status:
                            </strong>{" "}
                            {reservation.status}
                        </p>

                        <p>
                            <strong>
                                Due Date:
                            </strong>{" "}
                            {reservation.dueDate}
                        </p>

                        <div className="dashboard-actions">

                            <button
                                className="qr-btn"
                                onClick={() =>
                                    openQR(
                                        "BOOK",
                                        reservation
                                    )
                                }
                            >
                                📱 Show QR
                            </button>

                            <button
                                className="qr-btn"
                                onClick={() =>
                                    navigate(
                                        `/books/details/${reservation.book?.id}`
                                    )
                                }
                            >
                                👁️ Show Book
                            </button>

                        </div>

                    </div>

                )
            )

        ) : (

            <div className="empty-card">

                No Active Book Reservations

            </div>

        )}

        <button
            className="history-btn section-history-btn"
            onClick={() =>
                openHistory(
                    "Book History",
                    dashboardData.bookHistory
                )
            }
        >

            📚 View Book History
            ({dashboardData.bookHistory.length})

        </button>

    </div>

)}





                {/* ================= SEATS ================= */}


                {activeTab === "SEATS" && (


                    <div className="dashboard-section">


                        <h2>
                            Current Seat Booking
                        </h2>



                        {dashboardData.currentSeatBooking ? (


                            <div className="dashboard-card">


                                <h3>
                                    Seat Booking
                                </h3>



                                <p>
                                    <strong>
                                        Booking ID:
                                    </strong>{" "}
                                    {
                                    dashboardData.currentSeatBooking.bookingId
                                    }
                                </p>



                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}
                                    {
                                    dashboardData.currentSeatBooking.status
                                    }
                                </p>



                                <div className="dashboard-actions">


                                    <button
                                        className="qr-btn"
                                        onClick={() =>
                                            openQR(
                                                "SEAT",
                                                dashboardData.currentSeatBooking
                                            )
                                        }
                                    >

                                        📱 Show QR

                                    </button>


                                </div>


                            </div>


                        ) : (


                            <div className="empty-card">

                                No Active Seat Booking

                            </div>


                        )}





                        <button
                            className="history-btn section-history-btn"
                            onClick={() =>
                                openHistory(
                                    "Seat History",
                                    dashboardData.seatHistory
                                )
                            }
                        >

                            🪑 View Seat History
                            ({dashboardData.seatHistory.length})

                        </button>



                    </div>


                )}








                {/* ================= EVENTS ================= */}



                {activeTab === "EVENTS" && (


                    <div className="dashboard-section">


                        <h2>
                            Event Registrations
                        </h2>




                        {
                        dashboardData.eventRegistrations.length > 0 ? (


                            dashboardData.eventRegistrations.map(
                                (event,index)=>(


                                    <div
                                        className="dashboard-card"
                                        key={event.id || index}
                                    >


                                        <h3>
                                            {event.event?.title}
                                        </h3>



                                        <p>
                                            <strong>
                                                Status:
                                            </strong>{" "}
                                            {event.status}
                                        </p>



                                        <div className="dashboard-actions">


                                            <button
                                                className="qr-btn"
                                                onClick={() =>
                                                    openQR(
                                                        "EVENT",
                                                        event
                                                    )
                                                }
                                            >

                                                📱 Show QR

                                            </button>
                                            <button
  className="qr-btn"
  onClick={() => navigate(`/event/${event.event?.id}`)}
>
  👁️ Show Event
</button>


                                        </div>


                                    </div>


                                )


                            )


                        ) : (


                            <div className="empty-card">

                                No Event Registrations

                            </div>


                        )
                        }





                        <button
                            className="history-btn section-history-btn"
                            onClick={() =>
                                openHistory(
                                    "Event History",
                                    dashboardData.eventHistory
                                )
                            }
                        >

                            🎉 View Event History
                            ({dashboardData.eventHistory.length})

                        </button>



                    </div>


                )}



            </div>





            {/* ================= MODALS ================= */}



            {showQR && (

                <QRCodeModal

                    open={showQR}

                    type={qrType}

                    booking={selectedBooking}

                    onClose={closeQR}

                />

            )}





            {showHistory && (

                <HistoryModal

                    open={showHistory}

                    title={historyTitle}

                    history={historyData}

                    onClose={closeHistory}

                />

            )}



        </div>

</>
    );

};


export default UserDashboard;