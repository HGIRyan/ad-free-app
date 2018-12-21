import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class MenuBar extends Component {
    render() {
        return (
            <div className='MenuBar' >
            <Link to='/user/today'>
                <p>Today</p>
            </Link>
            <Link to='/user/games'>
                <p>Games</p>
            </Link>
            <Link to='/user/apps'>
                <p>Apps</p>
            </Link>
            <Link to='/user/search'>
                <p>Search</p>
            </Link>
            </div>
        )
    }
}
