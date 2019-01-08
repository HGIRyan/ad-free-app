import React from 'react'
import './app.css'
import Slider from "react-slick";


export default function Apps(props) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        adaptiveHeight: true
    };
    console.log('HEY IM NOT BREAKING')
    let { appLink, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags } = props
    return (
        <div>
            <div>
                <h1>
                    Name: {appName}
                </h1>
                <a href={appLink}>
                    Download:
                    </a>
                Description: {app_description}
                Rating: {current_rating}
                <img src={iconImg} alt='' />
            </div>
            <div>
                <Slider {...settings}>
                    <img src={img1} alt='' />
                    <img src={img2} alt='' />
                    <img src={img3} alt='' />
                    <img src={img4} alt='' />
                    <img src={img5} alt='' />
                    <img src={img6} alt='' />
                </Slider>
            </div>
            {tags}
        </div>
    )
}