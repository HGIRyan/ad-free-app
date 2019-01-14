import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setSelectedAppData } from './../../../ducks/reducer'
// SVG
import Download from './../../../Assets/baseline-cloud_download-24px.svg'


class SearchResults extends Component {
    constructor() {
        super()

        this.state = {

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
        let { appLink, appName, app_description, current_rating, iconImg, img1, tags } = this.props
        return (
            <div className='SearchResComp'>
                <Link
                    to='/user/app'
                    onClick={(e) => { this.props.setSelectedAppData(this.props.appid) }}>
                    <div className='HeaderInfo'>
                        <img src={iconImg} alt={appName} />
                        <div className='infoApp'>
                            <h1>{appName}</h1>
                            <h4>{app_description.substr(0, 75)}</h4>
                            <h3>{current_rating}</h3>
                        </div>
                        <a href={appLink} className='headerimg' >
                            <button onClick={() => { this.incrementDownload() }}><img src={Download} alt='DOWNLOAD' /> </button>
                        </a>
                    </div>
                    <div className='SearchBody'>
                        <img src={img1} alt={appName} />
                        {tags}
                    </div>
                </Link>
            </div>
        )
    }
}

export default connect(null, { setSelectedAppData })(SearchResults);

