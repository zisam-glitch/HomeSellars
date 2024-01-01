import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "65722a1bee0a40b3844c6cfa8dd8b4b4"; // Replace with your OpenCage API key

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    // Fetch suggestions from OpenCage API for the UK only
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${input}&countrycode=GB&key=${API_KEY}`
      );
      const data = await response.json();

      // Extract location suggestions from the API response
      const locations = data.results.map((result) => result.formatted);
      setSuggestions(locations);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

  return (
    <div>
      <p className="pb-2 font-medium">Enter a location</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-between gap-4 relative"
      >
        <div className="relative w-full">
          <input
            type="text"
            required
            placeholder="e.g Oxford or NW3"
            className="w-full outline outline-1 focus:outline-lightblue rounded p-3"
            value={searchTerm}
            onChange={handleInputChange}
            list="locationSuggestions"
          />
          {suggestions.length > 0 && (
            <div className="suggestions-container absolute bg-white border border-outline shadow-md rounded w-full mt-1">
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item p-3 hover:bg-purple cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button className="flex gap-2 bg-lightblue py-3 justify-center px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue">
          <div className="flex items-center gap-3">
            <span>
              <IoSearchOutline className="text-white text-xl" />
            </span>
            <span className="text-white">Search</span>
          </div>
        </button>
      </form>
    </div>
  );
}
