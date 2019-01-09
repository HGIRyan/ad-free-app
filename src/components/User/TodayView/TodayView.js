import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../User.css'
import iPhoneHeader from './../iPhoneHeader'
// Imports
import AdFree from './../../../Assets/Ad-FreePic.png'
import SnapHowTo from './../../../Assets/SnapHowTo.png'
import Header from './components/Header'
// import FeaturedCard from './components/FeaturedApp/FeaturedCard'
import FeaturedProductivity from './components/FeaturedProductivity/FeaturedProductivity'
// import HowTo from './components/HowToArticle/HowTo'
import QuickPLay from './components/QuickPlay/QuickPlay'
import { resetState } from './../../../ducks/reducer'

class TodayView extends Component {
    render() {
        return (
            <div className='TodayViewPage'>
                <div className='TodayViewHeader'>
                    <Header />
                </div>
                <div className='TodayViewBody'>
                    <iPhoneHeader/>
                    <img src={AdFree} alt='' className='NewAdFree' />
                    <img src={SnapHowTo} alt='' className='NewAdFree' />
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