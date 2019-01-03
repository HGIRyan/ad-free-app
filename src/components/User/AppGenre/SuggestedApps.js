import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick'
import AppResults from './AppResults'

class SuggestedApps extends Component {
    constructor() {
        super()

        this.state = {
            games: false,
            tags: 'productivity',
            hasMounted: false
        }
    }
    async componentDidMount() {
        if (!this.state.games) {
            await this.getGames()
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


        };
        let mappedFirst3;
        if (this.state.games && !this.state.hasRan) {
            let first3 = this.state.games.slice(0, 3)
            mappedFirst3 = first3.map((apps) => {
                return (
                    <AppResults
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
            let first3 = this.state.games.slice(3, 6)
            mappedMiddle = first3.map((apps) => {
                return (
                    <AppResults
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
            let first3 = this.state.games.slice(6, 9)
            mappedMiddleLast = first3.map((apps) => {
                return (
                    <AppResults
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
            let first3 = this.state.games.slice(9, 12)
            mappedLast = first3.map((apps) => {
                return (
                    <AppResults
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
                    <div>{mappedFirst3}</div>
                    <div>{mappedMiddle}</div>
                    <div>{mappedMiddleLast}</div>
                    <div>{mappedLast}</div>
                </Slider>
            </div>
        )
    }
}


export default SuggestedApps;