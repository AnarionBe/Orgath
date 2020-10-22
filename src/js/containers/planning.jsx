import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import {useGrid, useApi} from '../hooks/index'
import {Button, Input, Modal, Textarea} from '../components/index'

export const Planning = ({coords}) => {
  const [list, setList] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showModal, setShowModal] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [dateValue, setDateValue] = useState(dayjs().format());
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

  const handleCancelCreation = () => {
    setDescriptionValue('');
    setTitleValue('');
    setDateValue(dayjs().format());
    setShowModal(false);
  }

  const handleCreation = async () => {
    try {
      await api.post({
        title: titleValue,
        description: descriptionValue,
        date: dateValue
      });
  
      setDescriptionValue('');
      setTitleValue('');
      setDateValue(dayjs().format());
      setShowModal(false);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="planning" style={displayStyle}>
      <header className="planning__header">
        <div className="flex f-between">
          <Button
            appearance="ghost"
            onClick={() => setVisible(!isVisible)}
          >
            <span>{currentDate.format('DD/MM/YYYY')}</span>
            <Icon icon={isVisible ? faCaretUp : faCaretDown} />
          </Button>
          <Button
            appearance="outline"
            onClick={e => setShowModal(true)}
          ><Icon icon={faPlus}/></Button>
        </div>
        <Calendar
          className={`planning__date-picker ${isVisible?'-is-visible':''}`}
          onChange={e => handleChangeDate(e)}
          value={new Date(currentDate)}
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
                    <span className="time">{`${(`0${dayjs(e.date).hour()}`).slice(-2)}h${(`0${dayjs(e.date).minute()}`).slice(-2)} - `}</span>
                    {e.title}
                  </span>
                ))}
              </p>
            </a>
          </li>
        ))}
      </ul>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="Add new event"
          bodyClass="planning__modal"
        >
          <form className="planning__form-create">
            <Input
              label="Title"
              placeholder="Enter a title"
              onChange={value => setTitleValue(value)}
              value={titleValue}
              className="planning__form-create-field"
            />
            <Textarea
              label="Description"
              placeholder="Enter a description"
              onChange={value => setDescriptionValue(value)}
              value={descriptionValue}
              className="planning__form-create-field"
            />
            <div className="planning__form-create-field">
              <label className="planning__form-create-label">Date</label>
              <Calendar
                onChange={e => setDateValue(e)}
                value={new Date(dateValue)}
              />
            </div>
            <div className="planning__form-create-field hour">
              <Input
                type="number"
                value={dayjs(dateValue).hour()}
                onChange={value =>setDateValue(dayjs(dateValue).hour(value))}
              />
              <span>h</span>
              <Input
                type="number"
                value={dayjs(dateValue).minute()}
                onChange={value =>setDateValue(dayjs(dateValue).minute(value))}
              />
            </div>
          </form>

          <div className="planning__form-create-actions">
            <Button
              onClick={handleCancelCreation}
            >Cancel</Button>
            <Button
              onClick={handleCreation}
            >Create</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}