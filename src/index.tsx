import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import * as serviceWorker from './rfm/services/sw'
import { APIProvider } from './rfm/services/api/provider'
import './tailwind.css'
import Home from './home'
import Submit from './submit'

ReactDOM.render(
  <React.StrictMode>
    <APIProvider>
      <HashRouter basename='/'>
        <Route exact path='/' component={Home} />
        <Route path='/submit' component={Submit} />
      </HashRouter>
    </APIProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
