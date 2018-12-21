import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Imports
import Clock from 'react-live-clock'

export default class Header extends Component {
    render() {
        return (
            <div>
                <Clock
                    format={'dddd, MMMM Do, YY'}
                    ticking={true}
                    timezone={'America/Denver'} />
                <div className='today'>
                    <h1>Today</h1>
                    <div>
                        <Link to='/user/settings'>
                            <button><img src='https://static1.squarespace.com/static/5aca4db8d274cb14610bb2a3/t/5ae6590f575d1fd630f1b6d4/1525044987257/Ben+Arnon+profile+pic+%28circle+frame%29.png' alt='' className='headerImg' /></button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}