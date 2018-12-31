import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick'

import GameResults from './GameResults'

class SuggestedGames extends Component {
    constructor() {
        super()

        this.state = {
            games: [],
            tags: 'GAME'
        }
    }
    async componentDidMount() {
        await this.getGames()
        console.log('Suggested Games')
    }

    async getGames() {
        console.log('SENDING TAGS')
        let { tags } = this.state;
        console.log(tags)
        let res = await axios.get(`/user/games/tags/${tags}`)
        console.log(res.data)
        this.setState({
            games: res.data
        })
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
        let mappedFirst3 = this.state.games.map((apps) => {
            return (
                <GameResults
                    key={apps.app_id}
                    appLink={apps.app_link}
                    appName={apps.app_name}
                    app_description={apps.app_description}
                    current_rating={apps.current_rating}
                    iconImg={apps.iconimg}
                    img1={apps.img1}
                    tags={apps.tags}
                />
            )
        })
        let first3 = mappedFirst3.slice(0, 3)
        console.log(first3)
        let second3 = mappedFirst3.slice(3, 6)
        let third3 = mappedFirst3.slice(6, 10)
        let fourth3 = mappedFirst3.slice(10, 13)
        console.log(mappedFirst3)
        return (
            <Slider {...settings}>
                {/* <div>
                    mappedFirst3
                    {mappedFirst3}
                </div> */}
                <div>
                    first3
                    {first3}
                </div>
                <div>
                    second3
                    {second3}
                </div>
                <div>
                    third3
                    {third3}
                </div>
                <div>
                    fourth3
                    {fourth3}
                </div>
            </Slider>
        )
    }
}


export default SuggestedGames;