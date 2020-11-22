import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

import {useApi} from '../hooks/index'
import {Input, Button} from '../components/index'

const Login = ({history}) => {
  const api = useApi('login');
  const ping = useApi('ping');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await ping.get();
        history.push('/home');
      } catch(err) {
        console.error(err);
      }
    }

    checkAuth();

    return () => {};
  }, []);

  const handleClick = async () => {
    try {
      await api.post({email, password});
      history.push('/home');
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="login">
      <Input value={email} onChange={val => setEmail(val)} type="text" placeholder="Enter your email" label="Email" />
      <Input value={password} onChange={val => setPassword(val)} type="password" placeholder="Enter your password" label="Password" />
      <Button onClick={handleClick}>Login</Button>
    </div>
  );
}

export const component = withRouter(Login);