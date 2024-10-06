import React, { useEffect, useState } from 'react';
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';
import Sunny from '../assets/images/Sunny.jpg';

const BackgroundLayout = ({ weather }) => {  // Receive weather as prop
  const [image, setImage] = useState(Clear); // Default background image

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
  }, [weather]); // Update background when weather prop changes

  return <img src={image} alt="weather_image" className="h-screen w-full fixed left-0 top-0 -z-[10]" />;
};

export default BackgroundLayout;
