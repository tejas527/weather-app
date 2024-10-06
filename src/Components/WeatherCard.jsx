import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'

const WeatherCard = ({
    temperature,
    windspeed,
    humidity,
    place,
    heatIndex,
    iconString,
    cnfitions,
}) => {
    const {icon,seticon}= useState(sun)
    const {time} = useDate()
    useEffect(() => {
        if(iconString){
            if(iconString.toLowerCase().includes('cloud')){
                seticon(cloud)
            }
            else if(iconString.toLowerCase().includes('rain')){
                seticon(rain)
            }
            else if(iconString.toLowerCase().includes('fog')){
                seticon(fog)
            }
            else if(iconString.toLowerCase().includes('snow')){
                seticon(snow)
            }
            else if(iconString.toLowerCase().includes('wind')){
                seticon(wind)
            }
            else if(iconString.toLowerCase().includes('thunder')){
                seticon(storm)
            }
            else if(iconString.toLowerCase().includes('clear')){
                seticon(sun)
            }
        }
    },[iconString])
  return (
    <div className='w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4'>
        <div className='flex w-full justify-center items-center gap-4 mt-12 mb-4'>
            <img src={icon} alt="weather_icon" />
            <p className='font-bold text-5xl flex justify-center items-center'>{temperature} &deg;C</p>
        </div>
        <div className='font-bold text-center text-xl'>
            {place}
        </div>
        <div className='w-full flex justify-between items-center mt-4'>
            <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
            <p className='flex-1 text-center p-2'>{time}</p>
        </div>
        <div className='w-full flex justify-between items-center mt-4'></div>
    </div>
  )
}

export default WeatherCard