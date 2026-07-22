import "./LibraryTable.css";
import { FaBolt } from "react-icons/fa";


export default function LibraryTable({

    tableNo,
    seats,
    bookedMap,
    selectedSeat,
    onSelect,
    hallPurpose

}) {
console.log("TABLE:", tableNo, "SEATS:", seats);

const seatButton = (seat)=>{
    console.log(seat);

return (

<button
    key={seat.id}
    className={
        bookedMap[seat.seatNumber]
            ? "chair-seat booked-seat"
            : selectedSeat?.id === seat.id
            ? "chair-seat selected-seat"
            : "chair-seat available-seat"
    }
    disabled={bookedMap[seat.seatNumber]}
    onClick={() => onSelect(seat)}
>

    {seat.seatNumber}

    {seat.hasChargingPort && (
    <FaBolt className="charging-icon" />
)}

</button>

)

};





// ===============================
// RESEARCH HALL
// ===============================

if (hallPurpose === "Research") {

return (

<div className="research-table">


    {/* TOP TWO SEATS */}
    <div className="research-top">

        {seats[0] && seatButton(seats[0])}

        {seats[1] && seatButton(seats[1])}

    </div>



    <div className="research-middle">


        {/* LEFT ONE SEAT */}

        <div className="research-left">

            {seats[2] && seatButton(seats[2])}

        </div>




        {/* SMALL TABLE */}

        <div className="research-body">

            TABLE {tableNo}

        </div>




        {/* RIGHT ONE SEAT */}

        <div className="research-right">

            {seats[3] && seatButton(seats[3])}

        </div>


    </div>



    {/* BOTTOM TWO SEATS */}

    <div className="research-bottom">

        {seats[4] && seatButton(seats[4])}

        {seats[5] && seatButton(seats[5])}

    </div>


</div>

)

}


// ===============================
// GENERAL HALL
// ===============================


if(hallPurpose==="General Reading"){


return (

<div className="square-table">



<div className="single-seat">

{
seats[0] && seatButton(seats[0])
}

</div>



<div className="square-middle">


<div>

{
seats[1] && seatButton(seats[1])
}

</div>



<div className="square-body">

TABLE {tableNo}

</div>



<div>

{
seats[2] && seatButton(seats[2])
}

</div>



</div>




<div className="single-seat">

{
seats[3] && seatButton(seats[3])
}

</div>



</div>

)

}






// ===============================
// PREMIUM DEFAULT
// ===============================


return (

<div className="premium-table">



<div className="table-seat-row">

{
seats.slice(0,4).map(seatButton)
}

</div>



<div className="long-table">

TABLE {tableNo}

</div>



<div className="table-seat-row">

{
seats.slice(4,8).map(seatButton)
}

</div>



</div>

)


}