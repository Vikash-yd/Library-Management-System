 import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./LongueDetails.css";
import { useEffect } from "react";

function Activities() {
  const navigate = useNavigate();
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activities = [
    {
      title: "Open Discussion on Literature & Society",
      status: "Enrolled",
      date: "2 April 2026",
      time: "11:00 AM - 12:00 PM",
      place: "Hall A - Discussion Arena",
      host: "Dr. Meera Sharma",
      type: "Discussion Room",
    },
    {
      title: "Morning Silent Reading Session",
      status: "Completed",
      date: "30 March 2026",
      time: "9:00 AM - 11:00 AM",
      place: "Reading Hall 1",
      host: "Library Reading Club",
      type: "Reading Zone",
    },
    {
      title: "Math Revision Circle",
      status: "Upcoming",
      date: "3 April 2026",
      time: "1:00 PM - 2:30 PM",
      place: "Study Cluster 4",
      host: "Student Mentor Riya",
      type: "Group Study",
    },
    {
      title: "Startup Idea Jam",
      status: "Upcoming",
      date: "4 April 2026",
      time: "2:00 PM - 3:30 PM",
      place: "Innovation Studio",
      host: "Innovation Cell",
      type: "Brainstorm Hub",
    },
    {
      title: "Evening Productivity Session",
      status: "Saved",
      date: "2 April 2026",
      time: "6:00 PM - 8:00 PM",
      place: "Pod 8",
      host: "Automated Pod Booking",
      type: "Focus Pods",
    },
    {
      title: "Tea & Unwind Break",
      status: "Completed",
      date: "28 March 2026",
      time: "4:00 PM - 4:30 PM",
      place: "Relax Lounge",
      host: "Student Wellness Team",
      type: "Relax Corner",
    },
    {
      title: "Career Q&A Student Circle",
      status: "Enrolled",
      date: "3 April 2026",
      time: "3:00 PM - 4:00 PM",
      place: "Seminar Corner 2",
      host: "Placement Support Team",
      type: "Discussion Room",
    },
    {
      title: "Creative Project Pitch Session",
      status: "Upcoming",
      date: "5 April 2026",
      time: "12:00 PM - 1:30 PM",
      place: "Brainstorm Arena",
      host: "Prof. Arjun Malhotra",
      type: "Brainstorm Hub",
    },
  ];

  const introBoxStyle = {
    maxWidth: "1200px",
    margin: "0 auto 30px",
    padding: "34px",
    borderRadius: "28px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.82), rgba(30,41,59,0.72))",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
  };

  const miniBoxStyle = {
    maxWidth: "1200px",
    margin: "0 auto 26px",
    padding: "20px 24px",
    borderRadius: "22px",
    background: "rgba(30,41,59,0.72)",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
  };

  return (
    <>
      <Navbar />

      <div className="longue-details-page">
        <section
          style={{
            padding: "40px 20px 10px",
          }}
        >
          <div style={introBoxStyle}>
            <p
              style={{
                color: "#7dd3fc",
                fontSize: "0.86rem",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              My Activity Dashboard
            </p>

            <h1
              style={{
                color: "#ffffff",
                fontSize: "3rem",
                lineHeight: "1.15",
                marginBottom: "14px",
              }}
            >
              My Activities
            </h1>

            <p
              style={{
                maxWidth: "850px",
                color: "#dbeafe",
                fontSize: "1.04rem",
                lineHeight: "1.85",
                marginBottom: "24px",
              }}
            >
              Track your enrolled, completed, saved, and upcoming sessions in
              one premium dashboard. This page gives users a cleaner and more
              organized view of their library engagement journey with session
              timings, hosts, categories, and learning spaces.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button className="select-btn" onClick={() => navigate("/longues")}>
                Explore More Spaces
              </button>
              <button className="outline-btn">Manage My Sessions</button>
            </div>
          </div>

          <div style={miniBoxStyle}>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "1.8rem",
                marginBottom: "8px",
              }}
            >
              Your Learning Journey
            </h2>
            <p
              style={{
                color: "#cbd5e1",
                lineHeight: "1.7",
                fontSize: "1rem",
              }}
            >
              Review your activity history, upcoming selections, saved sessions,
              and the spaces where you are learning, engaging, and growing.
            </p>
          </div>
        </section>

        <div className="details-wrapper">
          <section className="sessions-section">
            <div className="session-grid">
              {activities.map((activity, index) => (
                <div className="session-card" key={index}>
                  <div className="session-card-top">
                    <div>
                      <div className="session-tag-row">
                        <span className="session-badge">{activity.status}</span>
                        <span className="session-level">{activity.type}</span>
                      </div>
                      <h3>{activity.title}</h3>
                    </div>
                    <div className="seat-chip">{activity.date}</div>
                  </div>

                  <div className="session-info-grid">
                    <div className="info-item">
                      <span>Time</span>
                      <strong>{activity.time}</strong>
                    </div>
                    <div className="info-item">
                      <span>Place</span>
                      <strong>{activity.place}</strong>
                    </div>
                    <div className="info-item">
                      <span>Host</span>
                      <strong>{activity.host}</strong>
                    </div>
                    <div className="info-item">
                      <span>Category</span>
                      <strong>{activity.type}</strong>
                    </div>
                  </div>

                  <div className="session-action-row">
                    <button className="select-btn">Open Details</button>
                    <button className="outline-btn">Manage</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Activities;
