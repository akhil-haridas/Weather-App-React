import React, { useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityValue, setCityValue] = useState(""); // Initialize the cityValue state to store the input value

  // Function to fetch weather details from the API and display them
  const getWeather = () => {
    // If input field is empty, return and show a message
    if (cityValue.trim().length === 0) {
      setWeatherData(null);
      return;
    }

    const key = "927876f25890d9c1a61fbd447f985665"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    // Clear the input field
    setCityValue("");

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch(() => {
        setWeatherData(null);
      });
  };

  return (
    <div className="wrapper">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter a city name"
            id="city"
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)} // Update the cityValue state on input change
          />
          <button id="search-btn" onClick={getWeather}>
            Search
          </button>
        </div>
        <div id="result">
          {weatherData &&
          weatherData.weather &&
          weatherData.weather.length > 0 ? (
            <>
              <h2>{weatherData.name}</h2>
              <h4 className="weather">{weatherData.weather[0].main}</h4>
              <h4 className="desc">{weatherData.weather[0].description}</h4>
              <img
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
              <h1>{weatherData.main.temp} &#176;</h1>
              <div className="temp-container">
                <div>
                  <h4 className="title">min</h4>
                  <h4 className="temp">{weatherData.main.temp_min}&#176;</h4>
                </div>
                <div>
                  <h4 className="title">max</h4>
                  <h4 className="temp">{weatherData.main.temp_max}&#176;</h4>
                </div>
              </div>
            </>
          ) : (
            <h3 className="msg">City not found</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
