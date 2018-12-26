import React from 'react';

// Imports

export default function SearchResults(props) {
    let { appLink, appName, app_description, current_rating, iconImg, img1, tags } = props

    return (
        <div>
            <div className='appHeader'>
                <img src={iconImg} alt={appName} />
                <h1>{appName}</h1>
                <h2>{app_description.substr(0, 75)}</h2>
                <h3>{current_rating}</h3>
                <a href={appLink}>
                    <h1>Get</h1>
                </a>
            </div>
            <div>
                <img src={img1} alt={appName}/>
                {tags}
            </div>
        </div>
    )

}