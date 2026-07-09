import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import libraryImage from "./assets/library.jpg";
import GlassCard from "./components/GlassCard";
import img1 from "./assets/book1.jpg";
import img2 from "./assets/book2.jpg";
import img3 from "./assets/book3.jpg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const cardsRef = useRef(null);
  const navigate = useNavigate();

  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      <div className="hero">
        <img
          src={libraryImage}
          alt="Cozy Reading Space"
          className="hero-image"
        />

        <div className="overlay">
          <div className="cta-card welcome-card">
            <span>Welcome Aliens!!</span>
          </div>

          <div className="cta-card" onClick={scrollToCards}>
            <span>Find Your Quiet Space ⬇️</span>
          </div>
        </div>
      </div>

      <div className="cards-section" ref={cardsRef}>
        <GlassCard
          title="Book Collection"
          imgSrc={img1}
          buttonText="View Books"
          onButtonClick={() => navigate("/books")}
        />

        <GlassCard
          title="Book Seat"
          imgSrc={img2}
          buttonText="Grab your Seat"
          onButtonClick={() => navigate("/seat")}
        />

        <GlassCard
          title="Community Lounges"
          imgSrc={img3}
          buttonText="Explore Lounges"
          onButtonClick={() => navigate("/longues")}
        />
      </div>

      <Footer />
    </>
  );
}

export default App;