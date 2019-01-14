import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Apps from './Apps'
import './../Dev.css'


class AddedApps extends Component {
    constructor() {
        super()

        this.state = {
            appInfo: [],
        }
    }
    componentDidMount() {
        this.getDevApps()
    }
    async getDevApps() {
        let { dev_id } = this.props
        console.log(dev_id)
        let res = await axios.get(`/dev/get-devapps/${dev_id}`)
        this.setState({
            appInfo: res.data
        })
    }

    render() {
        let mappedApps = this.state.appInfo.map(appInfo => {
            return (
                <Apps
                    key={appInfo.app_id}
                    appLink={appInfo.app_link}
                    appName={appInfo.app_name}
                    app_description={appInfo.app_description}
                    current_rating={appInfo.current_rating}
                    iconImg={appInfo.iconimg}
                    img1={appInfo.img1}
                    img2={appInfo.img2}
                    img3={appInfo.img3}
                    img4={appInfo.img4}
                    img5={appInfo.img5}
                    img6={appInfo.img6}
                    tags={appInfo.tags}
                    app_id={appInfo.app_id}
                />
            )
        })
        console.log('Got Here 1')
        return (
            <div className='addedPage'>
                {mappedApps}
            </div>
        )
    }
}

function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState)(AddedApps);