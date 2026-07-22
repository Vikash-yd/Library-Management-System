import "./HallLayout.css";

function HallLayout({ hall, children }) {

  return (
    <div className="hall-container">

      {/* TOP ENTRANCE EXIT */}
      <div className="hall-top-bar">
        <div className="entrance">
           Entrance
        </div>

        <div className="exit">
           Exit
        </div>
      </div>


      {/* WINDOWS */}
{
  hall.windows?.map((window, index)=>(
     <div
 key={index}
 className={`window ${window.side}`}
 style={
  window.side === "left" || window.side === "right"
  ?
  {top:`${window.position}%`}
  :
  {left:`${window.position}%`}
 }
>

<div className="glass-box">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>

</div>
  ))
}


      {/* SEATS AREA */}
      <div className="hall-seat-area">
        {children}
      </div>


    </div>
  );
}

export default HallLayout;