import React, { Component } from 'react';
import axios from 'axios'
// import Slider from 'react-slick'

class GameResults extends Component {
    constructor() {
        super()
        this.state={
            hasRan: false
        }
    }
    async componentWillMount() {
        if(!this.state.hasRan){
           await this.incrementView()
            this.setState({hasRan: true})
        }
    }
    async incrementView() {
        console.log('IRan')
        let { appid } = this.props
        console.log('appid')
        console.log(appid)
        await axios.post(`/user/view/dynamic`, { appid })
        this.setState({hasRan: true})
    }

    render() {
        let { appLink, appName, app_description, current_rating, iconImg, img1, tags } = this.props
        return (
            <div>
                <img src={iconImg} alt={appName} />
                <h1>{appName}</h1>
                <h2>{app_description.substr(0, 50)}</h2>
                <h3>{current_rating}</h3>
                <a href={appLink}>
                    <h1>Get</h1>
                </a>
            </div>
        )
    }
}

export default GameResults;

    // function GameResults(props) {
    //     let { appLink, appName, app_description, current_rating, iconImg, img1, tags } = props
    //     var settings = {
    //         dots: false,
    //         infinite: true,
    //         speed: 300,
    //         slidesToShow: 1,
    //         adaptiveHeight: true
    //     };
    //     return (
    //         <Slider {...settings}>
    //             <div>
    //                 <img src={iconImg} alt={appName} />
    //                 <h1>{appName}</h1>
    //                 <h2>{app_description.substr(0, 50)}</h2>
    //                 <h3>{current_rating}</h3>
    //                 <a href={appLink}>
    //                     <h1>Get</h1>
    //                 </a>
    //             </div>
    //         </Slider>
    //     )
    // }

    // export default GameResults;