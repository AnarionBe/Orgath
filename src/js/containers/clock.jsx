import React, {useState, useEffect} from 'react'
import {useGrid} from '../hooks/index'
import months from '../../data/month.json'

export const Clock = ({monthFormat = 'fr', coords}) => {
  const [date, setDate] = useState(new Date());
  const displayStyle = useGrid(coords);

  useEffect(() => {
    let timeoutId = null;

    const timeoutFunction = () => {
      setDate(new Date());
      timeoutId = setTimeout(timeoutFunction, 1000);
    }

    timeoutId = setTimeout(timeoutFunction, 1000);

    return (() => {
      clearTimeout(timeoutId);
    });
  }, []);

  const formatDate = () => {
    return `${('0' + date.getDate()).slice(-2)} ${months[date.getMonth()][monthFormat]} ${date.getFullYear()}`;
  }

  const formatTime = () => {
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  }

  return (
    <div className="clock" style={displayStyle}>
      <div className="clock__time">{formatTime()}</div>
      <div className="clock__date">{formatDate()}</div>
    </div>
  );
}