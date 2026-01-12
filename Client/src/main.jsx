import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContext, UserProvider } from './Context/UserContext.jsx'
import {Provider} from 'react-redux'
import store from './store/store'
import './config/AxiosIntercptor.js'
import { UserFetchAssignAccountProvider } from './Context/UserFetchAssignAccountContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   {/* <UserFetchAssignAccountProvider> */}
  {/* <UserProvider> */}
  
   <StrictMode>
    <App />
  </StrictMode>,
 {/* </UserProvider> */}
   {/* </UserFetchAssignAccountProvider> */}
 </Provider>

)
