import {createContext} from 'react'
import logRocket from 'logrocket'

logRocket.init('dcylk6/orgath');

logRocket.identify(null, {
  name: 'anonymous',
  email: '***'
});

export const LogRocketContext = createContext(logRocket);
export const LogRocket = logRocket;