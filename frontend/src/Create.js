import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create({ addButton }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [keywords, setKeywords] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      min_price: parseFloat(minPrice),
      max_price: parseFloat(maxPrice),
      keywords: keywords,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error sending data");

      const data = await res.json();
      setResponseMessage("Data has been successfully added!");

      // Add button on the main page
      addButton(payload);

      // Reset form
      setMinPrice("");
      setMaxPrice("");
      setKeywords("");

      // After a short delay, redirect back to the main page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      setResponseMessage("An error occurred while sending the data.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Create Page</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        {/* Price range */}
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

        {/* Keywords */}
        <input
          type="text"
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {responseMessage && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded w-full max-w-md text-center">
          {responseMessage}
        </div>
      )}
    </div>
  );
}

export default Create;
