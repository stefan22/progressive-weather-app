import React, { useState, useEffect } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./app.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    //adding query to localStorage
    if (weather.name !== undefined)
      localStorage.setItem(weather.name.toLowerCase(), JSON.stringify(weather));
  }, [weather]);

  useEffect(() => {
    const updateCity = (val) =>
      query !== val.name ? setWeather(val) : setWeather({});

    const city = localStorage.getItem(query);
    const initCity = JSON.parse(city) || "";
    updateCity(initCity);
  }, [query]);

  const getCity = async (e) => {
    if (e.key === "Enter" && query.length > 3) {
      const weatherName = () => weather.name;
      if (
        weatherName() !== undefined &&
        weather.name.toLowerCase() === query.toLowerCase()
      ) {
        //end exec
        setQuery("");
        return true;
      }

      try {
        const response = await fetchWeather(query);
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="main-container">
      <header>
        <h1>Weather App</h1>
      </header>

      <input
        className="search"
        type="text"
        value={query}
        onKeyPress={getCity}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city"
      />

      {weather.name && (
        <div className="city">
          <div className="weather-heading">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
          </div>
          <div className="main-content">
            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg; C</sup>
            </div>
          </div>
          <div className="info">
            <p>
              Feels like <span>{weather.main.feels_like}</span>
            </p>
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              width="100"
              height="100"
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;



