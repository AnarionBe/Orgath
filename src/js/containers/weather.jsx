import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSync, faSpinner } from '@fortawesome/free-solid-svg-icons'
import {useGrid, useApi} from '../hooks/index'

export const Weather = ({coords}) => {
  const [weather, setWeather] = useState(null);
  const [reload, setReload] = useState(false);
  const [animation, setAnimation] = useState(''); //fa-spin
  const displayStyle = useGrid(coords);
  const api = useApi('weather');

  useEffect(() => {
    let timeoutId = null;

    const fecthWeather = async () => {
      setAnimation('fa-spin');
      const data = await api.get(null, {city: 'Liege'});
      setWeather(data);
      
      timeoutId = setTimeout(fecthWeather, 3600000);
      setTimeout(() => setAnimation(''), 1000);
    }

    fecthWeather();
    
    return (() => {
      clearTimeout(timeoutId);
    });
  }, [reload]);

  return (
    <div className="weather flex f-center" style={displayStyle}>
      {!weather && <Icon icon={faSpinner} className="fa-spin" />}
      {weather && (
        <>
          <div>
            <img
              className="block"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            />
            <span className="block">{Math.round(weather.main.temp)} °C</span>
          </div>
          <button
            onClick={() => setReload(!reload)}
            className="weather__reload"
          >
            <Icon icon={faSync} className={animation} />
          </button>
        </>
      )}
    </div>
  );
}