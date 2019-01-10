import React, { Component } from 'react';

// Imports
import DevChoice from './devChoice'
import SuggestedApps from './SuggestedApps'
import { Link } from 'react-router-dom'

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
                    <div className='TodayViewPage'>
                        <div className='GameHeader'>
                            <h1>Apps</h1>
                            <Link to='/user/settings'>
                                <button><img src='https://static1.squarespace.com/static/5aca4db8d274cb14610bb2a3/t/5ae6590f575d1fd630f1b6d4/1525044987257/Ben+Arnon+profile+pic+%28circle+frame%29.png' alt='' className='headerImg' /></button>
                            </Link>
                            <hr/>
                        </div>
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