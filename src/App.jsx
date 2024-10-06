
{/*import { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import getFormattedWeatherData from './Context/index';
import BackgroundLayout from './Components/BackgroundLayout';
import WeatherCard from './Components/WeatherCard';

const App = () => {
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    const data = await getFormattedWeatherData({ q: input || 'berlin' });
    setWeatherData(data);  // Ensure the weatherData is being set properly
    console.log(data);
  };

  useEffect(() => {
    getWeather();  // Fetch weather when the app mounts
  }, []);

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                getWeather();
              }
            }}
            type="text"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout weather={weatherData} />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        {weatherData ? (
          <WeatherCard
            place={weatherData.name}
            temperature={weatherData.temp}
            windspeed={weatherData.wind_speed}
            humidity={weatherData.humidity}
            heatIndex={weatherData.feels_like}
            iconString={weatherData.icon}
            conditions={weatherData.details}
          />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default App;*/}
import React, { useEffect, useState } from 'react';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeandLocation';
import TempAndDetails from './Components/TempAndDetails';
import Forecast from './Components/Forecast';
import getFormattedWeatherData from './Context';

import { ToastContainer,toast } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';

import Clear from 'C:/Users/Tejas/Desktop/WeatherApp/src/assets/images/Clear.jpg';
import Fog from 'C:/Users/Tejas/Desktop/WeatherApp/src/assets/images/fog.png';
import Cloudy from 'C:/Users/Tejas/Desktop/WeatherApp/src/assets/images/Cloudy.jpg';
import Rainy from 'C:/Users/Tejas/Desktop/WeatherApp/src/assets/images/Rainy.jpg';
import Snow from '/C:/Users/Tejas/Desktop/WeatherApp/src/assets/images/snow.jpg';
import Stormy from 'C:/Users/Tejas/Desktop/WeatherApp/src/assets/images/Stormy.jpg';
import Sunny from 'C:/Users/Tejas/Desktop/WeatherApp/src/assets/images/Sunny.jpg';
import ForecastChart from './Components/ForecastChart';

const backgroundImages = {
  
}


function capitalizeFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {

  const [query, setQuery] = useState({q:''})
  const [units, setUnits] = useState('metric')
  const [weather,setWeather] = useState(null)

  const getWeather = async() => {
    const cityName = query.q ? query.q : 'current location';
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);

    const data=await getFormattedWeatherData({...query,units}).then(data => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      setWeather(data);
      if (query.q) localStorage.setItem('lastSearchedCity', query.q);
    });
    console.log(data);
  }

  useEffect(() => {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
      setQuery({ q: lastSearchedCity });
    } 
    else {
      setQuery({ q: 'Chennai' });
    }
  }, []);

  useEffect(() => {
    getWeather();
  },[query,units]);

  const formatBackground = () => {
    if(!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === 'metric' ? 30 : 60;
    if(weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700"
  }


  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <Inputs setQuery={setQuery} setUnits={setUnits} onKeyUp={(e) => {
              if (e.key === 'Enter') {
                getWeather()
              }}}/>
      {weather && (
        <>
        <TimeAndLocation weather={weather}/>
        <TempAndDetails weather={weather} units={units}/>
        <Forecast title='3 hour step forecast' data={weather.hourly}/>
        <Forecast title='daily forecast' data={weather.daily}/>
        <ForecastChart forecastData={weather.daily}/>
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored"></ToastContainer>
    </div>
  );
};

export default App;

