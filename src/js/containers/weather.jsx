import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

export const Weather = ({}) => {
  const [weather, setWeather] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const fecthWeather = async () => {
      const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: 'Liege',
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric'
        }
      });
      setWeather(data);

      timeoutId = setTimeout(fecthWeather, 3600000);
    }

    fecthWeather();
    
    return (() => {
      clearTimeout(timeoutId);
    });
  }, [reload]);

  const renderWeather = () => {
    console.log(weather);
    return (
      <>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
        <span>{weather.main.temp} °C</span>
        <button onClick={() => setReload(!reload)}><Icon icon={faSync} /></button>
      </>
    )
  }

  return (
    <div className="weather">
      {!weather && 'loading...'}
      {weather && renderWeather()}
    </div>
  );
}