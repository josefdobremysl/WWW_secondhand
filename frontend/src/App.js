import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css';
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";
import { useState as useReactState } from "react";
import About from "./About";
import Create from "./Create";

function App() {
  const [showExtra, setShowExtra] = useState(false);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useReactState(false);
  const [dynamicButtons, setDynamicButtons] = useState([]);

  // Function to add a new button
  const addButton = (newButton) => {
    setDynamicButtons((prev) => [...prev, newButton]);
  };

  // Fetch message from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="https://via.placeholder.com/40" alt="Logo" className="h-10 w-10"/>
            <span className="text-xl font-bold text-gray-800">My Website</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4 text-gray-600 text-xl">
            <Link to="/"><FaHome className="hover:text-blue-500 cursor-pointer" /></Link>
            <Link to="/about"><FaUser className="hover:text-blue-500 cursor-pointer" /></Link>
            <FaCog className="hover:text-blue-500 cursor-pointer" />
          </div>

          {/* Mobile hamburger menu */}
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

        {/* Main content based on route */}
        <Routes>
          {/* Home page */}
          <Route path="/" element={
            <main className="mt-6 px-4">
              {/* Section under header */}
              <section className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-8 mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the website!</h2>
                <p className="text-gray-600 mb-6 text-center">
                  Here you can add a description, information, or anything you want.
                </p>

                {/* Action button */}
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={() => setShowExtra(!showExtra)}
                >
                  Agents
                </button>

                {/* Expandable panel */}
                {showExtra && (
                  <div className="mt-4 w-full max-w-xs mx-auto transition-all duration-300">
                    {/* Top two buttons side by side */}
                    <div className="flex gap-4 mb-4">
                      <button className="flex-1 px-4 py-3 bg-green-500 text-white rounded hover:bg-green-700 text-lg font-semibold">
                        Manage
                      </button>
                      <Link
                        to="/create"
                        className="flex-1 px-4 py-3 bg-purple-500 text-white rounded hover:bg-purple-700 text-lg font-semibold flex items-center justify-center"
                        onClick={() => setShowExtra(false)}
                      >
                        +
                      </Link>
                    </div>

                    {/* Dynamic buttons */}
                    <div className="flex flex-col items-center space-y-4 mt-4">
                      {dynamicButtons.map((btn, index) => (
                        <button
                          key={index}
                          className="w-full px-6 py-4 bg-indigo-500 text-white rounded hover:bg-indigo-700 text-lg font-semibold"
                          onClick={() => alert(`You clicked on ${btn.keywords}`)}
                        >
                          {btn.keywords} (${btn.min_price} - ${btn.max_price})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Image tiles */}
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { id: 1, title: "First image", img: "https://media.istockphoto.com/id/1144538592/fi/valokuva/vaahteranlehdet-syysv%C3%A4reiss%C3%A4.jpg?s=1024x1024&w=is&k=20&c=6a7QjnF_9wqlXLR6TvtAxRNTusebpPlBtfctEgk-_uc=" },
                  { id: 2, title: "Second image", img: "https://via.placeholder.com/300" },
                  { id: 3, title: "Third image", img: "https://via.placeholder.com/300" },
                  { id: 4, title: "Fourth image", img: "https://via.placeholder.com/300" },
                  { id: 5, title: "Fifth image", img: "https://via.placeholder.com/300" },
                  { id: 6, title: "Sixth image", img: "https://via.placeholder.com/300" }
                ].map((tile) => (
                  <div
                    key={tile.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transform transition"
                    onClick={() => alert(`You clicked on ${tile.title}`)}
                  >
                    <img src={tile.img} alt={tile.title} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800">{tile.title}</h3>
                    </div>
                  </div>
                ))}
              </section>
            </main>
          } />

          {/* About page */}
          <Route path="/about" element={<About />} />

          {/* Create page */}
          <Route path="/create" element={<Create addButton={addButton} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
