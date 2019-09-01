import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Teams from './pages/Teams'
import Team from './pages/Team'
import Player from './pages/Player'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Succes from './components/Success'

export default () => {
  return (
    <Router>
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={SignUp} exact />
      <Route path="/" component={Home} exact />
      <Route path="/stats" component={Stats} exact />
      <Route path="/teams" component={Teams} exact />
      <Route path="/team/:id" component={Team} exact />
      <Route path="/player/:id" component={Player} exact />
    </Router>
  )
}
