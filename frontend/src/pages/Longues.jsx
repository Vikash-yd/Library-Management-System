import { useNavigate } from "react-router-dom";
import {
  FaComments,
  FaBookOpen,
  FaUsers,
  FaLightbulb,
  FaBullseye,
  FaCoffee,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Longues.css";
import { useEffect, useState } from "react";

function Longues() {
  const navigate = useNavigate();
  const [lounges, setLounges] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLounges();
  }, []);

  // ✅ Fallback static data (friend’s version preserved)
  const fallbackLounges = [
    {
      id: "discussion-room",
      icon: <FaComments />,
      title: "Discussion Room",
      description:
        "Exchange ideas, ask doubts, and have meaningful discussions with other learners in an active community space.",
      buttonText: "Join Discussion",
    },
    {
      id: "reading-zone",
      icon: <FaBookOpen />,
      title: "Reading Zone",
      description:
        "A calm and focused space designed for reading, self-study, and quiet learning without distractions.",
      buttonText: "Start Reading",
    },
    {
      id: "group-study",
      icon: <FaUsers />,
      title: "Group Study",
      description:
        "Work together with friends, revise topics, solve problems, and make learning more interactive and effective.",
      buttonText: "Join Group",
    },
    {
      id: "brainstorm-hub",
      icon: <FaLightbulb />,
      title: "Brainstorm Hub",
      description:
        "Share creative thoughts, project ideas, and innovative solutions with a collaborative mindset.",
      buttonText: "Explore Ideas",
    },
    {
      id: "focus-pods",
      icon: <FaBullseye />,
      title: "Focus Pods",
      description:
        "Reserved productivity corners for intense concentration, task completion, and goal-based study sessions.",
      buttonText: "Enter Pod",
    },
    {
      id: "relax-corner",
      icon: <FaCoffee />,
      title: "Relax Corner",
      description:
        "Take a short break, recharge your mind, and enjoy a comfortable space between study sessions.",
      buttonText: "Take a Break",
    },
  ];

  const getIcon = (index) => {
    const icons = [
      <FaComments />,
      <FaBookOpen />,
      <FaUsers />,
      <FaLightbulb />,
      <FaBullseye />,
      <FaCoffee />,
    ];
    return icons[index % icons.length];
  };

  // ✅ API fetch (your version)
  const fetchLounges = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/lounges");
      const data = await response.json();

      const loungesWithIcons = data.map((lounge, index) => ({
        ...lounge,
        icon: getIcon(index),
        buttonText: lounge.buttonText || "Explore Lounge",
      }));

      setLounges(loungesWithIcons);
    } catch (error) {
      console.error("Error fetching lounges:", error);

      // ✅ fallback to static data (IMPORTANT MERGE PART)
      setLounges(fallbackLounges);
    }
  };

  const handleExploreSpaces = () => {
    const section = document.getElementById("lounges-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewActivities = () => {
    navigate("/activities");
  };

  const handleCardClick = (id) => {
    navigate(`/longues/${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="longues-page">
        <section className="longues-hero">
          <div className="longues-hero-overlay">
            <p className="longues-subtitle">Connect • Learn • Grow</p>
            <h1 className="page-heading">Community Lounges</h1>
            <p className="longues-description">
              Discover interactive spaces made for collaboration, quiet reading,
              focused study, and student engagement.
            </p>

            <div className="longues-hero-buttons">
              <button className="primary-btn" onClick={handleExploreSpaces}>
                Explore Spaces
              </button>
              <button className="secondary-btn" onClick={handleViewActivities}>
                View Activities
              </button>
            </div>
          </div>
        </section>

        <section className="lounges-section" id="lounges-section">
          <h2 className="section-heading">Choose Your Space</h2>

          <div className="lounges-grid">
            {lounges.map((lounge, index) => (
              <div className="lounge-card" key={lounge.id || index}>
                <div className="lounge-icon">{lounge.icon}</div>
                <h3>{lounge.title}</h3>
                <p>{lounge.description}</p>
                <button
                  className="card-btn"
                  onClick={() => handleCardClick(lounge.id)}
                >
                  {lounge.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Longues;