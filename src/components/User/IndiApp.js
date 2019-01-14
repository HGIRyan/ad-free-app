import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import Download from './../../Assets/baseline-cloud_download-24px.svg'
import Slider from 'react-slick'
import { setSelectedAppData } from './../../ducks/reducer'

class IndiApp extends Component {
    constructor() {
        super()

        this.state = {
            app: [],
            longDesc: false
        }
    }
    async componentDidMount() {
        await this.setState({
            app: this.props.selectedAppData
        })
        console.log(this.state.app)
        console.log(this.props.username)
        console.log('Hi')
        if (!this.state.app.app_description) {
             await this.getAppinfo() }
        if(this.state.app.app_description.length > 100){
            this.setState({longDesc: true})
        }
        await this.incrementView();
    }
    async getAppinfo() {
        let { app } = this.state
        let app_id = app
        console.log('app '+app, 'app_id '+app_id)
        let res = await axios.post(`/user/appName`, {app_id})
        console.log(res.data)
        this.setState({
            app: res.data
        })
        console.log(this.state.app)
    }

    async incrementView() {
        let { app_id } = this.state.app
        await axios.post(`/user/view/dynamicc`, { app_id })
    }
    async incrementDownload() {
        let { app_id } = this.state.app
        await axios.post(`/user/download/dynamicc`, { app_id })
        this.setState({ hasRan: true })
    }
    handleBack() {
        this.props.history.goBack();
        this.props.setSelectedAppData({})
    }
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            adaptiveHeight: true,
            centerMode: true,
            // variableWidth: true,

        };
        let { app_name, app_description, current_rating, iconimg, img1, img2, img3, img4, tags, app_link, apple_app_id } = this.state.app
        console.log(this.props.selectedAppData)
        return (
            <div className='TodayHeader'>
                <div className='Goback'>
                    <button onClick={(e) => { this.handleBack() }}>
                        <h3>Back</h3>
                    </button>
                </div>
                <div className='topBoxApp'>
                    <div className='appLogoApp'>
                        <img src={iconimg} alt={app_name + 'Logo'} />
                    </div>
                    <div className='appNameSuch'>
                        <h1>{app_name}</h1>
                        <h3>{current_rating}</h3>
                    </div>
                    <div className='DownloadCloud' onClick={(e) => { this.incrementDownload() }}>
                        <a href={app_link}>
                            <img src={Download} alt='DOWNLOAD' />
                        </a>
                    </div>
                </div>
                <div className='AppSlider'>
                    <Slider {...settings} >
                        <img src={img1} alt={app_name + 'Image'} />
                        <img src={img2} alt={app_name + 'Image'} />
                        <img src={img3} alt={app_name + 'Image'} />
                        <img src={img4} alt={app_name + 'Image'} />
                    </Slider>
                </div>
                {this.state.longDesc ?
                    <div className='appDesc'>
                        {app_description.substring(0, 100)}
                        <h3 onClick={(e) => this.setState(prevState => ({ longDesc: !prevState.longDesc }))}>Read More...</h3>
                    </div>
                    :
                    <div>
                        {app_description}
                        <h3 onClick={(e) => this.setState(prevState => ({ longDesc: !prevState.longDesc }))}>Read Less...</h3>
                    </div>
                }
                {this.state.app.app_id}
                <hr />
                <hr />
                <hr />
                <hr />

            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState, {setSelectedAppData})(IndiApp);