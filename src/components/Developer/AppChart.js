import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import {update_chartData} from './../../ducks/reducer'
import axios from 'axios'

class AppChart extends Component {
    constructor() {
        super()

        this.state = {
            chartData: {
                labels: ['AppName'],
                datasets: [
                    {
                        label: 'Views',
                        data: [

                        ],
                    },
                    {
                        label: 'Downloads',
                        data: [

                        ]
                    }
                ]
            },

        }
    }

    componentDidMount(){

    }
    async getDownloadData(){
        let {dev_id} = this.props
        let res = await axios.get(`/dev/appdata/downloads/:${dev_id}`)
        console.log(res)
    }

    render() {
        return (
            <div className='chart'>
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

            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
export default connect(mapPropsToState, {update_chartData})(AppChart);