import React, { Component } from 'react';

// Imports
import NewApp from './NewGameLove/newApps'
import SuggestedGames from './Suggestions/SuggestedGames'
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
                    <div>
                        Games
                        Hello
                        <NewApp />
                        Hello
                        <SuggestedGames />
                    </div>
                    :
                    <img src='https://cdn.dribbble.com/users/891352/screenshots/3310131/bobotov_loader_002.gif' alt='Loading Gif' />
                }
            </div>
        )
    }
}