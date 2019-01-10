import React, { Component } from 'react';

// Imports
import NewApp from './NewGameLove/newApps'
import SuggestedGames from './Suggestions/SuggestedGames'
import { Link } from 'react-router-dom'
// import { timeout } from 'q';

export default class Games extends Component {
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
        // console.log('games.js')
        return (
            <div>
                {this.state.loaded ?
                    <div className='TodayViewPage'>
                        <div className='GameHeader'>
                            <h1>Games</h1>
                            <Link to='/user/settings'>
                                <button><img src='https://static1.squarespace.com/static/5aca4db8d274cb14610bb2a3/t/5ae6590f575d1fd630f1b6d4/1525044987257/Ben+Arnon+profile+pic+%28circle+frame%29.png' alt='' className='headerImg' /></button>
                            </Link>
                            <hr/>
                        </div>
                        <hr/>
                        <NewApp />
                        <SuggestedGames />
                    </div>
                    :
                    <img src='https://cdn.dribbble.com/users/891352/screenshots/3310131/bobotov_loader_002.gif' alt='Loading Gif' />
                }
            </div>
        )
    }
}