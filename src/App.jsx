import { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import getWeatherData from './Context/index';
import BackgroundLayout from './Components/BackgroundLayout';

const App = () => {
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    const data = await getWeatherData('weather', { q: input || 'berlin' });
    setWeatherData(data);
    console.log(data);
  };

  // Optional: Fetch weather when the app mounts with a default location
  useEffect(() => {
    getWeather();
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
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        
      </main>
    </div>
  );
};

export default App;
