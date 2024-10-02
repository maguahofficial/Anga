import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloudy_icon from "../assets/cloudy.png";
import drizzle_icon from "../assets/drizzle.png";
import snowy_icon from "../assets/snowy.png";
import humidity_icon from "../assets/humidity.png";
import windy_icon from "../assets/wind.png";
import rainy_icon from "../assets/rain.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rainy_icon,
    "09n": rainy_icon,
    "10d": rainy_icon,
    "10n": rainy_icon,
    "13d": snowy_icon,
    "13n": snowy_icon,
  }

  const search = async (city) => {
    if (city === "") {
        alert("Enter a city name");
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
        setWeatherData(false);
        console.log("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("Nairobi");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search city" />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windy_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed}Km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  );
};

export default Weather;