import React, { Component } from 'react';

// Imports
import DevChoice from './devChoice'
import SuggestedApps from './SuggestedApps'

export default class Apps extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loaded: true,
            })
        }, 1000)

    }
    render() {
        return (
            <div>
                {this.state.loaded ?
                <div>
                    Apps
                    <DevChoice />
                    <SuggestedApps />
                </div>
                :
                <div>
                    <img src='https://cdn.dribbble.com/users/891352/screenshots/3310131/bobotov_loader_002.gif' alt='Loading Gif' />
                </div>}
            </div>
        )
    }
}