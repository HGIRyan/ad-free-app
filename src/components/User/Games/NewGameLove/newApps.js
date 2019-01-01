import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick'

class NewApp extends Component {
    constructor() {
        super()

        this.state = {
            newApps1: [],
            newApps2: [],
            newUpdates1: [],
            newUpdates2: [],
            newapp1: 'hay day',
            newapp2: 'PUBG MOBILE',
            newupdate1: 'clash of clans',
            newupdate2: 'minecraft',

        }
    }
    async componentDidMount() {
        await this.getNewApp()
        await this.getNewUpdate()
        this.incrementView()
    }
    async incrementView() {
        let { newApps1, newApps2, newUpdates1, newUpdates2 } = this.state
        // console.log(newApps1)
        console.log('newApps1')
        let newapps1 = newApps1.app_id
        await axios.post(`/user/view/1`, { newapps1 })
        // console.log(newapps1)
        let newapps2 = newApps2.app_id
        await axios.post(`/user/view/2`, { newapps2 })
        let newupdates1 = newUpdates1.app_id
        await axios.post(`/user/view/3`, { newupdates1 })
        let newupdates2 = newUpdates2.app_id
        await axios.post(`/user/view/4`, { newupdates2 })
    }
    incrementDownloadNewApps1() {
        let appid = this.state.newApps1.app_id
        axios.post(`/user/download/1`, {appid})
    }
    incrementDownloadNewApps2() {
        let appid = this.state.newApps2.app_id
        axios.post(`/user/download/2`, {appid})
    }
    incrementDownloadNewUpdate1() {
        let appid = this.state.newUpdates1.app_id
        axios.post(`/user/download/3`, {appid})
    }
    incrementDownloadNewUpdate2() {
        let appid = this.state.newUpdates2.app_id
        axios.post(`/user/download/4`, {appid})
    }

    async getNewApp() {
        let { newapp1, newapp2 } = this.state;
        let res1 = await axios.get(`/user/games/newapp1/${newapp1}`)
        console.log('res1.data')
        let res2 = await axios.get(`/user/games/newapp2/${newapp2}`)
        console.log('res2.data')
        this.setState({
            newApps1: res1.data,
            newApps2: res2.data
        })
    }
    async getNewUpdate() {
        let { newupdate1, newupdate2 } = this.state;
        let res1 = await axios.get(`/user/games/newupdate1/${newupdate1}`)
        console.log('res1.data')
        let res2 = await axios.get(`/user/games/newupdate2/${newupdate2}`)
        console.log('res2.data')
        this.setState({
            newUpdates1: res1.data,
            newUpdates2: res2.data
        })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        };
        let { newApps1, newApps2, newUpdates1, newUpdates2 } = this.state
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <img src={newApps1.img1} alt={newApps1.app_name} />
                        <div>
                            <h1>{newApps1.app_name}</h1>
                            <img src={newApps1.iconimg} alt={newApps1.app_name} />
                            {/* <p>{newApps1.app_description}</p> */}
                            <a href={newApps1.app_link}>
                                <button onClick={() => { this.incrementDownloadNewApps1() }}>GET HERE</button>
                            </a>
                        </div>
                    </div>
                    <div>
                    <img src={newApps2.img1} alt={newApps2.app_name} />
                        <div>
                            <h1>{newApps2.app_name}</h1>
                            <img src={newApps2.iconimg} alt={newApps2.app_name} />
                            {/* <p>{newApps2.app_description}</p> */}
                            <a href={newApps2.app_link}>
                                <button onClick={() => { this.incrementDownloadNewApps2() }}>GET HERE</button>
                            </a>
                        </div>
                    </div>
                    <div>
                    <img src={newUpdates1.img1} alt={newUpdates1.app_name} />
                        <div>
                            <h1>{newUpdates1.app_name}</h1>
                            <img src={newUpdates1.iconimg} alt={newUpdates1.app_name} />
                            {/* <p>{newUpdates1.app_description}</p> */}
                            <a href={newUpdates1.app_link}>
                                <button onClick={() => { this.incrementDownloadNewUpdate1() }}>GET HERE</button>
                            </a>
                        </div>
                    </div>
                    <div>
                    <img src={newUpdates2.img1} alt={newUpdates2.app_name} />
                        <div>
                            <h1>{newUpdates2.app_name}</h1>
                            <img src={newUpdates2.iconimg} alt={newUpdates2.app_name} />
                            {/* <p>{newUpdates2.app_description}</p> */}
                            <a href={newUpdates2.app_link}>
                                <button onClick={() => { this.incrementDownloadNewUpdate2() }}>GET HERE</button>
                            </a>
                        </div>
                    </div>
                </Slider>
            </div>
        )
    }
}

export default NewApp;