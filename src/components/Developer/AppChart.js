import React, { Component } from 'react';
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { update_chartData } from './../../ducks/reducer'
import axios from 'axios'
import AppInfoList from './AppInfoList'
import './Dev.css'
import { relative } from 'path';

class AppChart extends Component {
    constructor() {
        super()

        this.state = {
            chartData: {
                labels: [ //Date of being recorded
                    '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08',
                ],
                // labels: [res.data[0].time_of, cd[1].time_of, cd[2].time_of,],
                datasets: [
                    {
                        label: 'Views',
                        data: [ //View Sum For Each Day
                            500, 840, 654, 587
                        ],
                    },
                    {
                        label: 'Downloads',
                        data: [ // download sum for each day
                            52, 56, 81, 98
                        ]
                    }
                ]
            },
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
        const { app_id, dev_id } = appandDev_id
        // let { dev_id } = this.props
        console.log('ID', dev_id, app_id)
        let res = await axios.post(`/dev/appdata/chart`, { dev_id, app_id })
        const chartD = res.data.reverse()
        console.log('Response', res.data)
        let cd = chartD.map((cd => {
            return cd.date.split('T')[0]
        }))
        console.log(cd)

        await this.setState({
            chartData: {
                labels:
                    chartD.map(cd => {
                        return cd.date.split('T')[0]
                    })
                ,
                // labels: [res.data[0].time_of, cd[1].time_of, cd[2].time_of,],
                datasets: [
                    {
                        label: 'Views',
                        data: chartD.map(cd => {
                            return cd.views
                        }),
                    },
                    {
                        label: 'Downloads',
                        data: chartD.map(cd => {
                            return cd.downloads
                        })
                    }
                ]

            }
        })
        this.props.update_chartData(this.state.chartData)
    }

    render() {
        var styles = {
            position: relative,
            height: '40vh',
            width: '80vw'

        }
        console.log('state', this.state.chartData)
        let mappedApps = this.state.appInfo.map(appInfo => {
            return (
                <AppInfoList
                    key={appInfo.app_id}
                    appName={appInfo.app_name}
                    app_id={appInfo.app_id}
                    dev_id={this.props.dev_id}
                    getAppData={e => this.getAppData(e)}
                />
            )
        })
        return (
            <div className='chart'>
                <div className='appItems'>
                    {mappedApps}
                </div>
                <div className='line'>
                    <Line style={styles}
                        data={this.state.chartData}
                    />
                </div>
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState, { update_chartData })(AppChart);