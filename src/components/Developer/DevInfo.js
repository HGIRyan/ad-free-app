import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppChart from './AppChart'
import { update_username, update_user_email, update_developer, } from './../../ducks/reducer'
import axios from 'axios'
import Clock from 'react-live-clock'


class DevInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: false,
            upUsername: '',
            email: false,
            upEmail: '',
            developer: false,
            upDeveloper: '',
            auto: false,
            time: '',
            edit: false,
        }
    }
    componentDidMount() {
        this.setState({
            upUsername: this.props.username,
            upEmail: this.props.email,
            upDeveloper: this.props.developer
        })
    }
    async  updateDevUserName() {
        await this.props.update_username(this.state.upUsername)
        await this.setState(prevState => ({ username: !prevState.username }))
        let { user_id, username } = this.props
        console.log(username)
        axios.put('/dev/updateinfo/username', { user_id, username })
    }

    async updateDevEmail() {
        await this.props.update_user_email(this.state.upEmail)
        await this.setState(prevState => ({ email: !prevState.email }))
        let { user_id, email } = this.props;
        console.log(email)
        axios.put(`/dev/updateinfo/email`, { user_id, email })
    }

    async updateDevCompany() {
        await this.props.update_developer(this.state.upDeveloper)
        await this.setState(prevState => ({ developer: !prevState.developer }))
        let { user_id, developer } = this.props;
        console.log(developer)
        axios.put(`/dev/updateinfo/developer`, { user_id, developer })
    }

    render() {

        let { username, email, developer, edit } = this.state
        return (
            <div className='devInfoWhole'>
                {edit ?
                    <div>
                        {username ?
                            <div>
                                <input value={this.state.upUsername} onChange={(e) => { this.setState({ upUsername: e.target.value }) }} type='text' />
                                <button onClick={() => this.updateDevUserName()}>Update Username</button>
                                <button onClick={(e) => this.setState(prevState => ({ username: !prevState.username }))} >Cancel</button>
                            </div>
                            :
                            <div>
                                {this.props.username}
                                <button onClick={(e) => this.setState(prevState => ({ username: !prevState.username }))} >Update Username</button>
                            </div>
                        }
                        <hr />
                        {email ?
                            <div>
                                <input value={this.state.upEmail} onChange={(e) => { this.setState({ upEmail: e.target.value }) }} type='text' />
                                <button onClick={() => this.updateDevEmail()}>Update Email</button>
                                <button onClick={(e) => this.setState(prevState => ({ email: !prevState.email }))} >Cancel</button>
                            </div>
                            :
                            <div>
                                {this.props.email}
                                <button onClick={(e) => this.setState(prevState => ({ email: !prevState.email }))} >Update Email</button>
                            </div>
                        }
                        <hr />
                        {developer ?
                            <div>
                                <input value={this.state.upDeveloper} onChange={(e) => { this.setState({ upDeveloper: e.target.value }) }} type='text' />
                                <button onClick={() => this.updateDevCompany()}>Update Company Name</button>
                                <button onClick={(e) => this.setState(prevState => ({ developer: !prevState.developer }))} >Cancel</button>
                            </div>
                            :
                            <div>
                                {this.props.developer}
                                <button onClick={(e) => this.setState(prevState => ({ developer: !prevState.developer }))} >Update Company Name</button>
                            </div>
                        }
                        {this.props.user_id}
                        {this.props.dev_id}
                        <p onClick={(e) => this.setState(prevState => ({ edit: !prevState.edit }))}>Done</p>
                    </div>
                    :
                    <div className='devName'>
                        <div className='devNameChild'>
                            <h1>{this.props.developer} </h1>
                            <h3>{this.props.username}</h3>
                            <h3> {this.props.email}</h3>
                            <p onClick={(e) => this.setState(prevState => ({ edit: !prevState.edit }))}>Edit</p>
                        </div>
                    </div>
                }
                <div className='devDate'>
                    <h4>Current Date</h4>
                    <Clock
                        format={'dddd, MMMM Do, YY'}
                        ticking={true}
                        timezone={'America/Denver'} />
                </div>
                <div>
                    {/* <button onClick={(e) => this.setState(prevState => ({ auto: !prevState.auto }))}>Set Time</button>
                    {this.state.auto ?
                        <div>
                            <button onClick={(e) => this.setState({ time: 7 })}><h3>Last 7 Days</h3></button>
                            <button onClick={(e) => this.setState({ time: 31 })}><h3>This Month</h3></button>
                            <button onClick={(e) => this.setState({ time: 365 })}><h3>This Year</h3></button>
                        </div>
                        :
                        null} */}
                    <AppChart chartData={this.props.chartData} className='chartComp'/>
                </div>
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState, { update_username, update_user_email, update_developer })(DevInfo);