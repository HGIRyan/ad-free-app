import React, { Component } from 'react';
import axios from 'axios'
// Imports

export default class FeaturedProductivity extends Component {
    constructor() {
        super()
        this.state = {
            games: false,
            newapp1: 'ibotta',
            hasMounted: false
        }
    }
    async componentDidMount() {
        if (!this.state.games) {
            await this.getGames()
            // console.log('Suggested Games')
            this.setState({
                hasMounted: true
            })
        }
    }
    async getGames() {
        if (!this.state.hasMounted) {
            // console.log('SENDING TAGS')
            let { newapp1 } = this.state;
            // console.log(tags)
            let res = await axios.get(`/user/games/newapp1/${newapp1}`)
            console.log(res.data)
            this.setState({
                games: res.data,
            })
        }
    }
    async incrementView() {
        let { app_id } = this.state.games
        console.log(app_id)
        await axios.post(`/user/view/dynamic`, { app_id })
    }
    async incrementDownload() {
        let { app_id } = this.state.games
        await axios.post(`/user/download/dynamic`, { app_id })
        this.setState({ hasRan: true })
        console.log(app_id)
        console.log(this.state.games)
    }

    render() {
        let { app_link, app_name, app_description, current_rating, iconimg } = this.state.games
        // console.log(app_description.substring(0, 50))
        return (
            <div>
                {!this.state.hasMounted ?
                    null
                    :
                    <div>
                        <img src={iconimg} alt={app_name} />
                        <h1>{app_name}</h1>
                        <h2>{app_description.substring(0, 50)}</h2>
                        <h3>{current_rating}</h3>
                        <a href={app_link}>
                            <h1 onClick={() => { this.incrementDownload() }}>Get</h1>
                        </a>
                    </div>

                }

            </div>
        )
    }
}