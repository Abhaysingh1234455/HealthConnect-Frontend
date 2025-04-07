import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Searchbar.css";

const doctors = [
  "Dr. Arora - Cardiologist",
  "Dr. Mehta - Orthopedic",
  "Dr. Sharma - Dermatologist",
  "Dr. Verma - Neurologist",
  "Dr. Kapoor - Dentist",
  "Dr. Khanna - Pediatrician"
];

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [error, setError] = useState(""); // Validation error state

  const handleSearchChange = (event) => {
    const input = event.target.value;
    setQuery(input);
    setError(""); // Clear error on typing

    if (input.trim() !== "") {
      const filteredSuggestions = doctors.filter((doctor) =>
        doctor.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      setError("Please enter a valid search term!");
      return;
    }

    setRecentSearches((prevSearches) =>
      [trimmedQuery, ...prevSearches.filter((item) => item !== trimmedQuery)].slice(0, 5)
    );

    onSearch(trimmedQuery);
    setQuery("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (selectedQuery) => {
    setQuery(selectedQuery);
    onSearch(selectedQuery);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search for doctors..."
          value={query}
          onChange={handleSearchChange}
        />
        <button type="submit">🔍</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h4>Recent Searches</h4>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} onClick={() => handleSuggestionClick(search)}>
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ✅ Add PropTypes validation
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;
