import React from 'react'
import {Clock, Weather} from '../containers/index'

export const Home = ({}) => {
  return (
    <div className="home">
      <Clock width="9" />
      <Weather x="10" />
    </div>
  );
}