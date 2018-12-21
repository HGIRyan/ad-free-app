import React, { Component } from 'react';
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import { update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer,update_devid, resetState } from './../../ducks/reducer'
import { connect } from 'react-redux';
import AddApp from './addApp/AddApp'
import Menu from './Menu/Menu'
import DevInfo from './DevInfo'


class Developer extends Component {

    async componentDidMount() {
        console.log('component mounted')
        let res = await axios.get('/api/dev-data')
        console.log(res)
        this.props.update_user_id(res.data.sessionUser.id)
        this.props.update_user_email(res.data.sessionUser.email)
        this.props.update_username(res.data.sessionUser.username)
        this.props.update_isDev(res.data.sessionUser.isDev)
        this.props.update_developer(res.data.sessionDev.developer)
        this.props.update_developer(res.data.sessionDev.developer)
        this.props.update_devid(res.data.sessionDev.dev_id)
    }
    render() {
        let screenSize = window.innerWidth
        return (
            <div>
                {screenSize < 800 ?
                    <div>
                        <h1>You are not a developer, Please Use our Mobile App 'LINK'</h1>

                    </div>
                    :
                    <div>
                        <Switch>
                            <Route component={AddApp} path='/dev/addapp'/>
                            <Route component={DevInfo} path='/dev/devinfo'/>

                        </Switch>
                        <Menu/>
                        <a href='http://localhost:4000/logout'>
                            <button className='navBar-button' onClick={(e) => { resetState() }}> Log Out </button>
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

export default connect(mapPropsToState, { update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer,update_devid, resetState })(Developer)

