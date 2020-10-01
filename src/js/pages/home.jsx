import React from 'react'
import {Clock, Weather, Quote} from '../containers/index'

export const Home = ({}) => {
  return (
    <div className="home">
      <Clock coords={{width: 9}} />
      <Weather coords={{x: 10}} />
      <Quote coords={{y: 10, width: 10}} />
    </div>
  );
}