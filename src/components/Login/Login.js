import React, { Component } from 'react'
import axios from 'axios';
import { update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer  } from './../../ducks/reducer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';



class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            message:'Hello!'
        }
    }

    async login() {
        let { username, password } = this.state;
        let res = await axios.post('/auth/login', { username, password })
        if (res.data.loggedIn && res.data.sessionUser.isDev) {
            this.props.history.push('/dev')
            this.props.update_user_id(res.data.sessionUser.id)
            this.props.update_user_email(res.data.sessionUser.email)
            this.props.update_username(res.data.sessionUser.username)
            this.props.update_isDev(res.data.sessionUser.isDev)
            console.log(res.data.sessionUser.isDev)
            this.props.update_developer(res.data.sessionUser.developer)
        } else if(res.data.loggedIn){
            console.log(res.data)
            console.log(res.data.sessionUser.isDev)
            this.props.history.push('/user/today')
            this.props.update_user_id(res.data.sessionUser.id)
            this.props.update_username(res.data.sessionUser.username)
            this.props.update_user_email(res.data.sessionUser.email)
            this.props.update_autoRenewal(res.data.sessionUser.autoRenew)
            this.props.update_renewalPeriod(res.data.sessionUser.renewalPeriod)
        }
        this.setState({ username: '', password: '', message: res.data.message })
    }   

    render() {

        return (
            <div>
                <img src='' alt='' />
                <p>UserName: <input onChange={(e) => { this.setState({ username: e.target.value }) }} type='text' /></p>
                <p>Password: <input onChange={(e) => { this.setState({ password: e.target.value }) }} type='password' /></p>
                <hr />
                <button onClick={() => this.login()}>Login</button>
                <Link to='/register'>
                    <button>Register</button>
                </Link>
                <p></p>
                {this.state.message}
            </div>
        )
    }
}

export default connect(null, { update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer   })(Login)
// export default Auth