import React, {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {withRouter} from 'react-router-dom'

import {useApi} from '../hooks/index'

const Guarded = ({children, history}) => {
  const [content, setContent] = useState(<Loader type="TailSpin" color="#00BFFF" height={80} width={80} />);
  const api = useApi('ping');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get();
        return setContent(children);
      } catch(err) {
        if(err.response.status === 401) {
          return history.push('/');
        }
        
        console.error(err);
      }
    }

    checkAuth();
    return () => {};
  }, []);
  
  return <div className="flex f-center h100">{content}</div>;
}

export const component = withRouter(Guarded);