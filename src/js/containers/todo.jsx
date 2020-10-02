import React, {useState} from 'react'
import {useGrid} from '../hooks/index'

export const Todo = ({coords}) => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const displayStyle = useGrid(coords);

  const handleAdd = () => {
    if(!value) return;

    setList([{value, checked: false}, ...list]);
    setValue('');
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleCheck = (e, index) => {
    setList(list.map((elem, i) => {
      if(i === index) {
        return {...elem, checked: e.target.checked};
      }
      return elem;
    }));
  }

  return (
    <div className="todo" style={displayStyle}>
      <div className="todo__header">
        <input className="todo__input" type="text" value={value} onChange={handleChange} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {list.map((elem, i) => (
          <li key={i}>
            <input className="todo__list-item-checkbox" type="checkbox" onChange={(e) => handleCheck(e, i)} />
            <span
              className={`todo__list-item-value ${elem.checked?'-is-checked':''}`}
            >{elem.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}