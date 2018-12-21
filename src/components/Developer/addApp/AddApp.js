import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class AddApp extends Component {
    constructor() {
        super()

        this.state = {
            appLink: '',
            appId: 0,
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
            message:''
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
        console.log(res)
    }
    async addApp() {
        console.log('got here')
        let {dev_id} = this.props
        let { appId, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appLink } = this.state
        let res = await axios.post('/dev/addapp', {dev_id ,appId, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appLink})
        console.log(res)
        this.setState({
            message: res.data.message, auto: false
        })
    }
    
    render() {
        let { appId, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags } = this.state
        return (
            <div>
                <button onClick={(e) => this.setState(prevState => ({ auto: !prevState.auto }))}>Manual</button>
                {this.state.auto ?
                    <div>
                    {this.props.developer}
                        <h1>Add An App Here: <input onChange={(e) => { this.setState({ appLink: e.target.value }) }} type='text' /> </h1>
                        <button onClick={() => this.splitter()}>get Id</button>
                        {/* <button onClick={()=>this.getAppDetails()}>ADD</button> */}
                        {this.state.appId}
                    </div> :
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
                    </div>
                }
                {this.state.message}
                <hr />
                <hr />
                <h1>PREVIEW</h1>
                <hr />
                {appId}
                <hr />
                {appName}
                <hr />
                {app_description}
                <hr />
                {current_rating}
                <hr />
                <img src={iconImg} alt='' />
                <img src={img1} alt='' />
                <img src={img2} alt='' />
                <img src={img3} alt='' />
                <img src={img4} alt='' />
                <img src={img5} alt='' />
                <img src={img6} alt='' />
                <hr />

                {tags}
                <hr />
                <a href='https://www.apple.com/us/search' target='_blank' rel="noopener noreferrer"><p>
                    Search For Apps Here
                    </p></a>
                <h1>Directions</h1>
                <img src='https://media.giphy.com/media/ybTcwRZSWolOCQlKDx/giphy.gif' alt='Instructions Gif' />
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState)(AddApp)