import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './app.css'
import './../Dev.css'
import Slider from "react-slick";


class AddApp extends Component {
    constructor() {
        super()

        this.state = {
            appLink: '',
            appId: '',
            appName: '',
            app_description: '',
            current_rating: '',
            iconImg: '',
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            img5: '',
            img6: '',
            tags: '',
            auto: true,
            message: '',
            longRead: true,

        }
    }
    splitter() {
        let { appLink } = this.state
        let str = appLink
        let firstSplit = str.split('id')[1]
        let lastSplit = str.split('?')[1]
        if (lastSplit != null) {
            let id = firstSplit.split('?')[0]
            this.setState({
                appId: id
            })
        } else {
            this.setState({
                appId: firstSplit
            })
        }

    }
    async getAppDetails() {
        let { appId } = this.state
        let res = await axios.post('/dev/getapp', { appId })
        let appDetails = res.data.content.store_info
        let appName = res.data.content.store_info.title
        if (res) {
            this.setState({
                appName: appName,
                app_description: appDetails.description,
                iconImg: appDetails.icon,
                img1: appDetails.screenshots.iphone6plus[0].url,
                img2: appDetails.screenshots.iphone6plus[1].url,
                img3: appDetails.screenshots.iphone6plus[2].url,
                img4: appDetails.screenshots.iphone6plus[3].url,
            })
            console.log(res.data)
        } else {

        }
    }
    async preview() {
        await this.splitter()
        await this.getAppDetails()

    }
    async addApp() {
        console.log('got here')
        let { dev_id } = this.props
        let { appId, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appLink } = this.state
        let res = await axios.post('/dev/addapp', { dev_id, appId, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appLink })
        console.log(res)
        this.setState({
            message: res.data.message
        })
    }

    render() {
        let { appLink, appId, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags } = this.state;
        var settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            adaptiveHeight: true
        };
        return (
            <div className='addApp'>
                <div className='addAppChild'>
                    {this.state.auto ?
                        <div className='autoAdd'>
                            {this.props.developer}
                            <div className='addAppLink'>
                                <h1 className='appRating'>Add An App Here: <input onChange={(e) => { this.setState({ appLink: e.target.value }) }} type='text' id='linkInput' /> </h1>
                                <h1>ID: {this.state.appId}</h1>
                            </div>
                            <h1 className='appRating'>Put The Apps Current Rating Here: <input onChange={(e) => { this.setState({ current_rating: e.target.value }) }} type='text' id='ratingInput' /> </h1>
                            <h1 className='appRating'>Add App Tags Here: <input onChange={(e) => { this.setState({ tags: e.target.value }) }} type='text' id='tagInput' /> </h1>
                            <div className='add-Buttons'>
                                <button onClick={() => this.preview()} className='preview-Button'>preview</button>
                                <button onClick={(e) => this.setState(prevState => ({ auto: !prevState.auto }))} className='manual-Button'>Manual</button>
                            </div>
                        </div>
                        :
                        <div>
                            <h1>Add An App Here: <input onChange={(e) => { this.setState({ appLink: e.target.value }) }} type='text' /> </h1>
                            <button onClick={() => this.splitter()}>get Id</button>
                            <h1>Add App Name Here: <input onChange={(e) => { this.setState({ appName: e.target.value }) }} type='text' /> </h1>
                            <h1>Put The Apps Current Rating Here: <input onChange={(e) => { this.setState({ current_rating: e.target.value }) }} type='text' /> </h1>
                            <h1>Add Icon Image Here: <input onChange={(e) => { this.setState({ iconImg: e.target.value }) }} type='text' /> </h1>
                            <h1> Add Up To 6 Images! </h1>
                            <h1>Add Image 1 Here: <input onChange={(e) => { this.setState({ img1: e.target.value }) }} type='text' /> </h1>
                            <h1>Add Image 2 Here: <input onChange={(e) => { this.setState({ img2: e.target.value }) }} type='text' /> </h1>
                            <h1>Add Image 3 Here: <input onChange={(e) => { this.setState({ img3: e.target.value }) }} type='text' /> </h1>
                            <h1>Add Image 4 Here: <input onChange={(e) => { this.setState({ img4: e.target.value }) }} type='text' /> </h1>
                            <h1>Add Image 5 Here: <input onChange={(e) => { this.setState({ img5: e.target.value }) }} type='text' /> </h1>
                            <h1>Add Image 6 Here: <input onChange={(e) => { this.setState({ img6: e.target.value }) }} type='text' /> </h1>
                            <h1>Add An App Description Here: <input onChange={(e) => { this.setState({ app_description: e.target.value }) }} type='text' /> </h1>
                            <h1>Add App Tags Here: <input onChange={(e) => { this.setState({ tags: e.target.value }) }} type='text' /> </h1>
                            <p>put a comma inbetween each tag</p>
                            <button onClick={() => this.addApp()}>Add App</button>
                            <button onClick={(e) => this.setState(prevState => ({ auto: !prevState.auto }))}>Auto</button>
                        </div>
                    }
                    <hr />
                    <hr />
                    {this.state.message}
                    <div className='devApps'>
                        <div className='appInfo'>
                            <img src={iconImg} alt={appName + 'logo'} />
                            <div className='appStats'>
                                <h1>Name: {appName}</h1>
                                <p>ID: {appId}</p>
                                <a href={appLink}>
                                    <p>Download Here</p>
                                </a>
                                <p>Rating: {current_rating}</p>

                            </div>
                        </div>
                        <div className='appImg'>
                            <Slider {...settings}>
                                <img src={img1} alt='' />
                                <img src={img2} alt='' />
                                <img src={img3} alt='' />
                                <img src={img4} alt='' />
                                <img src={img5} alt='' />
                                <img src={img6} alt='' />
                            </Slider>
                            Description:
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
                        </div>
                        {tags}
                        <button onClick={() => this.addApp()}>addApp</button>
                    </div>
                    <a href='https://www.apple.com/us/search' target='_blank' rel="noopener noreferrer"><p>
                        Search For Apps Here
                    </p></a>
                    <h1>Directions</h1>
                    <img src='https://media.giphy.com/media/ybTcwRZSWolOCQlKDx/giphy.gif' alt='Instructions Gif' />
                </div>
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState)(AddApp)