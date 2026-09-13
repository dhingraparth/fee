import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  async function searchWeather() {
    if (city === "") {
      alert("Please enter a city");
      return;
    }

    try {
      // Get latitude and longitude of the city
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      const locationData = await locationResponse.json();

      if (!locationData.results) {
        alert("City not found");
        return;
      }

      const latitude = locationData.results[0].latitude;
      const longitude = locationData.results[0].longitude;
      const cityName = locationData.results[0].name;

      // Get weather using latitude and longitude
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        city: cityName,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m
      });

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="app">

      <div className="weather-card">

        <h1>Weather App</h1>

        <div className="search-box">

          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={searchWeather}>
            Search
          </button>

        </div>

        {weather && (
          <div className="weather-info">

            <h2>{weather.city}</h2>

            <div className="weather-icon">
              🌤️
            </div>

            <h3>{weather.temperature}°C</h3>

            <div className="details">

              <div>
                <span>💧</span>
                <p>Humidity</p>
                <strong>{weather.humidity}%</strong>
              </div>

              <div>
                <span>💨</span>
                <p>Wind</p>
                <strong>{weather.wind} km/h</strong>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;