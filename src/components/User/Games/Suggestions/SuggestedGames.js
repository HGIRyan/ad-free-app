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
    async componentDidMount() {
        if (!this.state.games) {
            await this.getGames()
            console.log('Suggested Games')
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

    render() {
        console.log(this.state)
        var settings = {
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            adaptiveHeight: true,
            centerMode: true,
            variableWidth: true,


        };
        let mappedFirst3 = []
        if (this.state.games) {
            let first3 = this.state.games.slice(0, 3)
            console.log(first3)
            mappedFirst3 = first3.map((apps) => {

                return (
                        <div>
                        <GameResults
                            key={apps.app_id}
                            appid={apps.app_id}
                            appLink={apps.app_link}
                            appName={apps.app_name}
                            app_description={apps.app_description}
                            current_rating={apps.current_rating}
                            iconImg={apps.iconimg}
                            img1={apps.img1}
                            tags={apps.tags}
                        />
                        </div>
                   
                )

            })
            console.log(mappedFirst3)
        }
let wer = mappedFirst3[0]
let wex = mappedFirst3[1]
let wet = mappedFirst3[2]

        return (
            <div>
                <Slider {...settings}>
                    <div>{wer}</div>
                    <div>{wex}</div>
                    <div>{wet}</div>
                </Slider>
            </div>
        )
    }
}


export default SuggestedGames;