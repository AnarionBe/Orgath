import React from 'react'
import {useGrid} from '../hooks/index'

export const Planning = ({coords}) => {
  const displayStyle = useGrid(coords);

  const handleClick = (e, hour) => {
    alert(hour);
  }

  return (
    <div className="planning" style={displayStyle}>
      <ul className="planning__list">
        {(Array.from(Array(24).keys())).map(hour => (
          <li key={hour} className="planning__list-item">
            <a onClick={e => handleClick(e, hour)}>
              <span className="planning__list-hour">{hour}</span>
              <p className="planning__list-content">
                Todo<br/>
                Todo<br/>
                Todo<br/>
                Todo<br/>
                Todo<br/>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}