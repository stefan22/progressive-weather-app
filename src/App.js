import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./app.css";

const App = () => {
  const [cityWeather, setCityWeather] = useState('');

  const getCity = async (e) => {
    if (e.key === "Enter") {
      const city = await fetchWeather(cityWeather);
      console.log("city is ", city);
    }
  };

  return (
    <div className="main-container">
      <input
        className="search"
        type="text"
        value={cityWeather}
        onChange={(e) => setCityWeather(e.target.value)}
        onKeyPress={getCity}
        placeholder="Enter city"
      />
    </div>
  );
};

export default App;
