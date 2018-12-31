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
            newapp2: 'Swing star',
            newupdate1: 'clash of clans',
            newupdate2: 'minecraft',

        }
    }
    componentDidMount() {
        this.getNewApp()
        this.getNewUpdate()
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
                                GET HERE
                            </a>
                        </div>
                    </div>
                    <div>
                        <h1>{newApps2.app_name}</h1>
                        <img src={newApps2.iconimg} alt={newApps2.app_name} />
                    </div>
                    <div>
                        <h1>{newUpdates1.app_name}</h1>
                        <img src={newUpdates1.iconimg} alt={newUpdates1.app_name} />
                    </div>
                    <div>
                        <h1>{newUpdates2.app_name}</h1>
                        <img src={newUpdates2.iconimg} alt={newUpdates2.app_name} />
                    </div>
                </Slider>
            </div>
        )
    }
}

export default NewApp;