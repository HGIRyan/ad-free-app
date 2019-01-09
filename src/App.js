// Dependancies
import React, { Component } from 'react';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { update_isDev, resetState } from './ducks/reducer'
import axios from 'axios'

// Imports
import Developer from './components/Developer/Developer'
import User from './components/User/User'



// Components
import Login from './components/Login/Login'
import Register from './components/Login/Register'

class App extends Component {
  async componentDidMount() { 
    // console.log('component mounted')
    let res = await axios.get('/api/user-data')
    console.log('EAT ME')
    this.props.update_isDev(res.data.isDev)
    // this.props.update_developer(res.data.developer)
  }
  render() {
    let { isDev } = this.props
    // console.log(isDev)
    return (
      // <div className='App'>
      <HashRouter>
        <Switch>
          {/* LOGIN CHECKS CREDINCIALS 
          ALWAYS CALLS L*/}
          <Route component={Login} path='/' exact />
          {/* REGISTER CREATES NEW USER */}
          <Route component={Register} path='/register' />
          {isDev === true ? 
            <Route component={Developer} path='/dev' />
            :
            <Route component={User} path='/user' />
          }
          <a href='/logout'>
            <button className='navBar-button' onClick={(e) => { resetState() }}> Log Out </button>
          </a>
          {this.props.username}
        </Switch>
      </HashRouter>
      // </div>
    );
  }
}
function mapPropsToState(state) {
  return { ...state }
}
export default connect(mapPropsToState, { update_isDev, resetState })(App);
