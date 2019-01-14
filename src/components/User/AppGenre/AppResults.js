import React, { Component } from 'react';
import axios from 'axios'
// import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setSelectedAppData } from './../../../ducks/reducer'

// SVG
import Download from './../../../Assets/baseline-cloud_download-24px.svg'


class AppResults extends Component {
    constructor() {
        super()
        this.state = {
            hasRan: false
        }
    }
    async componentWillMount() {
        if (!this.state.hasRan) {
            await this.incrementView()
            this.setState({ hasRan: true })
        }
    }
    async incrementView() {
        let { appid } = this.props
        await axios.post(`/user/view/dynamic`, { appid })
        this.setState({ hasRan: true })
    }
    async incrementDownload() {
        let { appid } = this.props
        await axios.post(`/user/download/dynamic`, { appid })
        this.setState({ hasRan: true })
    }

    render() {
        let { appLink, appName, current_rating, iconImg } = this.props
        return (
            <Link
                to='/user/app'
                onClick={(e) => { this.props.setSelectedAppData(this.props.appid) }}>
                <div>
                    <div className='AppResultsComp'>
                        <img src={iconImg} alt={appName} />
                        <div className='name-Rate'>
                            <h1>{appName}</h1>
                            <h3>{current_rating}</h3>
                        </div>
                        <a href={appLink}>
                            <button onClick={() => { this.incrementDownload() }}> <img src={Download} alt='DOWNLOAD' /> </button>
                        </a>
                    </div>
                </div>
            </Link>
        )
    }
}

export default connect(null, { setSelectedAppData })(AppResults);

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