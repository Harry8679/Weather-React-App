import './WeatherApp.css';
import sunny from '../assets/images/sunny.png';
import { useEffect, useState } from 'react';
// import cloudy from '../assets/images/sunny.png';
// import rainy from '../assets/images/sunny.png';
// import snowy from '../assets/images/sunny.png';

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const api_key = 'XXX';
//   const city_name = 'Paris';

    useEffect(() => {
        const fetchWeather = async () => {
            const defaultLocation = 'Libreville';    
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${api_key}`;
            const res = await fetch(url);
            const defaultData = await res.json();
            setData(defaultData);
        };

        fetchWeather();
    }, []);

    const handleInputChange = (e) => {
    setLocation(e.target.value);
    };

    const search = async () => {
    if (location.trim() === '') {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`;
        const res = await fetch(url);
        const searchData = await res.json();
        console.log(searchData);
        setData(searchData);
        setLocation('');
    }
    }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        search();
    }
  }
  return (
    <div className='container'>
      <div className="weather-app">
        <div className="search">
            <div className="search-top">
                <i className="fa-solid fa-location-dot"></i>
                <div className="location">{data.name}</div>
            </div>
            <div className="search-bar">
                <input type="text" placeholder='Enter Location' value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
            </div>
        </div>
        <div className="weather">
            <img src={sunny} alt="sunny" />
            <div className='weather-type'>{data.weather ? data.weather[0].main : null}</div>
            <div className="temp">{data.main ? `${Math.round((data.main.temp - 273))}°C` : null}</div>
        </div>
        <div className="weather-date">
            <p>Fri, 3 May</p>
        </div>
        <div className="weather-data">
            <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">{data.main ? `${data.main.humidity}%` : null}</div>
            </div>
            <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">{data.wind ? `${data.wind.speed} km` : null}</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp;
