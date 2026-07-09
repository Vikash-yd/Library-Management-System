import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Books.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import {
  FaBook,
  FaFlask,
  FaBriefcase,
  FaGavel,
  FaGlobe,
  FaFeatherAlt,
  FaHeart,
  FaChild,
} from "react-icons/fa";

function Books() {
  const navigate = useNavigate();
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [categories, setCategories] = useState([]);

  // Icons array for dynamic cards
  const icons = [
    <FaBook />,
    <FaFlask />,
    <FaBriefcase />,
    <FaGavel />,
    <FaGlobe />,
    <FaFeatherAlt />,
    <FaHeart />,
    <FaChild />,
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleExplore = (category) => {
    navigate(`/books/category/${category}`);
  };

  const formatCategory = (category) => {
    return category
      .toLowerCase()
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  console.log(categories);

  return (
    <>
      <Navbar />

      <div className="books-page">
        <section className="page-hero">
          <div className="page-hero-overlay">
            <p className="page-subtitle">READ • LEARN • EXPLORE</p>

            <h1 className="page-title">Book Collection</h1>

            <p className="page-description">
              Discover a wide range of books across multiple domains and
              expand your knowledge.
            </p>
          </div>
        </section>

        <div className="books-grid">
          {categories.map((category, index) => (
            <div className="book-card" key={index}>
              <div className="book-icon">
                {icons[index % icons.length]}
              </div>

              <h3>{formatCategory(category)}</h3>

              <p>
                Explore books available under the{" "}
                {formatCategory(category)} category.
              </p>

              <button
                className="book-btn"
                onClick={() => handleExplore(category)}
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Books;