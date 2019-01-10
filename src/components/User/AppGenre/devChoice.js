import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick'


// SVG
import Download from './../../../Assets/baseline-cloud_download-24px.svg'
import Blank from './../../../Assets/Other/Empty.png'


class DevChoice extends Component {
    constructor() {
        super()

        this.state = {
            newApps1: [],
            newApps2: [],
            newUpdates1: [],
            newUpdates2: [],
            newapp1: 'Things 3',
            newapp2: 'Sweat: Kayla Itsines Fitness',
            newupdate1: 'Adobe Photoshop Express',
            newupdate2: 'Family Organizer by Picniic',

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
        // console.log('newApps1')
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
        axios.post(`/user/download/1`, { appid })
    }
    incrementDownloadNewApps2() {
        let appid = this.state.newApps2.app_id
        axios.post(`/user/download/2`, { appid })
    }
    incrementDownloadNewUpdate1() {
        let appid = this.state.newUpdates1.app_id
        axios.post(`/user/download/3`, { appid })
    }
    incrementDownloadNewUpdate2() {
        let appid = this.state.newUpdates2.app_id
        axios.post(`/user/download/4`, { appid })
    }

    async getNewApp() {
        let { newapp1, newapp2 } = this.state;
        let res1 = await axios.get(`/user/games/newapp1/${newapp1}`)
        // console.log('res1.data')
        let res2 = await axios.get(`/user/games/newapp2/${newapp2}`)
        // console.log('res2.data')
        this.setState({
            newApps1: res1.data,
            newApps2: res2.data
        })
    }
    async getNewUpdate() {
        let { newupdate1, newupdate2 } = this.state;
        let res1 = await axios.get(`/user/games/newupdate1/${newupdate1}`)
        // console.log('res1.data')
        let res2 = await axios.get(`/user/games/newupdate2/${newupdate2}`)
        // console.log('res2.data')
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
            centerMode: true,
            // variableWidth: true,
            // adaptiveHeight: true
        };
        let { newApps1, newApps2, newUpdates1, newUpdates2 } = this.state
        return (
            <div>
                 <Slider {...settings}>
                    <div className='newGCard'>
                        <div className='topGCard'>
                            <img src={newApps1.iconimg} alt={newApps1.app_name} />
                            <div className='nameGInfo'>
                                <h1>{newApps1.app_name}</h1>
                                <h3>{newApps1.current_rating}</h3>
                                <a href={newApps1.app_link}>
                                    <button onClick={() => { this.incrementDownloadNewApps1() }}><img src={Download} alt='DOWNLOAD' /> </button>
                                </a>
                            </div>
                        </div>
                        <img src={newApps1.img1} alt={newApps1.app_name} />
                        <img src={Blank} alt=''  className='Blank'/>

                    </div>

                    <div className='newGCard'>
                        <div className='topGCard'>
                            <img src={newApps2.iconimg} alt={newApps2.app_name} />
                            <div className='nameGInfo'>
                                <h1>{newApps2.app_name}</h1>
                                <h3>{newApps2.current_rating} </h3>
                                <a href={newApps2.app_link}>
                                    <button onClick={() => { this.incrementDownloadNewApps2() }}><img src={Download} alt='DOWNLOAD' /> </button>
                                </a>
                            </div>
                        </div>
                        <img src={newApps2.img1} alt={newApps2.app_name} />
                        <img src={Blank} alt=''  className='Blank'/>
                    </div>

                    <div className='newGCard'>
                        <div className='topGCard'>
                            <img src={newUpdates1.iconimg} alt={newUpdates1.app_name} />
                            <div className='nameGInfo'>
                                <h1>{newUpdates1.app_name}</h1>
                                <h3>{newUpdates1.current_rating} </h3>
                                <a href={newUpdates1.app_link}>
                                    <button onClick={() => { this.incrementDownloadNewUpdate1() }}><img src={Download} alt='DOWNLOAD' /> </button>
                                </a>
                            </div>
                        </div>
                        <img src={newUpdates1.img1} alt={newUpdates1.app_name} />
                        <img src={Blank} alt='' className='Blank'/>
                    </div>

                    <div className='newGCard'>
                        <div className='topGCard'>
                            <img src={newUpdates2.iconimg} alt={newUpdates2.app_name} />
                            <div className='nameGInfo'>
                                <h1>{newUpdates2.app_name}</h1>
                                <h3>{newUpdates2.current_rating} </h3>
                                <a href={newUpdates2.app_link}>
                                    <button onClick={() => { this.incrementDownloadNewUpdate2() }}><img src={Download} alt='DOWNLOAD' /> </button>
                                </a>
                            </div>
                        </div>
                        <img src={newUpdates2.img1} alt={newUpdates2.app_name} />
                        <img src={Blank} alt='' className='Blank'/>

                    </div>
                </Slider>
            </div>
        )
    }
}

export default DevChoice;