import React, { Component } from 'react';
import Slider from 'react-slick'
import axios from 'axios'
// import GameResults from './../../../Games/Suggestions/GameResults'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setSelectedAppData } from './../../../../../ducks/reducer'


class QuickPlay extends Component {
    constructor() {
        super()

        this.state = {
            games: false,
            tags: 'GAME',
            hasMounted: false
        }
    }
    async componentDidMount() {
        if (!this.state.games) {
            await this.getGames()
            // this.incrementView()
            // console.log('Suggested Games')
        }
    }
    async getGames() {
        if (!this.state.hasMounted) {
            // console.log('SENDING TAGS')
            let { tags } = this.state;
            // console.log(tags)
            let res = await axios.get(`/user/games/tags/${tags}`)
            // console.log('getgames' + res.data)
            this.setState({
                games: res.data,
            })
        }
    }
    async incrementView() {
        let { appid } = this.props
        console.log(appid)
        await axios.post(`/user/view/dynamic`, { appid })
        this.setState({ hasRan: true })
    }
    render() {
        var settings1 = {
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            // adaptiveHeight: true,
            // centerMode: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 1500,
        };
        var settings2 = {
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            // adaptiveHeight: true,
            // centerMode: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 2000,
        };
        var settings3 = {
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            // adaptiveHeight: true,
            // centerMode: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 1750,
        };
        let mappedFirst3;
        if (this.state.games && !this.state.hasRan) {
            let first3 = this.state.games.slice(0, 4)
            mappedFirst3 = first3.map((apps) => {
                return (
                    <div key={apps.app_id}>
                        <Link to='/user/app' onClick={(e) => { this.props.setSelectedAppData(apps.app_id) }}>
                            <img src={apps.iconimg} alt='' className='SwirlAppLogo' />
                        </Link>
                    </div>)
            })
        }
        let mappedMiddle;
        if (this.state.games && !this.state.hasRan) {
            let first3 = this.state.games.slice(4, 8)
            mappedMiddle = first3.map((apps) => {
                return (
                    <div key={apps.app_id}>
                        <Link to='/user/app' onClick={(e) => { this.props.setSelectedAppData(apps.app_id) }}>
                        {console.log(apps.app_id)}
                            <img src={apps.iconimg} alt='' className='SwirlAppLogo' />
                        </Link>
                    </div>)
            })
        }
        let mappedMiddleLast;
        if (this.state.games && !this.state.hasRan) {
            let first3 = this.state.games.slice(8, 12)
            mappedMiddleLast = first3.map((apps) => {
                return (
                    <div key={apps.app_id}>
                        <Link to='/user/app' onClick={(e) => { this.props.setSelectedAppData(apps.app_id) }}>
                            <img src={apps.iconimg} alt='' className='SwirlAppLogo' />
                        </Link>
                    </div>
                )
            })
        }
        return (
            <div className='SwirlWhole'>
                <h1>Cool Games</h1>
                <Slider {...settings1}>
                    {mappedFirst3}
                </Slider>
                <Slider {...settings2}>
                    {mappedMiddle}
                </Slider>
                <Slider {...settings3}>
                    {mappedMiddleLast}
                </Slider>
            </div>
        )
    }
}

export default connect(null, { setSelectedAppData })(QuickPlay);