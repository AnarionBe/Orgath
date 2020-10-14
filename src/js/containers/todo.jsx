import React, {useState, useEffect} from 'react'
import {useGrid, useApi} from '../hooks/index'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({coords}) => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const displayStyle = useGrid(coords);
  const api = useApi('todo');

  useEffect(() => {
    const init = async () => {
      try {
        const data = await api.get();
        setList(data);
      } catch(err) {
        console.error(err);
      }
    }
    init();

    return (() => {});
  }, []);

  const handleAdd = async () => {
    const newTodo = await api.post({
      content: value,
      status: false
    });
    setList([...list, newTodo]);
    setValue('');
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleCheck = async (e, id) => {
    try {
      const toUpdate = list.find(todo => todo._id === id);
      toUpdate.status = !toUpdate.status;
      await api.put(toUpdate._id, toUpdate);
      setList(list.map(todo => {
        if(todo._id === toUpdate._id) {
          return toUpdate;
        }
        return todo;
      }));
    } catch(err) {
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(id);
      setList(list.filter(todo => todo._id !== id));
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="todo" style={displayStyle}>
      <div className="todo__header">
        <input className="todo__input" type="text" value={value} onChange={handleChange} />
        <button onClick={handleAdd} disabled={value === ''}>Add</button>
      </div>
      <ul>
        {list.map(elem => (
          <li key={elem._id} className="todo__list-item">
            <div className="flex f-middle">
              <input
                className="todo__list-item-checkbox"
                type="checkbox"
                onChange={(e) => handleCheck(e, elem._id)}
                checked={elem.status}
              />
              <span
                className={`todo__list-item-value ${elem.status?'-is-checked':''}`}
              >{elem.content}</span>
            </div>
            <button
              className="todo__list-item-delete"
              onClick={() => handleDelete(elem._id)}
            >
              <Icon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}