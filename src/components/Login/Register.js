import React, { Component } from 'react'
import axios from 'axios';
import { dataDump, update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer } from './../../ducks/reducer'
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'


class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            username: '',
            password: '',
            passConfirm: '',
            autoRenew: false,
            renewalPeriod: 0,
            message: 'Thank you for Registering',
            isDev: false,
            developer: '',
        }
    }
    async register() {
        let { email, username, password, autoRenew, renewalPeriod, isDev, developer } = this.state;
        let res = await axios.post('/auth/register', { email, username, password, autoRenew, renewalPeriod, isDev, developer })
        if (res.data.loggedIn && res.data.sessionUser.isDev) {
            this.props.history.push('/dev')
            this.props.dataDump(res.data.sessionUser)
            // this.props.update_user_id(res.data.sessionUser.id)
            // this.props.update_user_email(res.data.sessionUser.email)
            // this.props.update_username(res.data.sessionUser.username)
            // this.props.update_isDev(res.data.sessionUser.isDev)
            // console.log(res.data.sessionUser.isDev)
            // this.props.update_developer(res.data.sessionUser.developer)
        }
        else if (res.data.loggedIn) {
            this.props.history.push('/user/today')
            console.log(res.data)
            this.props.dataDump(res.data.sessionUser)
            // this.props.update_user_id(res.data.sessionUser.id)
            // this.props.update_username(res.data.sessionUser.username)
            // this.props.update_user_email(res.data.sessionUser.email)
            // this.props.update_autoRenewal(res.data.sessionUser.autoRenew)
            // this.props.update_renewalPeriod(res.data.sessionUser.renewalPeriod)
            // this.props.update_isDev(res.data.sessionUser.isDev)
        }
        console.log(res.data.message)
        this.setState({ username: '', password: '', passConfirm: '', email: '', autoRenew: false, renewalPeriod: 1, message: res.data.message })
    }
    render() {
        let screenSize = window.innerWidth
        return (
            <div>
                <img src='' alt='' />
                <p>Email: <input value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} type='text' /></p>
                <p>Username: <input value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} type='text' /></p>
                <p>Password: <input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} type='password' /></p>
                <p>Confirm Password: <input value={this.state.passConfirm} onChange={(e) => { this.setState({ passConfirm: e.target.value }) }} type='password' /></p>
                <hr />
                {screenSize < 800 ?
                    <div>
                        <p>Auto Renew? <input type='checkbox' value='check' onChange={(e) => this.setState(prevState => ({ autoRenew: !prevState.autoRenew }))} /></p>
                        <button onClick={(e) => { this.setState({ renewalPeriod: 1 }) }}>
                            <div className='renewal'>
                                <div>1 Month</div>
                                <div className='price'> $2.50 </div>
                            </div>
                        </button>
                        <button onClick={(e) => { this.setState({ renewalPeriod: 3 }) }}>
                            <div className='renewal'>
                                <div>3 Month</div>
                                <div className='price'> $7 or 7% OFF <p className='discount'>$7.50</p> </div>
                            </div>
                        </button>
                        <button onClick={(e) => { this.setState({ renewalPeriod: 12 }) }}>
                            <div className='renewal'>
                                <div>1 Year</div>
                                <div className='price'> $25 or 17% OFF <p className='discount'>$30</p> </div>
                            </div>
                        </button>
                        <hr />
                        <p>By Signing up you agree to our <a href='https://termsfeed.com/blog/sample-terms-and-conditions-template/'>Terms & Privacy Policy</a></p>
                        <hr />
                    </div>
                    :
                    <div>
                        <p>Are you Registering to be a developer? <input type='checkbox' value='check' onChange={(e) => this.setState(prevState => ({ isDev: !prevState.isDev }))} /></p>
                        {this.state.isDev ?
                            <h1>Company Name: <input value={this.state.developer} onChange={(e) => { this.setState({ developer: e.target.value }) }} type='text' /></h1>
                            :
                            null
                        }
                    </div>

                }
                {this.state.password === this.state.passConfirm ?
                    <button onClick={() => this.register()}>
                        Register
                    </button>
                    :
                    <div>Password Doesn't Match</div>}
                <hr />
                {this.state.message}
                <hr />
                {/* <Link to='/user/today'>
                    <button> PAY NOW </button>
                </Link> */}
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}

export default connect(mapPropsToState, { dataDump, update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer })(Register)
