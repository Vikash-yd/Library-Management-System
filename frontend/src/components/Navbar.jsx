import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const searches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    setRecentSearches(searches);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  const saveRecentSearch = (text) => {
    if (!text.trim()) return;

    let searches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    searches = [
      text,
      ...searches.filter((item) => item.toLowerCase() !== text.toLowerCase()),
    ].slice(0, 5);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(searches)
    );

    setRecentSearches(searches);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    saveRecentSearch(query);

    navigate(
      `/search?query=${encodeURIComponent(query)}&type=${searchType}`
    );

    setShowFilters(false);
  };

  const clearHistory = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const filters = [
    "all",
    "books",
    "events",
    "lounges",
    "categories",
  ];

  return (
    <nav className="navbar">
      <h2 className="logo">
        Library <span>Hub</span>
      </h2>

      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder={
            user
              ? `Hi ${user.name}, search books, events, lounges...`
              : "Search books, events, lounges..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowFilters(true)}
          onBlur={() =>
            setTimeout(() => {
              setShowFilters(false);
            }, 200)
          }
        />

        <button className="search-btn" type="submit">
          🔍
        </button>

        {showFilters && (
          <div className="search-filters">
            {recentSearches.length > 0 && (
              <>
                <div className="recent-header">
                  <span>Recent Searches</span>

                  <button
                    type="button"
                    className="clear-btn"
                    onMouseDown={clearHistory}
                  >
                    Clear
                  </button>
                </div>

                <div className="recent-search-list">
                  {recentSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="recent-search-item"
                      onMouseDown={() => setQuery(item)}
                    >
                      🕘 {item}
                    </button>
                  ))}
                </div>

                <hr />
              </>
            )}

            <div className="chip-wrapper">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    searchType === filter
                      ? "filter-chip active-chip"
                      : "filter-chip"
                  }
                  onMouseDown={() => setSearchType(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {!user ? (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>

            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <li className="user-menu">
            <div
              className="user-name"
              onClick={() => setOpen(!open)}
            >
              👤 {user.name}
            </div>

            {open && (
              <div className="dropdown">

                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setOpen(false);
                  }}
                >
                  Dashboard
                </button>

                <button onClick={handleLogout}>
                  Logout
                </button>

              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;