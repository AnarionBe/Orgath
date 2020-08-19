import React, {useState, useEffect} from 'react'

import months from '../../data/month.json'

export const Clock = ({monthFormat = 'fr', width = 1, height = 1, x = 0, y = 0}) => {
  const [date, setDate] = useState(new Date());

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

  const getStyle = () => {
    return {
      gridColumnStart: x,
      gridColumnEnd: `span ${width}`,
      gridRowStart: y,
      gridRowEnd: `span ${height}`
    };
  }

  return (
    <div className="clock" style={getStyle()}>
      <div className="clock__time">{formatTime()}</div>
      <div className="clock__date">{formatDate()}</div>
    </div>
  );
}