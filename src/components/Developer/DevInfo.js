import React, { Component } from 'react';
import { connect } from 'react-redux';

class DevInfo extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div>
                {this.props.username}
                <hr/>
                {this.props.email}
                <hr/>
                {this.props.user_id}
                <hr/>
                {this.props.developer}
                <hr/>
                {this.props.dev_id}
                <hr/>
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState)(DevInfo);