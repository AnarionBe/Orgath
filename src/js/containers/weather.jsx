import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

export const Weather = ({width = 1, height = 1, x = 0, y = 0}) => {
  const [weather, setWeather] = useState(null);
  const [reload, setReload] = useState(false);
  const [animation, setAnimation] = useState(''); //fa-spin

  useEffect(() => {
    let timeoutId = null;

    const fecthWeather = async () => {
      setAnimation('fa-spin');
      const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: 'Liege',
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric'
        }
      });
      setWeather(data);
      
      timeoutId = setTimeout(fecthWeather, 3600000);
      setTimeout(() => setAnimation(''), 1000);
    }

    fecthWeather();
    
    return (() => {
      clearTimeout(timeoutId);
    });
  }, [reload]);

  const getStyle = () => {
    return {
      gridColumnStart: x,
      gridColumnEnd: `span ${width}`,
      gridRowStart: y,
      gridRowEnd: `span ${height}`
    };
  }

  const renderWeather = () => {
    console.log(weather);
    return (
      <>
        <div>
          <img
            className="block"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          />
          <span className="block">{weather.main.temp} °C</span>
        </div>
        <button
          onClick={() => setReload(!reload)}
          className="weather__reload"
        >
          <Icon icon={faSync} className={animation} />
        </button>
      </>
    )
  }

  return (
    <div className="weather flex f-center" style={getStyle()}>
      {!weather && 'loading...'}
      {weather && renderWeather()}
    </div>
  );
}