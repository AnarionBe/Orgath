import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import {useGrid, useApi} from '../hooks/index'
import {Button} from '../components/index'

export const Planning = ({coords}) => {
  const [list, setList] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const displayStyle = useGrid(coords);
  const api = useApi('event');

  useEffect(() => {
    const init = async () => {
      const data = await api.get(null, {date: currentDate.format()});
      setList(data);
    }
    init();

    return (() => {});
  }, []);

  const handleClick = (e, hour) => {
    alert(hour);
  }

  const handleChangeDate = async date => {
    setCurrentDate(dayjs(date));
    const data = await api.get(null, {date: dayjs(date).format()});
    setList(data);
    setVisible(false);
  }

  return (
    <div className="planning" style={displayStyle}>
      <header className="planning__header">
        <div className="flex f-between">
          <Button
            type="ghost"
            onClick={() => setVisible(!isVisible)}
          >
            <span>{currentDate.format('DD/MM/YYYY')}</span>
            <Icon icon={isVisible ? faCaretUp : faCaretDown} />
          </Button>
          <Button
            type="outline"
            onClick={e => handleAddEvent(e)}><Icon icon={faPlus}
          /></Button>
        </div>
        <Calendar
          className={`planning__date-picker ${isVisible?'-is-visible':''}`}
          onChange={e => handleChangeDate(e)}
        />
      </header>
      <ul className="planning__list">
        {(Array.from(Array(24).keys())).map(hour => (
          <li key={hour} className="planning__list-gap">
            <a onClick={e => handleClick(e, hour)}>
              <span className="planning__list-hour">{hour}</span>
              <p className="planning__list-content">
                {list.filter(e => hour === dayjs(e.date).hour()).map(e => (
                  <span
                    className="planning__list-item"
                    key={e._id}
                  >
                    <span className="time">{`${dayjs(e.date).hour()}:${dayjs(e.date).minute()} - `}</span>
                    {e.title}
                  </span>
                ))}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}