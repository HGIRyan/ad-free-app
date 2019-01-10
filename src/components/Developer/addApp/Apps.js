import React, { Component } from 'react';
import './app.css'
import Slider from "react-slick";
import Download from './../../../Assets/baseline-cloud_download-24px.svg'

class Apps extends Component {
    constructor() {
        super()

        this.state = {
            longRead: true
        }
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            adaptiveHeight: true
        };
        let { appLink, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags } = this.props
        return (
            <div className='app-Card'>
                <div className='Title-Name'>
                    <img src={iconImg} alt={appName + ' Logo'} className='appLogoAdded' />
                    <div className='name-rating'>
                        <h1>{appName}</h1>
                        <h1 id='RATING'>Rating: {current_rating}</h1>
                        <a href={appLink}><img src={Download} alt='DOWNLOAD' /></a>
                    </div>
                </div>
                <hr />
                <div className='screenshotsDisplay'>
                    <h1>Screenshots</h1>
                    <Slider {...settings}>
                        <img src={img1} alt='img1' />
                        <img src={img2} alt='img2' />
                        <img src={img3} alt='img3' />
                        <img src={img4} alt='img4' />
                        <img src={img5} alt='img5' />
                        <img src={img6} alt='img6' />
                    </Slider>
                </div>
                {this.state.longRead ?
                    <div>
                        <p>{app_description.substring(0, 200)}</p>
                        <p onClick={(e) => this.setState(prevState => ({ longRead: !prevState.longRead }))}> Read More...</p>
                    </div> :
                    <div>
                        <p>{app_description}</p>
                        <p onClick={(e) => this.setState(prevState => ({ longRead: !prevState.longRead }))}> Read Less...</p>
                    </div>
                }
                {tags}
            </div>
        )
    }
}

export default Apps;