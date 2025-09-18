import { useState } from "react";

function Create() {
  const [keywords, setKeywords] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
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
    } catch (err) {
      console.error(err);
      setResponseMessage("Error while searching.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Search Vinted</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
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
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Response Message */}
      {responseMessage && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded w-full max-w-md text-center">
          {responseMessage}
        </div>
      )}

      {/* Search Results as Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
        {searchResults.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transform transition"
            onClick={() => window.open(item.url, "_blank")}
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.price} {item.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Create;
