import React from 'react';
import Slider from 'react-slick'

function GameResults(props) {
    let { appLink, appName, app_description, current_rating, iconImg, img1, tags } = props
    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    };
    return (
        <Slider {...settings}>
            <div>
                <img src={iconImg} alt={appName} />
                <h1>{appName}</h1>
                <h2>{app_description.substr(0, 50)}</h2>
                <h3>{current_rating}</h3>
                <a href={appLink}>
                    <h1>Get</h1>
                </a>
            </div>
        </Slider>
    )
}

export default GameResults;