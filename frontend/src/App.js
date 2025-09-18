import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css';
import { FaHome, FaUser, FaCog, FaBars, FaPlus } from "react-icons/fa";
import About from "./About";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [agentsOpen, setAgentsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [savedSearches, setSavedSearches] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const payload = {
      keywords,
      min_price: parseFloat(minPrice),
      max_price: parseFloat(maxPrice),
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error fetching data");
      const data = await res.json();
      setSearchResults(data.results);
      setResponseMessage(`Found ${data.results.length} items!`);

      const newSearch = {
        id: Date.now(),
        label: keywords || "Search",
        results: data.results,
      };
      setSavedSearches([newSearch, ...savedSearches]);
      setModalOpen(false);
      setKeywords("");
      setMinPrice("");
      setMaxPrice("");
    } catch (err) {
      console.error(err);
      setResponseMessage("Error while searching.");
    }
  };

  const handleSavedSearchClick = (search) => {
    setSearchResults(search.results);
    setResponseMessage(`Showing saved search: ${search.label}`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="https://via.placeholder.com/40" alt="Logo" className="h-10 w-10"/>
            <span className="text-xl font-bold text-gray-800">My Website</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-gray-600 text-xl">
            <Link to="/"><FaHome className="hover:text-blue-500 cursor-pointer" /></Link>
            <Link to="/about"><FaUser className="hover:text-blue-500 cursor-pointer" /></Link>
            <FaCog className="hover:text-blue-500 cursor-pointer" />
          </div>
          <div className="md:hidden text-gray-600 text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </div>
        </header>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center bg-white shadow-md py-4 space-y-4">
            <Link to="/" onClick={() => setMenuOpen(false)}><FaHome className="hover:text-blue-500 cursor-pointer" /></Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}><FaUser className="hover:text-blue-500 cursor-pointer" /></Link>
            <FaCog className="hover:text-blue-500 cursor-pointer" />
          </div>
        )}

        {/* Main content */}
        <main className="mt-6 px-4 w-full max-w-6xl mx-auto">
          {/* Agents button */}
          <div className="flex justify-center mb-4">
            <button
              className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-semibold"
              onClick={() => setAgentsOpen(!agentsOpen)}
            >
              Agents
            </button>
          </div>

          {/* Panel with Manage, ++ and saved searches */}
          {agentsOpen && (
            <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700 text-lg font-semibold"
                  onClick={() => alert("Manage clicked")}
                >
                  Manage
                </button>
                <button
                  className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-700 text-lg font-semibold flex items-center justify-center"
                  onClick={() => setModalOpen(true)}
                >
                  <FaPlus size={20} />
                </button>
              </div>
		{/* Saved searches */}
<div className="flex flex-wrap justify-center gap-2 mt-2">
  {savedSearches.map((search) => (
    <div key={search.id} className="relative inline-block">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm font-medium relative"
        onClick={() => handleSavedSearchClick(search)}
      >
        {search.label}
        {/* Close button inside the main button */}
        <span
          className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-xs cursor-pointer bg-white bg-opacity-20 rounded"
          onClick={(e) => {
            e.stopPropagation(); // zabrání spuštění handleSavedSearchClick
            setSavedSearches(savedSearches.filter((s) => s.id !== search.id));
          }}
        >
          ×
        </span>
      </button>
    </div>
  ))}
</div>

            </div>
          )}

          {/* Modal for search */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Search Vinted</h2>
                <form onSubmit={handleSearch} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Min price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Max price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                  {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
                </form>
              </div>
            </div>
          )}

          {/* Search Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full">
            {searchResults.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transform transition"
                onClick={() => window.open(item.url, "_blank")}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.price} {item.currency}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
