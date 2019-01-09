import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './User.css'
import Today from './../../Assets/Today.png'
import Rocket from './../../Assets/Rocket.png'
import Apps from './../../Assets/Apps.png'
import Search from './../../Assets/Search.png'
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//     button: {
//         margin: theme.spacing.unit,
//     },
//     input: {
//         display: 'none',
//     },
// });

class MenuBar extends Component {

    render() {
        // const { classes } = this.props;
        return (
           
                    <div className='MenuBar' >
                        <Link to='/user/today'>
                            <div className='Menu-Button'>
                                <img src={Today} alt='' />
                                <p>Today</p>
                            </div>
                        </Link>
                        {/* {console.log(this.location.pathname)} */}
                        {/* {console.log(this.props)} */}
                        <Link to='/user/games'>
                            <div className='Menu-Button'>
                                <img src={Rocket} alt='' />
                                <p>Games</p>
                            </div>
                        </Link>
                        <Link to='/user/apps'>
                            <div className='Menu-Button'>
                                <img src={Apps} alt='' />
                                <p>Apps</p>
                            </div>
                        </Link>
                        <Link to='/user/search'>
                            <div className='Menu-Button'>
                                <img src={Search} alt='' />
                                <p>Search</p>
                            </div>
                        </Link>
                    </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
const MenuBarWithLocation = withRouter(MenuBar)
export default connect(mapPropsToState)(MenuBarWithLocation);
