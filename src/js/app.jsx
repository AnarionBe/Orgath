import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import {Home, Login} from './pages/index'
import {component as Guarded} from './helpers/garded.jsx'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={process.env.ROOT || '/'}>
          <Login />
        </Route>

        <Route exact path={`${process.env.ROOT || '/'}home`}>
          <Guarded>
            <Home />
          </Guarded>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}