import React, { Component } from 'react';
import axios from 'axios'
// Imports
import Download from './../../../../../Assets/baseline-cloud_download-24px.svg'


export default class FeaturedProductivity extends Component {
    constructor() {
        super()
        this.state = {
            games: false,
            newapp1: 'tinder',
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
                    <div className='FeaturedProd'>
                        <div className='FTop'>
                            <img src={iconimg} alt={app_name} id='FLogo' />
                            <div className='FSide'>
                                <h1>{app_name}</h1>
                            </div>
                        </div>
                        <div className='FUnder'>
                            <h3>{current_rating}</h3>
                            <a href={app_link}>
                                <img src={Download} alt='Download' onClick={() => { this.incrementDownload() }} />
                            </a>
                        </div>
                        <h2>{app_description.substring(0, 50)}</h2>
                    </div>

                }

            </div>
        )
    }
}