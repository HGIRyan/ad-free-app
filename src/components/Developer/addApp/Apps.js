import React from 'react'
import './app.css'

export default function Apps(props) {
    let { appLink, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags } = props
    return (
        <div className='devApps'>
            <div className='appInfo'>
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
            <div className='appImg'>
                <img src={img1} alt='' />
                <img src={img2} alt='' />
                <img src={img3} alt='' />
                <img src={img4} alt='' />
                <img src={img5} alt='' />
                <img src={img6} alt='' />

            </div>
            {tags}
        </div>
    )
}