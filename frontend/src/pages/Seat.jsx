import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LibraryTable from "../components/LibraryTable";
 
import "./Seat.css";
import HallLayout from "./HallLayout.jsx";

import hallService from "../services/hallService";
import seatService from "../services/seatService";
import seatBookingService from "../services/seatBookingService";
const hallLayouts = {

1:{
 windows:[
  // Left side - 2 windows
  {side:"left", position:20},
  {side:"left", position:65},

  // Right side - 1 window
  {side:"right", position:45},

  // Bottom side - 1 window
  {side:"bottom", position:50}
 ]
},



2:{
 windows:[
  // Left side - 1 window
  {side:"left", position:40},

  // Right side - 2 windows
  {side:"right", position:25},
  {side:"right", position:70},

  // Bottom side - 2 windows
  {side:"bottom", position:25},
  {side:"bottom", position:75}
 ]
},



3:{
 windows:[
  // Left side - 2 windows
  {side:"left", position:30},
  {side:"left", position:70},

  // Right side - 1 window
  {side:"right", position:50},

  // Bottom side - 1 window
  {side:"bottom", position:50}
 ]
},



4:{
 windows:[
  // Left side - 1 window
  {side:"left", position:50},

  // Right side - 2 windows
  {side:"right", position:25},
  {side:"right", position:75},

  // Bottom side - 2 windows
  {side:"bottom", position:35},
  {side:"bottom", position:70}
 ]
}

};
function Seat() {

console.log("SEAT COMPONENT RENDER");
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
  const [currentBooking, setCurrentBooking] = useState(null);
   

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

console.log("LOAD SEATS CALLED:", hallId);

try {

const data = await seatService.getSeatsByHall(hallId);

console.log("SEATS FROM API:", data);

setSeats(data || []);

}
catch(err){

console.error("Seat loading failed:",err);

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

const loadCurrentBooking = async () => {

  if(!user?.id) return;

  try {

    const data = await seatBookingService.getCurrentBooking(user.id);

if(data){
    setCurrentBooking(data);
}
else{
    setCurrentBooking(null);
}

  } catch(err){

    console.error("Current booking load failed", err);

    setCurrentBooking(null);

  }

};
   

   

  // =========================
  // AUTO REFRESH BOOKINGS
  // =========================
  useEffect(() => {

    console.log("USE EFFECT RUNNING");
    console.log("SELECTED HALL ID:", selectedHallId);

    if (!selectedHallId) {
        console.log("NO HALL SELECTED");
        return;
    }

    loadSeats(selectedHallId);
    loadBookings(selectedHallId);
    loadCurrentBooking();

}, [
    selectedHallId,
    bookingDate,
    startTime,
    durationMinutes
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
// GROUP SEATS BY TABLE
 
 const tables = useMemo(() => {

    const map = {};

    seats.forEach((seat)=>{

        const tableNumber = seat.tableNo || seat.table_no;

        if(!map[tableNumber]){
            map[tableNumber] = [];
        }

        map[tableNumber].push(seat);

    });

    console.log("TABLE GROUP:",map);

    return map;

},[seats]);



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

    await loadCurrentBooking();

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
const handleCancelBooking = async () => {

    if (!currentBooking?.bookingId) {
        setPopupMessage("No active booking found.");
        return;
    }

    try {

        setLoading(true);

        await seatBookingService.cancelBooking(
            currentBooking.bookingId
        );


        setPopupMessage("Seat unbooked successfully!");

        // remove old booking from UI
        setCurrentBooking(null);
        setSelectedSeat(null);


        // refresh booked seats
        await loadBookings(selectedHallId);


        // verify user booking is cleared
        await loadCurrentBooking();


    } catch (err) {

        console.error(
            "Cancel booking error:",
            err.response?.data || err
        );

        setPopupMessage(
            err.response?.data ||
            "Unable to unbook seat."
        );

    } finally {

        setLoading(false);

        setTimeout(()=>{
            setPopupMessage("");
        },2500);

    }

};
  return (
<>
<Navbar />

<div className="seat-page">

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



<div className="seat-shell">


{/* CONTROLS */}

<div className="hall-controls-box">

<div className="control-row">


<div className="control-group">

<label>Hall</label>

<select
value={selectedHallId}
onChange={(e)=>setSelectedHallId(Number(e.target.value))}
>

{
halls.map((hall)=>(

<option
key={hall.id}
value={hall.id}
>

{hall.name}

</option>

))
}

</select>

</div>



<div className="control-group">

<label>Date</label>

<input
type="date"
value={bookingDate}
onChange={(e)=>setBookingDate(e.target.value)}
/>

</div>



<div className="control-group">

<label>Start Time</label>

<input
type="time"
value={startTime}
onChange={(e)=>setStartTime(e.target.value)}
/>

</div>



<div className="control-group">

<label>Duration</label>

<select
value={durationMinutes}
onChange={(e)=>setDurationMinutes(Number(e.target.value))}
>

<option value={30}>
30 Minutes
</option>

<option value={60}>
1 Hour
</option>

<option value={120}>
2 Hours
</option>

</select>

</div>


</div>

</div>





{/* FLOOR PLAN */}

<HallLayout
    hall={
        hallLayouts[selectedHallId] || 
        {windows:[]}
    }
>


<div className="library-floor-plan">


{
Object.entries(tables).map(([tableNo,tableSeats])=>(

<LibraryTable

key={tableNo}

tableNo={Number(tableNo)}

seats={tableSeats}

bookedMap={bookedMap}

selectedSeat={selectedSeat}

onSelect={handleSeatClick}

hallPurpose={
halls.find(
h=>h.id===selectedHallId
)?.purpose
}

/>

))

}


</div>


</HallLayout>




{/* LEGEND */}

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


<h3>
Booking Summary
</h3>



<p>

<strong>
Hall:
</strong>{" "}

{
currentBooking
?
currentBooking?.seat?.hall?.name || "-"
:
halls.find(
h=>h.id===selectedHallId
)?.name || "-"
}

</p>



<p>

<strong>
Seat:
</strong>{" "}

{
currentBooking
?
currentBooking?.seat?.seatNumber
:
selectedSeat
?
selectedSeat.seatNumber
:
"None Selected"
}

</p>




<p>

<strong>
Date:
</strong>{" "}

{
currentBooking
?
currentBooking.bookingDate
:
bookingDate
}

</p>




<p>

<strong>
Time:
</strong>{" "}

{
currentBooking
?
currentBooking.startTime
:
startTime
}

</p>




<p>

<strong>
Duration:
</strong>{" "}

{
currentBooking
?
currentBooking.durationMinutes
:
durationMinutes
}

{" Minutes"}

</p>





<div className="booking-buttons">



<button

className="book-now-btn"

onClick={handleBooking}

disabled={
loading ||
currentBooking !== null||
!selectedSeat 

}

>

{
loading
?
"Booking..."
:
"Book Seat"
}

</button>




<button
className="book-now-btn"
onClick={handleCancelBooking}
disabled={
 loading || currentBooking === null
}
>
{
loading
? "Processing..."
: "Unbook Seat"
}
</button>


</div>



</div>



</div> 
{/* seat-shell end */}


</div>
{/* seat-page end */}




{
popupMessage && (

<div

className={`seat-popup ${
popupMessage.toLowerCase().includes("success") ||
popupMessage.toLowerCase().includes("selected")
?
"popup-success"
:
"popup-error"
}`}

>

{popupMessage}

</div>

)

}



<Footer />


</>

);}
export default Seat;