import React, { useState, useEffect } from 'react';
import getWeatherData from '../Context/index';
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';
import Sunny from '../assets/images/Sunny.jpg';

const BackgroundLayout = () => {
  const [weather, setWeather] = useState(null); // Store weather data
  const [image, setImage] = useState(Clear); // Default background image

  // Fetch weather data for a default location
  const getWeather = async () => {
    try {
      const data = await getWeatherData('weather', { q: 'berlin' });
      setWeather(data); // Store weather data in state
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []); // Run once on mount

  useEffect(() => {
    if (weather && weather.weather && weather.weather[0]) {
      const description = weather.weather[0].description;

      // Update background image based on weather conditions
      if (description.toLowerCase().includes('clear')) {
        setImage(Clear);
      } else if (description.toLowerCase().includes('cloud')) {
        setImage(Cloudy);
      } else if (description.toLowerCase().includes('fog')) {
        setImage(Fog);
      } else if (description.toLowerCase().includes('rain') || description.toLowerCase().includes('shower')) {
        setImage(Rainy);
      } else if (description.toLowerCase().includes('snow')) {
        setImage(Snow);
      } else if (description.toLowerCase().includes('thunder') || description.toLowerCase().includes('storm')) {
        setImage(Stormy);
      } else if (description.toLowerCase().includes('sunny')) {
        setImage(Sunny);
      }
    }
  }, [weather]); // Update background when weather changes

  return <img src={image} alt="weather_image" className="h-screen w-full fixed left-0 top-0 -z-[10]" />;
};

export default BackgroundLayout;
