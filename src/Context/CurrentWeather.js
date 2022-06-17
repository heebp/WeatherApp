import React, {useEffect, createContext, useContext,useState } from "react";
import {API_KEY} from '@env'
import axios from 'axios'
import { LocationContext } from './CurrentLocation';
export const WeatherContext = createContext();

export const CurrentWeather = (props)=>{
    const location = useContext(LocationContext);
    const [currentWeather, setCurrentWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [windchill, setWindchill] = useState('');
    const [airPollution,setAirPollution] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    

    const getWeather = async (lat, lon) => {
      try {
        const resWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        );
        
        const resPollution = await axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        let _main = resWeather.data.weather[0].main;
        let _temp = resWeather.data.main.temp;
        let _windchill = resWeather.data.main.feels_like;
        let _airPollution = resPollution.data.list[0].main.aqi;
         setCurrentWeather(_main);
         setTemp(_temp);
         setWindchill(_windchill);
         setAirPollution(_airPollution);
      } catch (error) {
        console.log(error);
         setError(true);
        
      } finally {
         setIsLoading(false);
      }
      }

    useEffect(()=>{

        getWeather(location.lat,location.lng)

    })

    return(
        <WeatherContext.Provider value={{currentWeather,temp,windchill,airPollution}}>
            {props.children}
        </WeatherContext.Provider>
    )
    
}