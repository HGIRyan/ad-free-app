import React, { Component } from 'react';
import { connect } from 'react-redux';

// Imports
import Header from './components/Header'
import FeaturedCard from './components/FeaturedApp/FeaturedCard'
import FeaturedProductivity from './components/FeaturedProductivity/FeaturedProductivity'
import HowTo from './components/HowToArticle/HowTo'
import QuickPLay from './components/QuickPlay/QuickPlay'
import { resetState } from './../../../ducks/reducer'

class TodayView extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header />
                    <a href='http://localhost:4000/logout'>
                        <button className='navBar-button' onClick={(e) => { resetState() }}> Log Out </button>
                    </a>
                    {this.props.username}
                </div>
                <div>
                    <FeaturedCard />
                    <HowTo />
                    <FeaturedProductivity />
                    <QuickPLay />
                </div>
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}

export default connect(mapPropsToState, { resetState })(TodayView)