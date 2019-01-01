import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppChart from './AppChart'
import { update_username, update_user_email, update_developer, } from './../../ducks/reducer'
import axios from 'axios'


class DevInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: false,
            upUsername: '',
            email: false,
            upEmail: '',
            developer: false,
            upDeveloper: ''
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
        let { username, email, developer } = this.state
        return (
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
                {this.props.user_id}
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
                <hr />
                {this.props.dev_id}
                <hr />
                <div>
                    <AppChart chartData={this.props.chartData}/>
                </div>
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState, { update_username, update_user_email, update_developer })(DevInfo);