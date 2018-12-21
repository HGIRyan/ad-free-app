import React, { Component } from 'react';
import { connect } from 'react-redux';

// Imports
import Header from './components/Header'
import FeaturedCard from './components/FeaturedApp/FeaturedCard'
import {resetState} from './../../../ducks/reducer'

class TodayView extends Component {
    render() {
        return (
            <div>
                <Header />
                <FeaturedCard />
                <a href='http://localhost:4000/logout'>
                    <button className='navBar-button' onClick={(e)=>{resetState()}}> Log Out </button>
                </a>
                {this.props.username}
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}

export default connect(mapPropsToState, {resetState})(TodayView)