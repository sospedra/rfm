import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './rfm/services/sw'
import { APIProvider } from './rfm/services/api/provider'
import './tailwind.css'
import Home from './home'

ReactDOM.render(
  <React.StrictMode>
    <APIProvider>
      <Home />
    </APIProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
