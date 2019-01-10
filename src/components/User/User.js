import React, { Component } from 'react';
import './User.css'
import { Route, Switch } from 'react-router-dom'
import { update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer, dataDump, resetState } from './../../ducks/reducer'
import { connect } from 'react-redux';
import axios from 'axios'
import './../../App.css'


// Imports
import MenuBar from './MenuBar'
import TodayView from './TodayView/TodayView'
import Games from './Games/Games'
import Apps from './AppGenre/Apps'
import Search from './Search/Search'
import SearchResults from './Search/SearchResults'
import IPhoneHeader from './iPhoneHeader'
class User extends Component {
    constructor() {
        super()
        this.state = {
            hasRan: false
        }
    }
    async componentWillMount() {
        // console.log('component mounted8')
        let res = await axios.get('/api/user-data')
        // console.log(res)
        this.props.dataDump(res.data)
        // this.props.update_user_email(res.data.email)
        // this.props.update_username(res.data.username)
        // this.props.update_isDev(res.data.isDev)
        // this.props.update_developer(res.data.developer)
    }
    render() {
        let screenSize = window.innerWidth
        // console.log(this.state, this.props)
        return (
            <div>
                {this.props.user_id ?
                    <div id='UserMain'>
                        {screenSize > 800 ?
                            <div><h1>You are a developer, Please Use our Desktop Page 'LINK'</h1></div>
                            :
                            <div >
                                <IPhoneHeader />
                                <div className='App'>
                                    <Switch className='userComponents'>
                                        <Route component={TodayView} path='/user/today' />
                                        <Route component={Games} path='/user/games' />
                                        <Route component={Apps} path='/user/apps' />
                                        <Route component={Search} path='/user/search' exact />
                                        <Route component={SearchResults} path='/user/search/results' />
                                    </Switch>
                                </div>
                                <MenuBar />
                            </div>
                        }
                    </div>
                    :
                    <div>Please Die
                        <a href='http://localhost:4000/logout'>
                            <button className='navBar-button' onClick={() => { resetState() }}> Log In Here </button>
                        </a>
                    </div>
                }
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}


export default connect(mapPropsToState, { update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer, resetState, dataDump })(User)