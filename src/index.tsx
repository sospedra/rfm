import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useTransition, animated } from 'react-spring'
import { HashRouter, Route, useLocation, Switch } from 'react-router-dom'
import * as serviceWorker from './rfm/services/sw'
import { track } from './rfm/services/analytics'
import './tailwind.css'
import Home from './home'
import Submit from './submit'
import Confirm from './confirm'
import About from './about'

const App: React.FC<{}> = () => {
  const location = useLocation()
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  useEffect(() => {
    track('pview', { route: location.pathname })
  }, [location])

  return (
    <>
      {transitions.map(({ item: location, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={location}>
            <Route exact path='/' component={Home} />
            <Route path='/submit' component={Submit} />
            <Route path='/confirm' component={Confirm} />
            <Route path='/about' component={About} />
          </Switch>
        </animated.div>
      ))}
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename='/'>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
