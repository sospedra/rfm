import React from 'react'
import ReactDOM from 'react-dom'
import { useTransition, animated } from 'react-spring'
import { HashRouter, Route, useLocation, Switch } from 'react-router-dom'
import * as serviceWorker from './rfm/services/sw'
import './tailwind.css'
import Home from './home'
import Submit from './submit'

const App: React.FC<{}> = () => {
  const location = useLocation()
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  return (
    <HashRouter basename='/'>
      {transitions.map(({ item: location, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={location}>
            <Route exact path='/' component={Home} />
            <Route path='/submit' component={Submit} />
          </Switch>
        </animated.div>
      ))}
    </HashRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
