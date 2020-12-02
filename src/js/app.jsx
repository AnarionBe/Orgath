import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import {Home, Login} from './pages/index'
import {component as Guarded} from './helpers/garded.jsx'
import {LogRocketContext, LogRocket} from './helpers/logRocketContext'

export default () => {
  return (
    <LogRocketContext.Provider value={LogRocket}>
      <BrowserRouter basename={process.env.ROOT || '/Orgath/'}>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>

          <Route exact path={'/home'}>
            <Guarded>
              <Home />
            </Guarded>
          </Route>
        </Switch>
      </BrowserRouter>
    </LogRocketContext.Provider>
  );
}