import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick'

import GameResults from './GameResults'

class SuggestedGames extends Component {
    constructor() {
        super()

        this.state = {
            games: false,
            tags: 'GAME',
            hasMounted: false
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
    async componentDidMount() {
        if (!this.state.games) {
            await this.getGames()
            // console.log('Suggested Games')
        }
    }


    render() {
        // console.log(this.state)
        var settings = {
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            adaptiveHeight: true,
            centerMode: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 2500,

        };
        let mappedFirst3;
        if (this.state.games && !this.state.hasRan) {
            let first3 = this.state.games.slice(0, 3)
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
            let middle3 = this.state.games.slice(3, 6)
            mappedMiddle = middle3.map((apps) => {
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
            let middleLast = this.state.games.slice(6, 9)
            mappedMiddleLast = middleLast.map((apps) => {
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
        let mappedLast;
        if (this.state.games && !this.state.hasRan) {
            let last = this.state.games.slice(9, 12)
            mappedLast = last.map((apps) => {
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
        console.log(mappedFirst3)
        return (
            <div className='SuggestedAppsComp'>
                <Slider {...settings}>
                    <div>{mappedFirst3}</div>
                    <div>{mappedMiddle}</div>
                    <div>{mappedMiddleLast}</div>
                    <div>{mappedLast}</div>
                </Slider>
            </div>
        )
    }
}


export default SuggestedGames;