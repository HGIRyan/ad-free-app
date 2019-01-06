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
            chartData: {
                labels: [ //Date of being recorded
                    '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08',
                ],
                // labels: [res.data[0].time_of, cd[1].time_of, cd[2].time_of,],
                datasets: [
                    {
                        label: 'Views',
                        data: [ //View Sum For Each Day
                            5000, 8402, 6541, 5874
                        ],
                    },
                    {
                        label: 'Downloads',
                        data: [ // download sum for each day
                            521, 564, 813, 987
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
        const cd = res.data.reverse()
        console.log('Response', res.data)
        console.log(cd)
        await this.setState({
            chartData: {
                labels: [ //Date of being recorded
                    cd[0].date.split('T')[0], cd[1].date.split('T')[0], cd[2].date.split('T')[0], cd[3].date.split('T')[0],
                ],
                // labels: [res.data[0].time_of, cd[1].time_of, cd[2].time_of,],
                datasets: [
                    {
                        label: 'Views',
                        data: [ //View Sum For Each Day
                            cd[0].views, cd[1].views, cd[2].views, cd[3].views,
                        ],
                    },
                    {
                        label: 'Downloads',
                        data: [ // download sum for each day
                            cd[0].downloads, cd[1].downloads, cd[2].downloads, cd[3].downloads,
                        ]
                    }
                ]

            }
        })
        this.props.update_chartData(this.state.chartData)
    }

    render() {
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
                <Line
                    data={this.state.chartData}
                />
                {mappedApps}
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState, { update_chartData })(AppChart);