import React, { Component } from 'react';
import Slider from 'react-slick'
import axios from 'axios'
import GameResults from './../../../Games/Suggestions/GameResults'

class name extends Component {
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
        var settings = {
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            adaptiveHeight: true,
            centerMode: true,
            variableWidth: true,
        };
        let mappedFirst3;
        if (this.state.games && !this.state.hasRan) {
            let first3 = this.state.games.slice(0, 4)
            mappedFirst3 = first3.map((apps) => {
                return (
                    <GameResults
                        key={apps.app_id}
                        appid={apps.app_id}
                        appLink={apps.app_link}
                        appName={apps.app_name}
                        app_description={apps.app_description}
                        current_rating={apps.current_rating}
                        iconImg={apps.iconimg}
                    />)
            })
        }
        let mappedMiddle;
        if (this.state.games && !this.state.hasRan) {
            let first3 = this.state.games.slice(4, 8)
            mappedMiddle = first3.map((apps) => {
                return (
                    <GameResults
                        key={apps.app_id}
                        appid={apps.app_id}
                        appLink={apps.app_link}
                        appName={apps.app_name}
                        app_description={apps.app_description}
                        current_rating={apps.current_rating}
                        iconImg={apps.iconimg}
                    />)
            })
        }
        let mappedMiddleLast;
        if (this.state.games && !this.state.hasRan) {
            let first3 = this.state.games.slice(8, 12)
            mappedMiddleLast = first3.map((apps) => {
                return (
                    <GameResults
                        key={apps.app_id}
                        appid={apps.app_id}
                        appLink={apps.app_link}
                        appName={apps.app_name}
                        app_description={apps.app_description}
                        current_rating={apps.current_rating}
                        iconImg={apps.iconimg}
                    />)
            })
        }
        return (
            <div>
                <Slider {...settings}>
                    {mappedFirst3}
                </Slider>
                <Slider {...settings}>
                    {mappedMiddle}
                </Slider>
                <Slider {...settings}>
                    {mappedMiddleLast}
                </Slider>
            </div>
        )
    }
}

export default name;