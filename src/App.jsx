import React, { useEffect, useState } from 'react';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeandLocation';
import TempAndDetails from './Components/TempAndDetails';
import Forecast from './Components/Forecast';
import ForecastChart from './Components/ForecastChart';
import getFormattedWeatherData from './Context';

import { ToastContainer,toast } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';

import Clear from 'C:/Users/Tejas/Desktop/Projects/WeatherApp/src/assets/images/clearsky.jpg';
import Fog from 'C:/Users/Tejas/Desktop/Projects/WeatherApp/src/assets/images/fog.png';
import Cloudy from 'C:/Users/Tejas/Desktop/Projects/WeatherApp/src/assets/images/Cloudy.jpg';
import Rainy from 'C:/Users/Tejas/Desktop/Projects/WeatherApp/src/assets/images/rain4.png';
import Snow from '/C:/Users/Tejas/Desktop/Projects/WeatherApp/src/assets/images/snow2.jpg';
import Stormy from 'C:/Users/Tejas/Desktop/Projects/WeatherApp/src/assets/images/Stormy.jpg';
import Sandy from 'C:/Users/Tejas/Desktop/Projects/WeatherApp/src/assets/images/sandy.jpg';

const backgroundImages = {
  haze: Fog,
  mist: Fog,
  smoke: Fog,
  dust: Sandy,
  fog: Fog,
  sand: Sandy,
  ash: Sandy,
  clear: Clear,
  cloud: Cloudy,
  rain: Rainy,
  drizzle: Rainy,
  thunder: Stormy,
  tornado: Stormy,
  snow: Snow,
};

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
      if (data.cod === 404) {
        throw new Error(data.message || "City not found.");
      }
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      setWeather(data);
      if (query.q) localStorage.setItem('lastSearchedCity', query.q);
    })
    .catch(error => {
      toast.error(`Error: ${error.message}`);
      console.error("Error fetching weather data:", error);
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
    if (!weather) return "from-cyan-600 to-blue-700";
    const { details } = weather;
    const condition = Object.keys(backgroundImages).find(cond => details.toLowerCase().includes(cond));
    const backgroundImage = condition ? backgroundImages[condition] : null;
    return backgroundImage ? `url(${backgroundImage})` : "from-cyan-600 to-blue-700";
  }

  return (
    <div className={`mx-auto py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400`} style={{ backgroundImage: formatBackground()}}>
      <Inputs setQuery={setQuery} setUnits={setUnits} onKeyUp={(e) => {
              if (e.key === 'Enter') {
                getWeather()
              }}}/>
      {weather && (
        <>
        <TimeAndLocation weather={weather}/>
        <TempAndDetails weather={weather} units={units}/>
        <Forecast title='daily forecast' data={weather.daily}/>
        <ForecastChart className='' dailyData={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored"></ToastContainer>
    </div>
  );
};

export default App;

