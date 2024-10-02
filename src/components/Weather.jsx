import React from 'react'

const Weather = () => {
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
  )
}

export default Weather
