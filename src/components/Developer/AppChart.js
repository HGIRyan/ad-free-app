import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { update_chartData } from './../../ducks/reducer'
import axios from 'axios'
import AppInfoList from './AppInfoList'

class AppChart extends Component {
    constructor() {
        super()

        this.state = {
            chartData:false,
            appInfo: []

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
    async getAppData(appandDev_id) {
        const {app_id,dev_id} = appandDev_id
        // let { dev_id } = this.props
        console.log('ID', dev_id, app_id)
        let res = await axios.post(`/dev/appdata/chart`, { dev_id, app_id })
        const cd = res.data
        // console.log(cd[0].time_of)
        // const myDate = {
        //     chartData: {

        //         labels: ['2019-01-01', '2019-01-02', '2019-01-03'],
        //         // labels: [res.data[0].time_of, cd[1].time_of, cd[2].time_of,],
        //         datasets: [
        //             {
        //                 label: 'Views',
        //                 data: [ // Views sum for each day
        //                     // cd[0].sum, cd[1].sum, cd[2].sum,
        //                     10, '20', '30'
        //                 ],
        //             },
        //             {
        //                 label: 'Downloads',
        //                 data: [ // download sum for each day
        //                     3, 80, 9
        //                 ]
        //             }
        //         ]

        //     }
        // }
        this.setState({ chartData: true })
    }

    render() {
        console.log('state', this.state)
        let mappedApps = this.state.appInfo.map(appInfo => {
            return (
                <AppInfoList
                    key={appInfo.app_id}
                    appName={appInfo.app_name}
                    app_id={appInfo.app_id}
                    dev_id={this.props.dev_id}
                    getAppData={e=>this.getAppData(e)}
                />
            )
        })
        return (
            <div className='chart'>
                {/* {this.state.chartData ?

                    <Line
                        data={this.state.chartData}
                        options={{
                            title: {
                                display: true,
                                text: 'App Download and Views'
                            },
                            legend: {
                                display: true,
                                position: "right"
                            }
                        }}
                    />
                    :
                    null} */}
                {mappedApps}
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState, { update_chartData })(AppChart);