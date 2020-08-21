import React from 'react'
import {Clock, Weather, Quote} from '../containers/index'

export const Home = ({}) => {
  return (
    <div className="home">
      <Clock width="9" />
      <Weather x="10" />
      <Quote y="10" width="10" />
    </div>
  );
}